import {
    SlideAnimationState,
    createSlideAnimationState,
    mobileSlideAnimationDurationMs,
    slideClose,
    slideOpen,
    stopSlideTransition
} from './slideAnimation';

const reducedMotionQuery = '(prefers-reduced-motion: reduce)';

function isMobileTocVisible(articleToc: HTMLElement): boolean {
    return window.getComputedStyle(articleToc).display !== 'none';
}

function prefersReducedMotion(): boolean {
    return window.matchMedia(reducedMotionQuery).matches;
}

function getMobileSlideAnimationDuration(_articleToc: HTMLElement): number {
    return mobileSlideAnimationDurationMs;
}

function stopPendingAnimation(details: HTMLDetailsElement, tocNav: HTMLElement, animationState: SlideAnimationState): void {
    stopSlideTransition(tocNav, animationState);
    details.classList.remove('transiting');
    details.classList.remove('toc-collapsing');
}

function openToc(details: HTMLDetailsElement, tocNav: HTMLElement, animationState: SlideAnimationState, animationDuration: number): void {
    details.classList.remove('toc-collapsing');
    details.setAttribute('open', '');

    if (prefersReducedMotion()) {
        stopSlideTransition(tocNav, animationState);
        details.classList.remove('transiting');
        return;
    }

    slideOpen(tocNav, animationState, {
        duration: animationDuration,
        transitionProperty: 'height',
        onComplete: () => {
            details.classList.remove('transiting');
        }
    });
}

function closeToc(details: HTMLDetailsElement, tocNav: HTMLElement, animationState: SlideAnimationState, animationDuration: number): void {
    if (prefersReducedMotion()) {
        stopSlideTransition(tocNav, animationState);
        details.removeAttribute('open');
        details.classList.remove('transiting');
        details.classList.remove('toc-collapsing');
        return;
    }

    slideClose(tocNav, animationState, {
        duration: animationDuration,
        transitionProperty: 'height',
        onComplete: () => {
            details.removeAttribute('open');
            details.classList.remove('transiting');
            details.classList.remove('toc-collapsing');
        }
    });
}

export function setupMobileToc(): void {
    const articleToc = document.querySelector('.article-toc') as HTMLElement | null;
    if (!articleToc) {
        return;
    }

    const details = articleToc.querySelector('details') as HTMLDetailsElement | null;
    if (!details) {
        return;
    }

    const summary = details.querySelector('summary') as HTMLElement | null;
    const tocNav = details.querySelector('.toc-nav') as HTMLElement | null;
    if (!summary || !tocNav) {
        return;
    }

    const animationState = createSlideAnimationState();

    const animationDuration = getMobileSlideAnimationDuration(articleToc);

    summary.addEventListener('click', (event: MouseEvent) => {
        if (!isMobileTocVisible(articleToc)) {
            return;
        }

        event.preventDefault();

        if (details.classList.contains('transiting')) {
            return;
        }

        if (details.open) {
            details.classList.add('transiting');
            details.classList.add('toc-collapsing');
            closeToc(details, tocNav, animationState, animationDuration);
            return;
        }

        details.classList.add('transiting');
        openToc(details, tocNav, animationState, animationDuration);
    });

    window.addEventListener('resize', () => {
        if (isMobileTocVisible(articleToc)) {
            return;
        }

        stopPendingAnimation(details, tocNav, animationState);
    });
}
