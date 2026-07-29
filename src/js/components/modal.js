export function showModal({ title, content, actions }) {
    const modalId = 'p360-modal';
    let modalEl = document.getElementById(modalId);
    if (!modalEl) {
        modalEl = document.createElement('div');
        modalEl.id = modalId;
        modalEl.className = 'modal-backdrop';
        document.body.appendChild(modalEl);
    }
    
    const actionsHtml = (actions || []).map(action => `
        <button class="button ${action.type || 'primary'}" id="modal-action-${action.id}">${action.label}</button>
    `).join('');

    modalEl.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>${title}</h2>
                <button class="icon-button close-modal" onclick="hideModal()">
                    <span class="material-symbols-outlined">close</span>
                </button>
            </div>
            <div class="modal-body">
                ${content}
            </div>
            <div class="modal-footer">
                ${actionsHtml}
            </div>
        </div>
    `;
    
    modalEl.style.display = 'flex';

    if (actions) {
        actions.forEach(action => {
            const btn = document.getElementById(`modal-action-${action.id}`);
            if (btn && action.onClick) {
                btn.addEventListener('click', action.onClick);
            }
        });
    }
}

export function hideModal() {
    const modalEl = document.getElementById('p360-modal');
    if (modalEl) {
        modalEl.style.display = 'none';
        modalEl.innerHTML = '';
    }
}

window.hideModal = hideModal;

export function confirmModal(message) {
    return new Promise((resolve) => {
        showModal({
            title: 'Confirmação',
            content: `<p>${message}</p>`,
            actions: [
                { id: 'cancel', label: 'Cancelar', type: 'secondary', onClick: () => { hideModal(); resolve(false); } },
                { id: 'confirm', label: 'Confirmar', type: 'primary', onClick: () => { hideModal(); resolve(true); } }
            ]
        });
    });
}
