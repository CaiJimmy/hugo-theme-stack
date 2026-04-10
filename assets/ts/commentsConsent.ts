interface ConsentDetail {
    necessary?: boolean;
    analytics?: boolean;
    functional?: boolean;
    timestamp?: number;
}

interface ScriptPayload {
    marker: Comment;
    attributes: Array<{
        name: string;
        value: string;
    }>;
    text: string;
}

const hasFunctionalConsent = (consentDetail?: ConsentDetail | null): boolean => {
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
        const customEvent = event as CustomEvent<ConsentDetail | null>;
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
