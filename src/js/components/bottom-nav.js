export function renderBottomNav(activeTab) {
    const tabs = [
        { id: 'inicio', icon: 'home', label: 'Início', path: '/' },
        { id: 'alertas', icon: 'notifications', label: 'Alertas', path: '/alertas' },
        { id: 'acao', icon: 'add_circle', label: 'Ação', path: '/acao' },
        { id: 'perfil', icon: 'person', label: 'Perfil', path: '/perfil' }
    ];

    const tabHtml = tabs.map(tab => `
        <a href="${tab.path}" class="nav-item ${activeTab === tab.id ? 'active' : ''}" data-tab="${tab.id}">
            <span class="material-symbols-outlined">${tab.icon}</span>
            <span class="nav-label">${tab.label}</span>
        </a>
    `).join('');

    return `
        <nav class="bottom-nav">
            ${tabHtml}
        </nav>
    `;
}
