const wrap = (figures: HTMLElement[]) => {
    const galleryContainer = document.createElement('div');
    galleryContainer.className = 'gallery';

    const parentNode = figures[0].parentNode,
        first = figures[0];

    parentNode.insertBefore(galleryContainer, first)

    for (const figure of figures) {
        galleryContainer.appendChild(figure);
    }
}

export default (container: HTMLElement) => {
    /// The process of wrapping image with figure tag is done using JavaScript instead of only Hugo markdown render hook
    /// because it can not detect whether image is being wrapped by a link or not
    /// and it lead to a invalid HTML construction (<a><figure><img></figure></a>)
    const images = container.querySelectorAll('img.gallery-image') as NodeListOf<HTMLImageElement>;
    for (const img of Array.from(images)) {
        /// Images are wrapped with figure tag if the paragraph has only images without texts
        /// This is done to allow inline images within paragraphs
        const paragraph = img.closest('p');

        if (!paragraph || !container.contains(paragraph)) continue;

        if (paragraph.textContent.trim() == '') {
            /// Once we insert figcaption, this check no longer works
            /// So we add a class to paragraph to mark it
            paragraph.classList.add('no-text');
        }

        let isNewLineImage = paragraph.classList.contains('no-text');
        if (!isNewLineImage) continue;

        const hasLink = img.parentElement.tagName == 'A';

        let el: HTMLElement = img;
        /// Wrap image with figure tag, with flex-grow and flex-basis values extracted from img's data attributes
        const figure = document.createElement('figure');
        figure.style.setProperty('flex-grow', img.getAttribute('data-flex-grow') || '1');
        figure.style.setProperty('flex-basis', img.getAttribute('data-flex-basis') || '0');
        if (hasLink) {
            /// Wrap <a> if it exists
            el = img.parentElement;
        }
        el.parentElement.insertBefore(figure, el);
        figure.appendChild(el);

        /// Add figcaption if it exists
        if (img.hasAttribute('alt')) {
            const figcaption = document.createElement('figcaption');
            figcaption.innerText = img.getAttribute('alt');
            figure.appendChild(figcaption);
        }

        /// Wrap img tag with <a> tag if image was not wrapped by <a> tag
        if (!hasLink) {
            figure.className = 'gallery-image';

            const a = document.createElement('a');
            a.href = img.src;
            a.setAttribute('target', '_blank');
            a.setAttribute('data-pswp-width', img.width.toString());
            a.setAttribute('data-pswp-height', img.height.toString());
            img.parentNode.insertBefore(a, img);
            a.appendChild(img);
        }
    }

    const figuresEl = container.querySelectorAll('figure.gallery-image') as NodeListOf<HTMLElement>;
    let currentGallery = [];
    for (const figure of Array.from(figuresEl)) {
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
            wrap(currentGallery);
            currentGallery = [figure];
        }
    }

    if (currentGallery.length > 0) {
        wrap(currentGallery);
    }
};