const mobileTocAnimationDuration = 300;
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
    clearAnimatedStyles(tocNav);
}

function completeWithTransitionLifecycle(tocNav: HTMLElement, animationState: MobileTocAnimationState, onComplete: () => void): void {
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
    }, mobileTocAnimationDuration + 100);
}

function openToc(details: HTMLDetailsElement, tocNav: HTMLElement, animationState: MobileTocAnimationState): void {
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
    tocNav.style.transitionDuration = `${mobileTocAnimationDuration}ms`;
    tocNav.style.height = `${targetHeight}px`;

    completeWithTransitionLifecycle(tocNav, animationState, () => {
        clearAnimatedStyles(tocNav);
        details.classList.remove('transiting');
    });
}

function closeToc(details: HTMLDetailsElement, tocNav: HTMLElement, animationState: MobileTocAnimationState): void {
    details.classList.add('transiting');

    if (prefersReducedMotion()) {
        clearPendingAnimation(tocNav, animationState);
        details.removeAttribute('open');
        clearAnimatedStyles(tocNav);
        details.classList.remove('transiting');
        return;
    }

    tocNav.style.overflow = 'hidden';
    tocNav.style.height = `${tocNav.offsetHeight}px`;
    tocNav.offsetHeight;

    tocNav.style.transitionProperty = 'height';
    tocNav.style.transitionDuration = `${mobileTocAnimationDuration}ms`;
    tocNav.style.height = '0';

    completeWithTransitionLifecycle(tocNav, animationState, () => {
        details.removeAttribute('open');
        clearAnimatedStyles(tocNav);
        details.classList.remove('transiting');
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

    summary.addEventListener('click', (event: MouseEvent) => {
        if (!isMobileTocVisible(articleToc)) {
            return;
        }

        event.preventDefault();

        if (details.classList.contains('transiting')) {
            return;
        }

        if (details.open) {
            closeToc(details, tocNav, animationState);
            return;
        }

        openToc(details, tocNav, animationState);
    });

    window.addEventListener('resize', () => {
        if (isMobileTocVisible(articleToc)) {
            return;
        }

        stopPendingAnimation(details, tocNav, animationState);
    });
}
