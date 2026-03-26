/**
 * Enhanced card hover effect with subtle 3D tilt.
 * Adds depth perception while maintaining performance.
 */
export function init3DCardEffect(selector: string, intensity: number = 15): void {
	if (typeof document === 'undefined') return;

	// Skip if the user prefers reduced motion
	if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

	const cards = document.querySelectorAll<HTMLElement>(selector);

	cards.forEach(card => {
		card.style.transformStyle = 'preserve-3d';
		const scale = Math.min(1.02, Math.max(1.006, 1 + intensity / 1200));

		// Subtle tilt based on mouse position
		let isHovering = false;

		function onMove(e: MouseEvent) {
			if (!isHovering) return;

			const rect = card.getBoundingClientRect();
			const x = e.clientX - rect.left;
			const y = e.clientY - rect.top;

			const centerX = rect.width / 2;
			const centerY = rect.height / 2;

			// Calculate rotation angles (extremely subtle for minimal effect)
			const rotateX = ((y - centerY) / centerY) * -0.3; // Max 0.3deg
			const rotateY = ((x - centerX) / centerX) * 0.3;  // Max 0.3deg

			card.style.transition = 'transform 0.15s ease-out';
			card.style.transform = `
				perspective(1000px)
				scale(${scale})
				rotateX(${rotateX}deg)
				rotateY(${rotateY}deg)
			`;
		}

		function onLeave() {
			isHovering = false;
			card.style.transition = 'transform 0.45s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
			card.style.transform = 'scale(1) rotateX(0deg) rotateY(0deg)';
		}

		function onEnter() {
			isHovering = true;
		}

		card.addEventListener('mousemove', onMove);
		card.addEventListener('mouseleave', onLeave);
		card.addEventListener('mouseenter', onEnter);
	});
}

