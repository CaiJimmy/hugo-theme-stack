type colorScheme = 'light' | 'dark' | 'auto';

const colorSchemeKey = 'StackColorScheme';
const mql = window.matchMedia('(prefers-color-scheme: dark)');
const schemeSelect = document.getElementById('schemeSelect') as HTMLSelectElement;

const supportDarkMode = () => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches === true;
}

const saveScheme = (scheme: colorScheme) => {
    localStorage.setItem(colorSchemeKey, scheme);
}

const getScheme = () => {
    return localStorage.getItem(colorSchemeKey) as colorScheme;
};

const setScheme = (scheme: colorScheme) => {
    if (scheme === 'auto') {
        if (supportDarkMode()) {
            document.body.dataset.scheme = 'dark';
        }
        else {
            document.body.dataset.scheme = 'light';
        }
    }
    else {
        document.body.dataset.scheme = scheme;
    }
}

const mediaQueryListener = (e) => {
    setScheme('auto');
}

export default () => {
    document.body.style.setProperty('transition', 'background-color .3s ease');

    if (!getScheme()) {
        /// First time visiting
        setScheme('auto');
        saveScheme('auto')
        mql.addEventListener('change', mediaQueryListener);
    }
    else {
        setScheme(getScheme());
    }

    schemeSelect.value = getScheme();

    schemeSelect.addEventListener('change', (e) => {
        const value = schemeSelect.value as colorScheme;

        setScheme(value);
        saveScheme(value);

        if (value === 'auto') {
            mql.addEventListener('change', mediaQueryListener);
        }
        else {
            /**
             * Remove listener once user set color preference in website
             */
            mql.removeEventListener('change', mediaQueryListener);
        }
    })
}