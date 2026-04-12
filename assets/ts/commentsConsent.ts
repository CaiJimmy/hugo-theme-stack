/*
 * Consent-gated comments bootstrap.
 *
 * This module controls whether third-party comments are rendered based on
 * functional cookie consent, and injects template scripts in sequence to
 * avoid eager or duplicate script execution.
 */

/**
 * Consent event payload used by the comments gate.
 * It mirrors cookie consent state shape but keeps optional fields for safety.
 */
interface CommentsConsentState {
    necessary?: boolean;
    analytics?: boolean;
    functional?: boolean;
    timestamp?: number;
}

/**
 * Serialized script data extracted from a template fragment.
 * We keep a marker so scripts can be re-inserted in a controlled order.
 */
interface ScriptPayload {
    marker: Comment;
    attributes: Array<{
        name: string;
        value: string;
    }>;
    text: string;
}

/**
 * Resolve functional consent with layered fallback:
 * 1) explicit event detail, 2) CookieConsent public API, 3) dataset mirror.
 */
const hasFunctionalConsent = (consentDetail?: CommentsConsentState | null): boolean => {
    if (typeof consentDetail?.functional === 'boolean') {
        return consentDetail.functional;
    }

    const cookieConsent = (window as Window & {
        cookieConsent?: {
            hasConsent?: (category: 'necessary' | 'analytics' | 'functional') => boolean;
        };
    }).cookieConsent;

    if (typeof cookieConsent?.hasConsent === 'function') {
        return cookieConsent.hasConsent('functional');
    }

    return document.documentElement.dataset.consentFunctional === 'true';
};

const extractScripts = (fragment: DocumentFragment): ScriptPayload[] => {
    // Extract scripts before appending to DOM to avoid eager/duplicate execution.
    return Array.from(fragment.querySelectorAll('script')).map((script: HTMLScriptElement) => {
        const marker = document.createComment('comments-script-marker');
        const payload: ScriptPayload = {
            marker,
            attributes: Array.from(script.attributes).map(attr => ({
                name: attr.name,
                value: attr.value
            })),
            text: script.text || script.textContent || ''
        };

        if (script.parentNode) {
            script.parentNode.replaceChild(marker, script);
        }

        return payload;
    });
};

const loadScriptsInOrder = (
    scripts: ScriptPayload[],
    index: number,
    callback?: () => void
): void => {
    // Inject scripts sequentially so third-party embeds can rely on execution order.
    if (index >= scripts.length) {
        callback?.();
        return;
    }

    const scriptPayload = scripts[index];
    if (!scriptPayload.marker.parentNode) {
        loadScriptsInOrder(scripts, index + 1, callback);
        return;
    }

    const newScript = document.createElement('script');
    scriptPayload.attributes.forEach(attr => {
        newScript.setAttribute(attr.name, attr.value);
    });

    if (scriptPayload.text) {
        newScript.text = scriptPayload.text;
    }

    const loadNext = (): void => loadScriptsInOrder(scripts, index + 1, callback);

    if (newScript.src) {
        newScript.onload = newScript.onerror = loadNext;
        try {
            scriptPayload.marker.parentNode.replaceChild(newScript, scriptPayload.marker);
        } catch {
            loadNext();
        }
        return;
    }

    try {
        scriptPayload.marker.parentNode.replaceChild(newScript, scriptPayload.marker);
    } catch {
        loadNext();
        return;
    }

    loadNext();
};

const initCommentsConsent = (): void => {
    // Main entry: gate comments rendering by functional cookie consent.
    const placeholder = document.getElementById('comments-consent-placeholder') as HTMLElement | null;
    const container = document.getElementById('comments-container') as HTMLElement | null;
    const template = document.getElementById('comments-template') as HTMLTemplateElement | null;

    if (!placeholder || !container || !template) {
        return;
    }

    let commentsLoaded = false;
    let commentsLoading = false;

    const showComments = (): void => {
        placeholder.style.display = 'none';
        container.style.display = 'block';

        if (commentsLoaded || commentsLoading) {
            return;
        }

        // Prevent duplicate template hydration while scripts are still loading.
        commentsLoading = true;

        const clone = template.content.cloneNode(true) as DocumentFragment;
        const scripts = extractScripts(clone);

        container.appendChild(clone);
        loadScriptsInOrder(scripts, 0, () => {
            commentsLoaded = true;
            commentsLoading = false;
        });
    };

    const hideComments = (): void => {
        placeholder.style.display = 'block';
        container.style.display = 'none';
    };

    window.addEventListener('onCookieConsentChange', (event: Event) => {
        // Cross-module contract: this event is dispatched by cookies.ts.
        const customEvent = event as CustomEvent<CommentsConsentState | null>;
        if (hasFunctionalConsent(customEvent.detail)) {
            showComments();
        } else {
            hideComments();
        }
    });

    if (hasFunctionalConsent()) {
        showComments();
    } else {
        hideComments();
    }
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCommentsConsent, { once: true });
} else {
    initCommentsConsent();
}

export {};
