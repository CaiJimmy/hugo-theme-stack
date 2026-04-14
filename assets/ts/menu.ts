import {
    createSlideAnimationState,
    mobileSlideAnimationDurationMs,
    slideClose,
    slideOpen,
    stopSlideTransition
} from './slideAnimation';

const reducedMotionQuery = '(prefers-reduced-motion: reduce)';

function prefersReducedMotion(): boolean {
    return window.matchMedia(reducedMotionQuery).matches;
}

export default function () {
    const toggleMenu = document.getElementById('toggle-menu');
    const mainMenu = document.getElementById('main-menu');

    if (!toggleMenu || !mainMenu) {
        return;
    }

    const animationState = createSlideAnimationState();
    const animationDuration = mobileSlideAnimationDurationMs;

    toggleMenu.addEventListener('click', () => {
        if (mainMenu.classList.contains('transiting')) {
            return;
        }

        const isClosed = window.getComputedStyle(mainMenu).display === 'none';

        if (isClosed) {
            document.body.classList.add('show-menu');
            toggleMenu.classList.add('is-active');

            if (prefersReducedMotion()) {
                stopSlideTransition(mainMenu, animationState, true);
                mainMenu.classList.add('show');
                return;
            }

            slideOpen(mainMenu, animationState, {
                duration: animationDuration,
                transitionProperty: 'height, margin, padding',
                includeSpacing: true,
                expandedClassName: 'show',
                transitionClassName: 'transiting'
            });
            return;
        }

        document.body.classList.remove('show-menu');
        toggleMenu.classList.remove('is-active');

        if (prefersReducedMotion()) {
            stopSlideTransition(mainMenu, animationState, true);
            mainMenu.classList.remove('show');
            mainMenu.classList.remove('transiting');
            return;
        }

        slideClose(mainMenu, animationState, {
            duration: animationDuration,
            transitionProperty: 'height, margin, padding',
            includeSpacing: true,
            expandedClassName: 'show',
            transitionClassName: 'transiting'
        });
    });

    window.addEventListener('resize', () => {
        if (window.getComputedStyle(toggleMenu).display !== 'none') {
            return;
        }

        stopSlideTransition(mainMenu, animationState, true);
        mainMenu.classList.remove('show');
        mainMenu.classList.remove('transiting');
        toggleMenu.classList.remove('is-active');
        document.body.classList.remove('show-menu');
    });
}