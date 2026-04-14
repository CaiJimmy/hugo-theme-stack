const fallbackMobileTocAnimationDuration = 300;
const reducedMotionQuery = '(prefers-reduced-motion: reduce)';

interface MobileTocAnimationState {
    timerId: number | null;
    transitionEndHandler: ((event: TransitionEvent) => void) | null;
}

function isMobileTocVisible(articleToc: HTMLElement): boolean {
    return window.getComputedStyle(articleToc).display !== 'none';
}

function prefersReducedMotion(): boolean {
    return window.matchMedia(reducedMotionQuery).matches;
}

function parseCssDurationToMilliseconds(value: string): number | null {
    const matchedDuration = value.trim().match(/^(-?\d*\.?\d+)(ms|s)$/i);
    if (!matchedDuration) {
        return null;
    }

    const numericValue = Number.parseFloat(matchedDuration[1]);
    if (Number.isNaN(numericValue) || numericValue < 0) {
        return null;
    }

    const unit = matchedDuration[2].toLowerCase();
    return unit === 's' ? numericValue * 1000 : numericValue;
}

function getMobileTocAnimationDuration(articleToc: HTMLElement): number {
    const durationValue = window
        .getComputedStyle(articleToc)
        .getPropertyValue('--mobile-toc-animation-duration')
        .trim();

    const duration = parseCssDurationToMilliseconds(durationValue);
    if (duration === null) {
        return fallbackMobileTocAnimationDuration;
    }

    return duration;
}

function clearAnimatedStyles(target: HTMLElement): void {
    target.style.removeProperty('height');
    target.style.removeProperty('overflow');
    target.style.removeProperty('transition-duration');
    target.style.removeProperty('transition-property');
}

function clearPendingAnimation(tocNav: HTMLElement, animationState: MobileTocAnimationState): void {
    if (animationState.timerId !== null) {
        window.clearTimeout(animationState.timerId);
        animationState.timerId = null;
    }

    if (animationState.transitionEndHandler !== null) {
        tocNav.removeEventListener('transitionend', animationState.transitionEndHandler);
        animationState.transitionEndHandler = null;
    }
}

function stopPendingAnimation(details: HTMLDetailsElement, tocNav: HTMLElement, animationState: MobileTocAnimationState): void {
    clearPendingAnimation(tocNav, animationState);

    details.classList.remove('transiting');
    details.classList.remove('toc-collapsing');
    clearAnimatedStyles(tocNav);
}

function completeWithTransitionLifecycle(
    tocNav: HTMLElement,
    animationState: MobileTocAnimationState,
    animationDuration: number,
    onComplete: () => void
): void {
    let isCompleted = false;

    const finish = (): void => {
        if (isCompleted) {
            return;
        }

        isCompleted = true;
        clearPendingAnimation(tocNav, animationState);
        onComplete();
    };

    const transitionEndHandler = (event: TransitionEvent): void => {
        if (event.target !== tocNav || event.propertyName !== 'height') {
            return;
        }

        finish();
    };

    clearPendingAnimation(tocNav, animationState);
    animationState.transitionEndHandler = transitionEndHandler;
    tocNav.addEventListener('transitionend', transitionEndHandler);
    animationState.timerId = window.setTimeout(() => {
        finish();
    }, animationDuration + 100);
}

function openToc(details: HTMLDetailsElement, tocNav: HTMLElement, animationState: MobileTocAnimationState, animationDuration: number): void {
    details.classList.remove('toc-collapsing');
    details.classList.add('transiting');
    details.setAttribute('open', '');

    if (prefersReducedMotion()) {
        clearPendingAnimation(tocNav, animationState);
        clearAnimatedStyles(tocNav);
        details.classList.remove('transiting');
        return;
    }

    const targetHeight = tocNav.scrollHeight;

    tocNav.style.overflow = 'hidden';
    tocNav.style.height = '0';
    tocNav.offsetHeight;

    tocNav.style.transitionProperty = 'height';
    tocNav.style.transitionDuration = `${animationDuration}ms`;
    tocNav.style.height = `${targetHeight}px`;

    completeWithTransitionLifecycle(tocNav, animationState, animationDuration, () => {
        clearAnimatedStyles(tocNav);
        details.classList.remove('transiting');
    });
}

function closeToc(details: HTMLDetailsElement, tocNav: HTMLElement, animationState: MobileTocAnimationState, animationDuration: number): void {
    details.classList.add('transiting');
    details.classList.add('toc-collapsing');

    if (prefersReducedMotion()) {
        clearPendingAnimation(tocNav, animationState);
        details.removeAttribute('open');
        clearAnimatedStyles(tocNav);
        details.classList.remove('transiting');
        details.classList.remove('toc-collapsing');
        return;
    }

    tocNav.style.overflow = 'hidden';
    tocNav.style.height = `${tocNav.offsetHeight}px`;
    tocNav.offsetHeight;

    tocNav.style.transitionProperty = 'height';
    tocNav.style.transitionDuration = `${animationDuration}ms`;
    tocNav.style.height = '0';

    completeWithTransitionLifecycle(tocNav, animationState, animationDuration, () => {
        details.removeAttribute('open');
        clearAnimatedStyles(tocNav);
        details.classList.remove('transiting');
        details.classList.remove('toc-collapsing');
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

    const animationState: MobileTocAnimationState = {
        timerId: null,
        transitionEndHandler: null
    };

    const animationDuration = getMobileTocAnimationDuration(articleToc);

    summary.addEventListener('click', (event: MouseEvent) => {
        if (!isMobileTocVisible(articleToc)) {
            return;
        }

        event.preventDefault();

        if (details.classList.contains('transiting')) {
            return;
        }

        if (details.open) {
            closeToc(details, tocNav, animationState, animationDuration);
            return;
        }

        openToc(details, tocNav, animationState, animationDuration);
    });

    window.addEventListener('resize', () => {
        if (isMobileTocVisible(articleToc)) {
            return;
        }

        stopPendingAnimation(details, tocNav, animationState);
    });
}
