import DefaultTheme from 'vitepress/theme'
import './custom.css'

export default {
    ...DefaultTheme,
    enhanceApp({ router }) {
        const oldOnAfterRouteChanged = router.onAfterRouteChanged;

        router.onAfterRouteChanged = () => {
            oldOnAfterRouteChanged && oldOnAfterRouteChanged();
            if (typeof _carbonads !== 'undefined')
                _carbonads.refresh();
        }
    }
}