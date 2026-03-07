function shuffleGrid(grid: HTMLElement): void {
	const cards = Array.from(grid.children) as HTMLElement[];

	// Fisher-Yates shuffle
	for (let i = cards.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		const temp = cards[i];
		cards[i] = cards[j];
		cards[j] = temp;
	}

	// Re-insert in shuffled order (move nodes, no cloning)
	for (const card of cards) {
		grid.appendChild(card);
	}
}

function initLinks(): void {
	const grids = document.querySelectorAll<HTMLElement>('.link-grid');
	grids.forEach(grid => {
		if (grid.hasAttribute('data-shuffle')) {
			shuffleGrid(grid);
		}
		// Reveal the grid regardless of shuffle — opacity:0 is set in CSS to
		// prevent a flash of unsorted order; grids without shuffle still need
		// to become visible.
		grid.classList.add('shuffled');
	});
}

initLinks();
