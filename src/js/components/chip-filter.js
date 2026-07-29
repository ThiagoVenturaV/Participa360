export function renderChipFilters(options, activeValue, onSelect) {
    const id = `chip-filter-${Math.random().toString(36).substr(2, 9)}`;
    
    // Custom window function hook to handle clicks from string template HTML
    window[`onSelect_${id}`] = (value) => {
        if(onSelect) onSelect(value);
    };

    const chipsHtml = options.map(opt => `
        <button class="chip ${activeValue === opt.value ? 'active' : ''}" onclick="window['onSelect_${id}']('${opt.value}')">
            ${opt.label}
        </button>
    `).join('');

    return `
        <div class="chip-filters-container" id="${id}">
            ${chipsHtml}
        </div>
    `;
}
