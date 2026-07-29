export function renderUserHeader(user) {
    return `
        <header class="app-header user-header">
            <div class="user-info">
                <div class="avatar">
                    ${user.avatarUrl ? `<img src="${user.avatarUrl}" alt="${user.name}">` : `<span class="initials">${user.name.charAt(0)}</span>`}
                </div>
                <div class="user-details">
                    <span class="user-name">${user.name}</span>
                    <span class="user-level">Nível ${user.level || 1}</span>
                </div>
            </div>
            <div class="header-actions">
                <div class="points-badge">
                    <span class="material-symbols-outlined">star</span>
                    <span>${user.points || 0}</span>
                </div>
                <button class="icon-button notification-bell">
                    <span class="material-symbols-outlined">notifications</span>
                </button>
            </div>
        </header>
    `;
}

export function renderBrandHeader() {
    return `
        <header class="app-header brand-header">
            <h1 class="brand-title">Participa 360</h1>
            <div class="header-actions">
                <button class="icon-button notification-bell">
                    <span class="material-symbols-outlined">notifications</span>
                </button>
            </div>
        </header>
    `;
}
