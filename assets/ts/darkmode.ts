export default () => {
    const toggleDarkMode = document.getElementById('dark-mode-toggle');
    const darkModeKey = 'StackDarkMode';
    const darkModeEnabled = localStorage.getItem(darkModeKey) === 'true';

    let darkMode = false;

    if (darkModeEnabled) {
        darkMode = true;
    }
    else {
        darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches === true;
    }

    document.body.style.setProperty('transition', 'background-color .3s ease');

    toggleDarkMode.addEventListener('click', (e) => {
        darkMode = !darkMode;

        if (darkMode) {
            document.body.classList.add('theme-dark');
        }
        else {
            document.body.classList.remove('theme-dark');
        }

        localStorage.setItem(darkModeKey, darkMode.toString());
    })
}