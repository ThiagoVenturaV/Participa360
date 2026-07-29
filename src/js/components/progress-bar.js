export function renderProgressBar(percent, label = '') {
    return `
        <div class="progress-component">
            ${label ? `<div class="progress-label-text">${label}</div>` : ''}
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${percent}%;"></div>
            </div>
        </div>
    `;
}
