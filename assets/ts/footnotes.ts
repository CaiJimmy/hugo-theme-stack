export function setupFootnotes() {
    // Delay slightly to ensure DOM is fully rendered
    setTimeout(() => {
        const footnotes = document.querySelectorAll('.inline-footnote');
        
        footnotes.forEach((footnote) => {
            const sup = footnote.querySelector('.footnote-number') as HTMLElement;
            if (!sup) return;

            // Only open popup when clicking the <sup>
            sup.addEventListener('click', (e) => {
                e.stopPropagation();
                togglePopup(footnote as HTMLElement);
            });
        });

        // Global event listeners for closing popups
        document.addEventListener('click', (e) => {
            const target = e.target as HTMLElement;
            if (!target.closest('.footnote-popup') && !target.closest('.inline-footnote')) {
                closeAllPopups();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeAllPopups();
            }
        });
    }, 100);
}

function togglePopup(footnote: HTMLElement) {
    const existingPopup = document.querySelector('.footnote-popup');
    if (existingPopup) {
        closeAllPopups();
    } else {
        openPopup(footnote);
    }
}

function openPopup(footnote: HTMLElement) {
    // Close all other popups first
    closeAllPopups();

    // Get footnote content
    const content = footnote.getAttribute('data-footnote-content');
    if (!content) return;

    // Create popup element
    const popup = document.createElement('div');
    popup.className = 'footnote-popup active';
    
    // Create content
    const contentDiv = document.createElement('div');
    contentDiv.className = 'footnote-content';
    contentDiv.innerHTML = content;
    
    // Create close button
    const closeBtn = document.createElement('div');
    closeBtn.className = 'footnote-close';
    closeBtn.textContent = '×';
    closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        closeAllPopups();
    });

    // Assemble popup
    popup.appendChild(contentDiv);
    popup.appendChild(closeBtn);
    
    // Position popup relative to the footnote
    const rect = footnote.getBoundingClientRect();
    popup.style.position = 'fixed';
    popup.style.top = (rect.top - 10) + 'px';
    popup.style.left = (rect.left + rect.width / 2) + 'px';
    popup.style.transform = 'translateX(-50%)';
    popup.style.zIndex = '1000';
    
    // Add to document
    document.body.appendChild(popup);
    
    // Prevent popup from closing when clicking inside it
    popup.addEventListener('click', (e) => {
        e.stopPropagation();
    });
}

function closeAllPopups() {
    document.querySelectorAll('.footnote-popup').forEach(popup => {
        popup.remove();
    });
} 