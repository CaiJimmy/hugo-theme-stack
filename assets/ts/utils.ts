/**
 * Load script asynchronous
 * @return {Promise}
 * @param url 
 */
const loadScript = function (url) {
    return new Promise(resolve => {
        var scriptTag = document.createElement('script');
        scriptTag.src = url;

        scriptTag.onload = () => {
            resolve();
        };

        document.head.appendChild(scriptTag);
    })
};

/**
 * Load style asynchronous
 * @return {Promise}
 * @param url 
 */
const loadStyle = function (url) {
    return new Promise(resolve => {
        var link = document.createElement('link');
        link.href = url;

        link.type = "text/css";
        link.rel = "stylesheet";

        link.onload = () => {
            resolve();
        };

        document.head.appendChild(link);
    });
};

export {
    loadScript,
    loadStyle
}