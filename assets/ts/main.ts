/*!
*   Hugo Theme Stack
*
*   @author: Jimmy Cai
*   @website: https://jimmycai.com
*   @link: https://github.com/CaiJimmy/hugo-theme-stack
*/
import menu from './menu';
import createElement from './createElement';
import StackColorScheme from './colorScheme';
import { setupScrollspy } from './scrollspy';
import { setupSmoothAnchors } from './smoothAnchors';
import { setupPaginationJump } from './pagination';
import { setupCodeCopy } from './code-copy';

let Stack = {
    init: () => {
        /**
         * Bind menu event
         */
        menu();

        const articleContent = document.querySelector('.article-content') as HTMLElement;
        if (articleContent) {
            setupSmoothAnchors();
            setupScrollspy();
            setupCodeCopy();
        }

        setupPaginationJump();

        new StackColorScheme(document.getElementById('dark-mode-toggle')!);
    }
}

window.addEventListener('load', () => {
    setTimeout(function () {
        Stack.init();
    }, 0);
})

declare global {
    interface Window {
        createElement: any;
        Stack: any
    }
}

window.Stack = Stack;
window.createElement = createElement;