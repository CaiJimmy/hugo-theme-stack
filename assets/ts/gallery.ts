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
    private galleryUID: number;
    private items: PhotoSwipeItem[] = [];

    constructor(container: HTMLElement, galleryUID = 1) {
        if (window.PhotoSwipe == undefined || window.PhotoSwipeUI_Default == undefined) {
            console.error("PhotoSwipe lib not loaded.");
            return;
        }

        this.galleryUID = galleryUID;

        StackGallery.createGallery(container);
        this.loadItems(container);
        this.bindClick();
    }

    private loadItems(container: HTMLElement) {
        this.items = [];

        const figures = container.querySelectorAll('figure.gallery-image');

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
        const figuresEl = container.querySelectorAll('figure.gallery-image');

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
     * Wrap adjacent figure tags with div.gallery
     * @param figures 
     */
    public static wrap(figures: HTMLElement[]) {
        const galleryContainer = document.createElement('div');
        galleryContainer.className = 'gallery';

        const parentNode = figures[0].parentNode,
            first = figures[0];

        parentNode.insertBefore(galleryContainer, first)

        for (const figure of figures) {
            galleryContainer.appendChild(figure);
        }
    }

    public open(index: number) {
        const pswp = document.querySelector('.pswp') as HTMLDivElement;
        const ps = new window.PhotoSwipe(pswp, window.PhotoSwipeUI_Default, this.items, {
            index: index,
            galleryUID: this.galleryUID,
            getThumbBoundsFn: (index) => {
                const thumbnail = this.items[index].el.getElementsByTagName('img')[0],
                    pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                    rect = thumbnail.getBoundingClientRect();

                return { x: rect.left, y: rect.top + pageYScroll, w: rect.width };
            }
        });

        ps.init();
    }

    private bindClick() {
        for (const [index, item] of this.items.entries()) {
            const a = item.el.querySelector('a');

            a.addEventListener('click', (e) => {
                e.preventDefault();
                this.open(index);
            })
        }
    }
}

export default StackGallery;