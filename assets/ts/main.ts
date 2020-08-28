import { createGallery } from "./gallery"
import { getColor } from './color';
import menu from './menu';

let Stack = {
    init: () => {
        /**
         * Bind menu event
         */
        menu();

        /**
         * Add timeago
         */
        const timeagoElements = document.querySelectorAll('article time[data-timeago=true]');
        if (timeagoElements.length) {
            timeago.render(timeagoElements);
        }

        if (document.querySelector('.article-content')) {
            createGallery('.article-content');
        }

        /**
         * Add color to tags
         */
        document.querySelectorAll('.color-tag').forEach(async (tag: HTMLLinkElement) => {
            const imageURL = tag.getAttribute('data-image'),
                id = tag.getAttribute('data-id'),
                key = tag.getAttribute('data-key');

            const colors = await getColor(id, key, imageURL);

            tag.style.color = colors.Vibrant.bodyTextColor;
            tag.style.background = colors.Vibrant.hex;
        })

        /**
         * Add linear gradient background to tile style article
         */
        const articleTile = document.querySelector('.article-list--tile');
        if (articleTile) {
            let observer = new IntersectionObserver(async (entries, observer) => {
                entries.forEach(entry => {
                    if (!entry.isIntersecting) return;
                    observer.unobserve(entry.target);

                    const articles = entry.target.querySelectorAll('article.has-image');
                    articles.forEach(async articles => {
                        const image = articles.querySelector('img'),
                            imageURL = image.src,
                            id = image.getAttribute('data-id'),
                            key = image.getAttribute('data-key'),
                            articleDetails: HTMLDivElement = articles.querySelector('.article-details');

                        const colors = await getColor(id, key, imageURL);

                        articleDetails.style.background = `
                        linear-gradient(0deg, 
                            rgba(${colors.DarkMuted.rgb[0]}, ${colors.DarkMuted.rgb[1]}, ${colors.DarkMuted.rgb[2]}, 0.5) 0%, 
                            rgba(${colors.Vibrant.rgb[0]}, ${colors.Vibrant.rgb[1]}, ${colors.Vibrant.rgb[2]}, 0.75) 100%)`;
                    })
                })
            });

            observer.observe(articleTile)
        }
    },
    alert: (content, time = 5000, animationSpeed = 500) => {
        const alert = document.createElement('div');
        alert.innerHTML = content;
        alert.className = 'alert';
        alert.style.visibility = 'hidden';
        document.body.appendChild(alert);

        alert.style.transform = `translateY(${alert.clientHeight + 50}px)`;
        alert.style.transition = `transform ${animationSpeed / 1000}s ease`;

        setTimeout(() => {
            alert.style.removeProperty('visibility');
            alert.style.transform = `translateY(0)`;
        }, animationSpeed);

        setTimeout(() => {
            alert.style.transform = `translateY(${alert.clientHeight + 50}px)`;
        }, animationSpeed + time);

        setTimeout(() => {
            alert.remove();
        }, 2 * animationSpeed + time);
    }
}

window.addEventListener('load', () => {
    setTimeout(function () {
        Stack.init();
    }, 0);
})

window.Stack = Stack;