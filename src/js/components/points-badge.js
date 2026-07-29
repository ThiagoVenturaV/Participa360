export function renderPointsBadge(points, size = 'md') {
    return `
        <div class="points-badge badge-${size}">
            <span class="material-symbols-outlined icon-star">star</span>
            <span class="points-value">${points}</span>
        </div>
    `;
}
