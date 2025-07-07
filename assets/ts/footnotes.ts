import { createPopper, Instance as PopperInstance } from '@popperjs/core';

// Function to decode HTML entities
function decodeHTMLEntities(text: string): string {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = text;
    return textarea.value;
}

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
        openPopup(footnote);
    } else {
        openPopup(footnote);
    }
}

let currentPopper: PopperInstance | null = null;

function openPopup(footnote: HTMLElement) {
    closeAllPopups();
    const content = footnote.getAttribute('data-footnote-content');
    if (!content) return;
    const popup = document.createElement('div');
    popup.className = 'footnote-popup active';
    const contentDiv = document.createElement('div');
    contentDiv.className = 'footnote-content';
    const decodedContent = decodeHTMLEntities(content);
    contentDiv.innerHTML = decodedContent;
    const closeBtn = document.createElement('div');
    closeBtn.className = 'footnote-close';
    closeBtn.textContent = '×';
    closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        closeAllPopups();
    });
    popup.appendChild(contentDiv);
    popup.appendChild(closeBtn);
    document.body.appendChild(popup);
    // Use Popper.js for positioning
    const sup = footnote.querySelector('.footnote-number') as HTMLElement;
    if (sup) {
        currentPopper = createPopper(sup, popup, {
            placement: 'top',
            modifiers: [
                { name: 'offset', options: { offset: [0, 8] } },
                { name: 'preventOverflow', options: { boundary: 'viewport' } },
                { name: 'flip', options: { fallbackPlacements: ['bottom', 'right', 'left'] } },
            ],
        });
    }
    popup.addEventListener('click', (e) => {
        e.stopPropagation();
    });
}

function closeAllPopups() {
    document.querySelectorAll('.footnote-popup').forEach(popup => {
        popup.remove();
    });
    if (currentPopper) {
        currentPopper.destroy();
        currentPopper = null;
    }
}

function populateFootnotesWidget() {
    const widgetList = document.querySelector('.widget--footnotes .footnotes-list');
    if (!widgetList) return;
    // Clear any existing content
    widgetList.innerHTML = '';
    const footnotes = document.querySelectorAll('.inline-footnote');
    footnotes.forEach((footnote) => {
        const id = footnote.getAttribute('data-footnote-id');
        const content = footnote.getAttribute('data-footnote-content');
        if (!id || !content) return;
        const li = document.createElement('li');
        li.id = id;
        li.className = 'footnote-item';
        li.innerHTML = decodeHTMLEntities(content);
        widgetList.appendChild(li);
    });
}

// Call both setupFootnotes and populateFootnotesWidget on DOMContentLoaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setupFootnotes();
        populateFootnotesWidget();
    });
} else {
    setupFootnotes();
    populateFootnotesWidget();
} 