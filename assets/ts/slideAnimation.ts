/**
 * Slide animation core (shared by mobile menu and mobile TOC).
 *
 * References:
 * - https://dev.to/bmsvieira/vanilla-js-slidedown-up-4dkn
 *   (legacy slideUp/slideDown idea that previously lived in menu.ts)
 * - https://developer.mozilla.org/docs/Web/API/Element/transitionend_event
 *   (transition lifecycle + fallback timeout strategy)
 * - https://developer.mozilla.org/docs/Web/API/Element/scrollHeight
 *   (measure expanded height)
 * - https://developer.mozilla.org/docs/Web/API/HTMLElement/offsetHeight
 *   (forced reflow to ensure transition starts reliably)
 */
export const mobileSlideAnimationDurationMs = 300;

const transitionFallbackBuffer = 100;

/**
 * Mutable runtime state for one animated target.
 */
export interface SlideAnimationState {
    timerId: number | null;
    transitionEndHandler: ((event: TransitionEvent) => void) | null;
}

/**
 * Options for shared open/close slide animations.
 */
export interface SlideAnimationOptions {
    duration: number;
    transitionProperty?: string;
    includeSpacing?: boolean;
    expandedClassName?: string;
    transitionClassName?: string;
    onComplete?: () => void;
}

/**
 * Creates an isolated state holder for one animated element.
 */
export function createSlideAnimationState(): SlideAnimationState {
    return {
        timerId: null,
        transitionEndHandler: null
    };
}

/**
 * Removes inline styles written by this animation core.
 */
export function clearSlideInlineStyles(target: HTMLElement, includeSpacing = false): void {
    target.style.removeProperty('height');
    target.style.removeProperty('overflow');
    target.style.removeProperty('transition-duration');
    target.style.removeProperty('transition-property');

    if (!includeSpacing) {
        return;
    }

    target.style.removeProperty('padding-top');
    target.style.removeProperty('padding-bottom');
    target.style.removeProperty('margin-top');
    target.style.removeProperty('margin-bottom');
}

function clearPendingTransition(target: HTMLElement, animationState: SlideAnimationState): void {
    if (animationState.timerId !== null) {
        window.clearTimeout(animationState.timerId);
        animationState.timerId = null;
    }

    if (animationState.transitionEndHandler !== null) {
        target.removeEventListener('transitionend', animationState.transitionEndHandler);
        animationState.transitionEndHandler = null;
    }
}

/**
 * Completes animation by whichever happens first:
 * 1) `transitionend` on `height`, or
 * 2) timeout fallback.
 */
function completeWithTransitionLifecycle(
    target: HTMLElement,
    animationState: SlideAnimationState,
    duration: number,
    onComplete: () => void
): void {
    let isCompleted = false;

    const finish = (): void => {
        if (isCompleted) {
            return;
        }

        isCompleted = true;
        clearPendingTransition(target, animationState);
        onComplete();
    };

    const transitionEndHandler = (event: TransitionEvent): void => {
        if (event.target !== target || event.propertyName !== 'height') {
            return;
        }

        finish();
    };

    clearPendingTransition(target, animationState);
    animationState.transitionEndHandler = transitionEndHandler;
    target.addEventListener('transitionend', transitionEndHandler);
    animationState.timerId = window.setTimeout(() => {
        finish();
    }, duration + transitionFallbackBuffer);
}

/**
 * Stops ongoing slide animation and clears animation inline styles.
 */
export function stopSlideTransition(target: HTMLElement, animationState: SlideAnimationState, includeSpacing = false): void {
    clearPendingTransition(target, animationState);
    clearSlideInlineStyles(target, includeSpacing);
}

/**
 * Expands target from collapsed state to natural height.
 *
 * Note: reduced-motion branching is handled by caller modules.
 */
export function slideOpen(target: HTMLElement, animationState: SlideAnimationState, options: SlideAnimationOptions): void {
    const {
        duration,
        transitionProperty = 'height',
        includeSpacing = false,
        expandedClassName,
        transitionClassName,
        onComplete
    } = options;

    if (transitionClassName) {
        target.classList.add(transitionClassName);
    }

    if (expandedClassName) {
        target.classList.add(expandedClassName);
    }

    const targetHeight = target.scrollHeight;

    target.style.overflow = 'hidden';
    target.style.height = '0';

    if (includeSpacing) {
        target.style.paddingTop = '0';
        target.style.paddingBottom = '0';
        target.style.marginTop = '0';
        target.style.marginBottom = '0';
    }

    // Force reflow so the browser commits the collapsed start state
    // before we set the final height with transition.
    target.offsetHeight;

    target.style.transitionProperty = transitionProperty;
    target.style.transitionDuration = `${duration}ms`;
    target.style.height = `${targetHeight}px`;

    if (includeSpacing) {
        target.style.removeProperty('padding-top');
        target.style.removeProperty('padding-bottom');
        target.style.removeProperty('margin-top');
        target.style.removeProperty('margin-bottom');
    }

    completeWithTransitionLifecycle(target, animationState, duration, () => {
        clearSlideInlineStyles(target, includeSpacing);

        if (transitionClassName) {
            target.classList.remove(transitionClassName);
        }

        if (onComplete) {
            onComplete();
        }
    });
}

/**
 * Collapses target from current rendered height to zero.
 *
 * Note: reduced-motion branching is handled by caller modules.
 */
export function slideClose(target: HTMLElement, animationState: SlideAnimationState, options: SlideAnimationOptions): void {
    const {
        duration,
        transitionProperty = 'height',
        includeSpacing = false,
        expandedClassName,
        transitionClassName,
        onComplete
    } = options;

    if (transitionClassName) {
        target.classList.add(transitionClassName);
    }

    target.style.overflow = 'hidden';
    target.style.height = `${target.offsetHeight}px`;
    // Force reflow so transition starts from the measured height.
    target.offsetHeight;

    target.style.transitionProperty = transitionProperty;
    target.style.transitionDuration = `${duration}ms`;
    target.style.height = '0';

    if (includeSpacing) {
        target.style.paddingTop = '0';
        target.style.paddingBottom = '0';
        target.style.marginTop = '0';
        target.style.marginBottom = '0';
    }

    completeWithTransitionLifecycle(target, animationState, duration, () => {
        if (expandedClassName) {
            target.classList.remove(expandedClassName);
        }

        clearSlideInlineStyles(target, includeSpacing);

        if (transitionClassName) {
            target.classList.remove(transitionClassName);
        }

        if (onComplete) {
            onComplete();
        }
    });
}