import { loadScript, loadStyle } from 'ts/utils';

declare global {
    interface Window {
        PhotoSwipe: any;
        PhotoSwipeUI_Default: any
    }
}

interface PhotoSwipeItem {
    w: number;
    h: number;
    src: string;
    msrc: string;
    title?: string;
    el: HTMLElement;
}

class StackGallery {
    private items: PhotoSwipeItem[] = [];

    constructor(container: HTMLElement) {
        StackGallery.createGallery(container);
        this.initItems(container);
        StackGallery.loadPS().then(() => { this.initPS() });
    }

    private initItems(container: HTMLElement) {
        this.items = [];

        const figures = container.querySelectorAll('figure');

        for (const el of figures) {
            const figcaption = el.querySelector('figcaption'),
                img = el.querySelector('img');

            let aux: PhotoSwipeItem = {
                w: parseInt(img.getAttribute('width')),
                h: parseInt(img.getAttribute('height')),
                src: img.src,
                msrc: img.getAttribute('data-thumb') || img.src,
                el: el
            }

            if (figcaption) {
                aux.title = figcaption.innerHTML;
            }

            this.items.push(aux);
        }
    }

    public static createGallery(container: HTMLElement) {
        const figuresEl = container.querySelectorAll('figure');

        let currentGallery = [];

        for (const figure of figuresEl) {
            if (!currentGallery.length) {
                /// First iteration
                currentGallery = [figure];
            }
            else if (figure.previousElementSibling === currentGallery[currentGallery.length - 1]) {
                /// Adjacent figures
                currentGallery.push(figure);
            }
            else if (currentGallery.length) {
                /// End gallery
                StackGallery.wrap(currentGallery);
                currentGallery = [figure];
            }
        }

        if (currentGallery.length > 0) {
            StackGallery.wrap(currentGallery);
        }
    }

    /**
     * Wrap adjacent figure tags with div.gallery, and append style
     * Reference: https://github.com/xieranmaya/blog/issues/6
     * @param figures 
     */
    public static wrap(figures: HTMLElement[]) {
        let galleryContainer = document.createElement('div');
        galleryContainer.className = 'gallery';

        let parentNode = figures[0].parentNode,
            first = figures[0];

        parentNode.insertBefore(galleryContainer, first)

        for (const figure of figures) {
            const width = figure.querySelector('img').width,
                height = figure.querySelector('img').height;

            figure.style.flexGrow = `${width * 100 / height}`;
            figure.style.flexBasis = `${width * 240 / height}px`;

            galleryContainer.appendChild(figure);
        }
    }

    /**
     * Load PhotoSwipe library dynamically
     */
    public static loadPS() {
        const tasks = [
            loadScript("https://cdn.jsdelivr.net/npm/photoswipe@4.1.3/dist/photoswipe.min.js"),
            loadScript("https://cdn.jsdelivr.net/npm/photoswipe@4.1.3/dist/photoswipe-ui-default.min.js"),
            loadStyle("https://cdn.jsdelivr.net/npm/photoswipe@4.1.3/dist/photoswipe.min.css"),
            loadStyle("https://cdn.jsdelivr.net/npm/photoswipe@4.1.3/dist/default-skin/default-skin.min.css")
        ];

        return Promise.all(tasks);
    }

    private initPS() {
        const pswp = document.querySelector('.pswp') as HTMLDivElement;
        pswp.style.removeProperty('display');

        for (const [index, item] of this.items.entries()) {
            const a = item.el.querySelector('a');

            a.addEventListener('click', (e) => {
                e.preventDefault();

                const pswp = document.querySelector('.pswp') as HTMLDivElement;
                const ps = new window.PhotoSwipe(pswp, window.PhotoSwipeUI_Default, this.items, {
                    index: index,
                    getThumbBoundsFn: (index) => {
                        const thumbnail = this.items[index].el.getElementsByTagName('img')[0],
                            pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                            rect = thumbnail.getBoundingClientRect();

                        return { x: rect.left, y: rect.top + pageYScroll, w: rect.width };
                    }
                });

                ps.init();
            })
        }
    }
}

export default StackGallery;