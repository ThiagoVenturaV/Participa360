export function renderCard(content, className = '') {
    return `
        <div class="card ${className}">
            ${content}
        </div>
    `;
}

export function renderMetricCard({ icon, label, value, trend, trendText }) {
    const trendIcon = trend === 'up' ? 'trending_up' : trend === 'down' ? 'trending_down' : 'trending_flat';
    return `
        <div class="card metric-card">
            <div class="metric-header">
                <span class="material-symbols-outlined icon">${icon}</span>
                <span class="label">${label}</span>
            </div>
            <div class="metric-body">
                <span class="value">${value}</span>
                ${trend ? `
                    <div class="trend ${trend}">
                        <span class="material-symbols-outlined">${trendIcon}</span>
                        <span class="trend-text">${trendText}</span>
                    </div>
                ` : ''}
            </div>
        </div>
    `;
}

export function renderReportCard({ report }) {
    return `
        <div class="card report-card">
            <div class="report-header">
                <div class="report-title-row">
                    <span class="material-symbols-outlined category-icon">${report.categoryIcon || 'report'}</span>
                    <h3 class="title">${report.title}</h3>
                </div>
                <span class="status-badge status-${report.status.toLowerCase()}">${report.status}</span>
            </div>
            <div class="report-body">
                <p class="address"><span class="material-symbols-outlined">location_on</span> ${report.address}</p>
                ${report.photoUrl ? `<img src="${report.photoUrl}" alt="Foto do relato" class="report-photo">` : ''}
                <div class="progress-container">
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${report.progress || 0}%;"></div>
                    </div>
                    <span class="progress-label">${report.progress || 0}% Concluído</span>
                </div>
            </div>
        </div>
    `;
}

export function renderAlertCard({ alert }) {
    return `
        <div class="card alert-card priority-${alert.priority.toLowerCase()}">
            <div class="alert-header">
                <span class="material-symbols-outlined type-icon">${alert.typeIcon || 'warning'}</span>
                <span class="priority-badge">${alert.priority}</span>
            </div>
            <div class="alert-body">
                <h3 class="title">${alert.title}</h3>
                <p class="description">${alert.description}</p>
                <span class="time"><span class="material-symbols-outlined">schedule</span> ${alert.time}</span>
            </div>
        </div>
    `;
}

export function renderRewardCard({ reward, userPoints }) {
    const canRedeem = userPoints >= reward.pointsCost;
    return `
        <div class="card reward-card ${canRedeem ? 'can-redeem' : 'cannot-redeem'}">
            ${reward.imageUrl ? `<img src="${reward.imageUrl}" alt="${reward.name}" class="reward-image">` : ''}
            <div class="reward-content">
                <h3 class="name">${reward.name}</h3>
                <p class="description">${reward.description}</p>
                <div class="reward-footer">
                    <span class="points-cost"><span class="material-symbols-outlined">star</span> ${reward.pointsCost} pontos</span>
                    <button class="button primary" ${!canRedeem ? 'disabled' : ''}>Resgatar</button>
                </div>
            </div>
        </div>
    `;
}

export function renderProjectCard({ project }) {
    return `
        <div class="card project-card">
            ${project.heroImage ? `<img src="${project.heroImage}" alt="${project.title}" class="hero-image">` : ''}
            <div class="project-content">
                <h3 class="title">${project.title}</h3>
                <p class="location"><span class="material-symbols-outlined">location_on</span> ${project.location}</p>
                <div class="progress-container">
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${project.progress || 0}%;"></div>
                    </div>
                    <span class="progress-label">${project.progress || 0}% Financiado/Concluído</span>
                </div>
            </div>
        </div>
    `;
}
