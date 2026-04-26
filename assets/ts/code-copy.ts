import * as params from '@params';

export function setupCodeCopy() {
    /**
     * Add copy button to code block
    */
    const highlights = document.querySelectorAll('.article-content div.highlight');
    const copyText = params.codeblock.copy,
        copiedText = params.codeblock.copied;

    if (!navigator.clipboard) {
        /// Clipboard API is only supported in secure contexts (HTTPS)
        console.warn('Clipboard API not supported, copy button will not work.');
        return;
    }

    highlights.forEach(highlight => {
        const copyButton = document.createElement('button');
        copyButton.innerHTML = copyText;
        copyButton.classList.add('copyCodeButton');
        highlight.appendChild(copyButton);

        const codeBlock = highlight.querySelector('code[data-lang]');
        if (!codeBlock) return;

        copyButton.addEventListener('click', () => {
            navigator.clipboard.writeText(codeBlock.textContent)
                .then(() => {
                    copyButton.textContent = copiedText;

                    setTimeout(() => {
                        copyButton.textContent = copyText;
                    }, 1000);
                })
                .catch(err => {
                    alert(err)
                    console.log('Something went wrong', err);
                });
        });
    });
};