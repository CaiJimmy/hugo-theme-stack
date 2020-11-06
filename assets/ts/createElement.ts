/**
 * createElement
 * Edited from:
 * @link https://stackoverflow.com/a/42405694
 */
function createElement(tag, attrs, children) {
    var element = document.createElement(tag);

    for (let name in attrs) {
        if (name && attrs.hasOwnProperty(name)) {
            let value = attrs[name];

            if (name == "dangerouslySetInnerHTML") {
                element.innerHTML = value.__html;
            }
            else if (value === true) {
                element.setAttribute(name, name);
            } else if (value !== false && value != null) {
                element.setAttribute(name, value.toString());
            }
        }
    }
    for (let i = 2; i < arguments.length; i++) {
        let child = arguments[i];
        if (child) {
            element.appendChild(
                child.nodeType == null ?
                    document.createTextNode(child.toString()) : child);
        }
    }
    return element;
}

export default createElement;