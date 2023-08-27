/**
 * Copy button for code blocks
*/
export default () => {
    const copyButtons = document.querySelectorAll('.codeblock-copy');
    copyButtons.forEach(button => {
        const codeblockID = button.getAttribute('data-id'),
            copyText = button.textContent,
            copiedText = button.getAttribute('data-copied-text');
        if (!codeblockID) return;
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const codeblock = document.getElementById(codeblockID) as HTMLElement;
            if (!codeblockID) return;
            navigator.clipboard.writeText(codeblock.textContent)
                .then(() => {
                    button.textContent = copiedText;
                    setTimeout(() => {
                        button.textContent = copyText;
                    }, 1000);
                })
                .catch(err => {
                    alert(err)
                    console.log('Something went wrong', err);
                });
        }, false);
    });
}