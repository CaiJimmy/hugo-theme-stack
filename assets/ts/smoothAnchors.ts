// Implements smooth scrolling when clicking on an anchor link.
// This is required instead of using modern CSS because Chromium does not currently support scrolling
// one element with scrollTo while another element is scrolled because of a click on a link. This would thus not work with the ToC scrollspy.

const anchorLinksQuery = "a[href]";

function setupSmoothAnchors() {
    document.querySelectorAll(anchorLinksQuery).forEach(aElement => {
        let href = aElement.getAttribute("href");
        if (!href.startsWith("#")) {
            return;
        }
        aElement.addEventListener("click", clickEvent => {
            clickEvent.preventDefault();

            let targetId = aElement.getAttribute("href").substring(1);
            let target = document.querySelector(`#${targetId.replace(":", "\\:")}`) as HTMLElement;
            
            //let tocLink = findLinkForSectionId(targetId, navigation);
            //if (tocLink) {
            //    scrollToTocElement(tocLink, scrollableNavigation);
            //}

            window.history.pushState({}, "", aElement.getAttribute("href"));
            scrollTo({ top: target.offsetTop, behavior: "smooth" });
        });
    });
}

export { setupSmoothAnchors };