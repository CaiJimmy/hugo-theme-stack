// While solutions for debouncing like the ones in https://gomakethings.com/debouncing-your-javascript-events/ could work,
// we do need an actual debouncing of scroll events in order to only capture the "end" of the scroll.
function debounced(func: Function) {
    let timeout;
    return (e: Event) => {
        /*
        if (timeout) {
            clearTimeout(timeout);
        }
        timeout = window.requestAnimationFrame(func);
        */
        if (timeout) {
            window.cancelAnimationFrame(timeout);
        }

        timeout = window.requestAnimationFrame(() => func(e));
    }
}

function setupScrollspy(headersQuery: string, tocQuery: string, navigationQuery: string, activeClass: string) {
    let headers = document.querySelectorAll(headersQuery);
    if (!headers) {
        console.warn("No header matched query", headers);
        return;
    }

    let scrollableNavigation = document.querySelector(tocQuery);
    if (!scrollableNavigation) {
        console.warn("No toc matched query", tocQuery);
        return;
    }

    let navigation = document.querySelectorAll(navigationQuery);
    if (!navigation) {
        console.warn("No navigation matched query", navigationQuery);
        return;
    }

    let sectionsOffsets = [];

    headers.forEach((header: HTMLElement) => { sectionsOffsets.push({ id: header.id, offset: header.offsetTop }) });
    sectionsOffsets.sort((a, b) => a.offset - b.offset);

    let activeSectionLink: Element;
    let tocHovered: boolean = false;

    function hoverHandler(isHovered: boolean) {
        tocHovered = isHovered;
    }

    function scrollHandler(e: Event) {
        let scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;

        let newActiveSection: HTMLElement;

        sectionsOffsets.forEach((section) => {
            if (scrollPosition >= section.offset - 20) {
                newActiveSection = document.getElementById(section.id);
            }
        });

        let newActiveSectionLink: HTMLElement;
        if (newActiveSection) {
            for (let i = 0; i < navigation.length; i++) {
                let link = navigation[i].querySelector("a");
                if (link.getAttribute("href") === "#" + newActiveSection.id) {
                    newActiveSectionLink = navigation[i] as HTMLElement;
                    break;
                }
            }
        }

        if (newActiveSection && !newActiveSectionLink) {
            console.warn("No link found for section", newActiveSection);
        } else if (newActiveSectionLink !== activeSectionLink) {
            if (activeSectionLink)
                activeSectionLink.classList.remove(activeClass);
            if (newActiveSectionLink) {
                newActiveSectionLink.classList.add(activeClass);
                if (!tocHovered) {
                    // Scroll so that newActiveSectionLink is in the middle of scrollableNavigation, except when it's from a manual click (hence the tocHovered check)
                    let textHeight = newActiveSectionLink.querySelector("a").offsetHeight;
                    let scrollTop = newActiveSectionLink.offsetTop - scrollableNavigation.offsetHeight / 2 + textHeight / 2 - scrollableNavigation.offsetTop;
                    if (scrollTop < 0) {
                        scrollTop = 0;
                    }
                    scrollableNavigation.scrollTo({ top: scrollTop, behavior: "auto" });
                }
            }
            activeSectionLink = newActiveSectionLink;
        }
    }

    window.addEventListener("scroll", debounced(scrollHandler));
    scrollableNavigation.addEventListener("mouseenter", debounced(() => hoverHandler(true)));
    scrollableNavigation.addEventListener("mouseleave", debounced(() => hoverHandler(false)));
}

export { setupScrollspy };