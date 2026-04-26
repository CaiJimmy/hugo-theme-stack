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
 * Resolve functional consent with layered fallback:
 * 1) explicit event detail, 2) CookieConsent public API, 3) dataset mirror.
 */
const hasFunctionalConsent = (consentDetail?: CommentsConsentState | null): boolean => {
    const cookieConsent = (window as Window & {
        cookieConsent?: {
            hasConsent?: (category: 'necessary' | 'analytics' | 'functional') => boolean;
        };
    }).cookieConsent;

    return (
        consentDetail?.functional ??
        cookieConsent?.hasConsent?.('functional') ??
        document.documentElement.dataset.consentFunctional === 'true'
    );
};

interface DeferredScript {
    placeholder: Comment;
    script: HTMLScriptElement;
}

const prepareDeferredScripts = (fragment: DocumentFragment): DeferredScript[] => {
    return Array.from(fragment.querySelectorAll('script')).map(script => {
        const placeholder = document.createComment('comments-script-placeholder');
        script.replaceWith(placeholder);
        return { placeholder, script };
    });
};

const activateDeferredScripts = async (scripts: DeferredScript[]): Promise<void> => {
    // Inject scripts sequentially so third-party embeds can rely on execution order.
    for (const { placeholder, script } of scripts) {
        if (!placeholder.parentNode) {
            continue;
        }

        const newScript = document.createElement('script');
        Array.from(script.attributes).forEach(attr => {
            newScript.setAttribute(attr.name, attr.value);
        });

        if (script.textContent) {
            newScript.text = script.textContent;
        }

        let done: Promise<void> = Promise.resolve();
        if (newScript.src) {
            done = new Promise<void>(resolve => {
                newScript.onload = newScript.onerror = () => resolve();
            });
        }

        placeholder.replaceWith(newScript);
        await done;
    }
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

    const showComments = async (): Promise<void> => {
        placeholder.style.display = 'none';
        container.style.display = 'block';

        if (commentsLoaded || commentsLoading) {
            return;
        }

        // Prevent duplicate template hydration while scripts are still loading.
        commentsLoading = true;

        try {
            const clone = template.content.cloneNode(true) as DocumentFragment;
            const scripts = prepareDeferredScripts(clone);

            container.appendChild(clone);
            await activateDeferredScripts(scripts);
            commentsLoaded = true;
        } finally {
            commentsLoading = false;
        }
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
