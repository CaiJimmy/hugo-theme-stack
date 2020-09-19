export default () => {
    const toggleDarkMode = document.getElementById('dark-mode-toggle');
    const darkModeKey = 'StackDarkMode';
    const darkModeItem = localStorage.getItem(darkModeKey);
    const darkModeEnabled = localStorage.getItem(darkModeKey) === 'true';
    const supportDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches === true;
    const mql = window.matchMedia('(prefers-color-scheme: dark)');

    let darkMode = false;

    if (darkModeItem && darkModeEnabled || !darkModeItem && supportDarkMode) {
        /**
         * Enable dark mode if:
         * 1. If dark mode is set already (in local storage)
         * 2. No color scheme preference is set in localstorage, and user's browser indicates preference for dark mode
         */
        darkMode = true;
    }

    const setBodyClass = () => {
        if (darkMode) {
            document.body.classList.add('theme-dark');
        }
        else {
            document.body.classList.remove('theme-dark');
        }
    }

    const mediaQueryListener = (e) => {
        darkMode = e.matches;
        setBodyClass();
    }
    
    let listening = false;
    if (!darkModeItem) {
        /**
         * If no dark mode preference is set in local storage, listen to browser color preference change
         */
        mql.addEventListener('change', mediaQueryListener);
        listening = true;
    }

    document.body.style.setProperty('transition', 'background-color .3s ease');

    toggleDarkMode.addEventListener('click', (e) => {
        darkMode = !darkMode;
        setBodyClass();
        localStorage.setItem(darkModeKey, darkMode.toString());

        if (listening) {
            /**
             * Remove listener once user set color preference in website
             */
            mql.removeEventListener('change', mediaQueryListener);
            listening = false;
        }
    })
}