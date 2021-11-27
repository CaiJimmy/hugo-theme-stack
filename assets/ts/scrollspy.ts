// Implements a scroll spy system for the ToC, displaying the current section with an indicator and scrolling to it when needed.

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

const headersQuery = ".article-content h1[id], .article-content h2[id], .article-content h3[id], .article-content h4[id], .article-content h5[id], .article-content h6[id]";
const tocQuery = "#TableOfContents";
const navigationQuery = "#TableOfContents li";
const activeClass = "active-class";

function scrollToTocElement(tocElement: HTMLElement, scrollableNavigation: HTMLElement) {
    let textHeight = tocElement.querySelector("a").offsetHeight;
    let scrollTop = tocElement.offsetTop - scrollableNavigation.offsetHeight / 2 + textHeight / 2 - scrollableNavigation.offsetTop;
    if (scrollTop < 0) {
        scrollTop = 0;
    }
    scrollableNavigation.scrollTo({ top: scrollTop, behavior: "smooth" });
}

function findLinkForSectionId(sectionId: string, navigation: NodeListOf<Element>): HTMLElement | undefined {
    for (let i = 0; i < navigation.length; i++) {
        let link = navigation[i].querySelector("a");
        if (link.getAttribute("href") === "#" + sectionId) {
            return navigation[i] as HTMLElement;
        }
    }

    return undefined;
}

function setupScrollspy() {
    let headers = document.querySelectorAll(headersQuery);
    if (!headers) {
        console.warn("No header matched query", headers);
        return;
    }

    let scrollableNavigation = document.querySelector(tocQuery) as HTMLElement | undefined;
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

    // We need to avoid scrolling when the user is actively interacting with the ToC. Otherwise, if the user clicks on a link in the ToC,
    // we would scroll their view, which is not optimal usability-wise.
    let tocHovered: boolean = false;
    scrollableNavigation.addEventListener("mouseenter", debounced(() => tocHovered = true));
    scrollableNavigation.addEventListener("mouseleave", debounced(() => tocHovered = false));

    let activeSectionLink: Element;

    function scrollHandler(e: Event) {
        let scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;

        let newActiveSection: HTMLElement | undefined;

        // Find the section that is currently active.
        // It is possible for no section to be active, so newActiveSection may be undefined.
        sectionsOffsets.forEach((section) => {
            if (scrollPosition >= section.offset - 20) {
                newActiveSection = document.getElementById(section.id);
            }
        });

        // Find the link for the active section. Once again, there are a few edge cases:
        // - No active section = no link => undefined
        // - No active section but the link does not exist in toc (e.g. because it is outside of the applicable ToC levels) => undefined
        let newActiveSectionLink: HTMLElement | undefined 
        if (newActiveSection) {
            newActiveSectionLink = findLinkForSectionId(newActiveSection.id, navigation);
        }

        if (newActiveSection && !newActiveSectionLink) {
            // The active section does not have a link in the ToC, so we can't scroll to it.
            console.warn("No link found for section", newActiveSection);
        } else if (newActiveSectionLink !== activeSectionLink) {
            if (activeSectionLink)
                activeSectionLink.classList.remove(activeClass);
            if (newActiveSectionLink) {
                newActiveSectionLink.classList.add(activeClass);
                if (!tocHovered) {
                    // Scroll so that newActiveSectionLink is in the middle of scrollableNavigation, except when it's from a manual click (hence the tocHovered check)
                    scrollToTocElement(newActiveSectionLink, scrollableNavigation);
                }
            }
            activeSectionLink = newActiveSectionLink;
        }
    }

    window.addEventListener("scroll", debounced(scrollHandler));
}

export { setupScrollspy };