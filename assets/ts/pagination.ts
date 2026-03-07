export function setupPaginationJump() {
    const triggers = document.querySelectorAll('.pagination-jump-trigger');
    const dialog = document.getElementById('pagination-jump-dialog') as HTMLDialogElement;

    if (!dialog || triggers.length === 0) return;

    const nav = document.querySelector('.pagination') as HTMLElement;
    const input = document.getElementById('pagination-jump-input') as HTMLInputElement;
    const form = dialog.querySelector('.pagination-jump-form') as HTMLFormElement;

    const closeDialog = () => {
        dialog.classList.add('closing');
        dialog.addEventListener('animationend', function handleAnimationEnd() {
            dialog.classList.remove('closing');
            dialog.close();
            dialog.removeEventListener('animationend', handleAnimationEnd);
        });
    };

    // Open dialog when triggers are clicked
    triggers.forEach((trigger) => {
        trigger.addEventListener('click', () => {
            dialog.showModal();
            input.value = '';
            input.focus();
        });
    });

    // Handle ESC key closing the dialog
    dialog.addEventListener('cancel', (e) => {
        e.preventDefault();
        closeDialog();
    });

    // Close dialog when clicking backdrop
    dialog.addEventListener('click', (e) => {
        const rect = dialog.getBoundingClientRect();
        const isInDialog =
            rect.top <= e.clientY &&
            e.clientY <= rect.top + rect.height &&
            rect.left <= e.clientX &&
            e.clientX <= rect.left + rect.width;
        if (!isInDialog) {
            closeDialog();
        }
    });

    // Allow Enter key to trigger validation and submit
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (form.reportValidity()) {
                form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
            }
        }
    });

    // Handle form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const targetPage = parseInt(input.value);
        if (isNaN(targetPage) || targetPage < 1) return;

        const totalPages = parseInt(nav.dataset.total || '0');
        if (targetPage > totalPages) return;

        const firstUrl = nav.dataset.firstUrl || '';
        const formatUrl = nav.dataset.formatUrl || '';

        let targetUrl = '';
        if (targetPage === 1) {
            targetUrl = firstUrl;
        } else {
            // formatUrl is the URL for page 2. E.g., /tags/page/2/ or /page/2/
            // Replace the '2' before the trailing slash or .html with the target page number
            targetUrl = formatUrl.replace(/2([^\d]*)$/, `${targetPage}$1`);
        }

        if (targetUrl) {
            window.location.href = targetUrl;
        }

        closeDialog();
    });
}
