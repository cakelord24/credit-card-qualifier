function showPage(page) {
    const allPages = document.querySelectorAll('.page');
    allPages.forEach(p => {
        p.style.display = 'none';
        p.classList.remove('active');
    });

    const activePage = document.getElementById(page + 'Page');
    activePage.style.display = 'block';
    activePage.classList.add('active');

    const allNavButtons = document.querySelectorAll('.nav-btn');
    allNavButtons.forEach(button => button.classList.remove('active'));
    document.querySelector(`[onclick="showPage('${page}')"]`)?.classList.add('active');

    if (page === 'dashboard') {
        loadDashboardCards();
    } else if (page === 'applications') {
        loadApplications();
    } else if (page === 'profile') {
        loadRewardsCardDropdown();
    }
}

function updateUserInfo() {
    if (!currentUser) return;
    
    document.getElementById('userName').textContent = currentUser.firstName;
    document.getElementById('greetingName').textContent = currentUser.firstName;
    document.getElementById('profileName').textContent = currentUser.firstName + ' ' + currentUser.lastName;
    document.getElementById('profileEmail').textContent = currentUser.email;
    document.getElementById('profileIncome').value = currentUser.annualIncome;
    document.getElementById('profileCreditScore').value = currentUser.creditScore;
    
    document.getElementById('statScore').textContent = currentUser.creditScore;
    document.getElementById('statIncome').textContent = '$' + currentUser.annualIncome.toLocaleString();
    
    const userApplications = db.getUserApplications(currentUser.id);
    document.getElementById('statApps').textContent = userApplications.length;
    document.getElementById('profileApps').textContent = userApplications.length;
}

function loadApplications() {
    if (!currentUser) return;
    
    const applications = db.getUserApplications(currentUser.id);
    const container = document.getElementById('applicationsList');
    
    if (applications.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; padding: 40px; color: #666;">
                <div style="font-size: 48px; margin-bottom: 20px;">📄</div>
                <h3>No Applications Yet</h3>
                <p>You haven't applied yet.</p>
                <button class="btn" onclick="showPage('cards')">Find Cards</button>
            </div>
        `;
        return;
    }
    
    const approvedApps = applications.filter(app => app.status === 'approved');
    const declinedApps = applications.filter(app => app.status === 'declined');
    
    let html = '';
    
    if (approvedApps.length > 0) {
        html += '<div style="margin-bottom: 40px;">';
        html += '<h3 style="color: #28a745; margin-bottom: 20px;">✅ Approved (' + approvedApps.length + ')</h3>';
        html += approvedApps.map(app => {
            const card = db.creditCards.find(c => c.id === app.cardId);
            if (!card) return '';
            
            return `
                <div class="card" style="margin-bottom: 15px; border-left: 5px solid #28a745;">
                    <div class="card-body">
                        <h3 style="margin: 0 0 10px; color: #28a745;">🎉 ${card.name}</h3>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 15px;">
                            <div>
                                <strong>Issuer:</strong><br>
                                ${card.issuer}
                            </div>
                            <div>
                                <strong>Applied:</strong><br>
                                ${new Date(app.date).toLocaleDateString()}
                            </div>
                            <div>
                                <strong>Annual Fee:</strong><br>
                                $${card.annualFee}
                            </div>
                            <div>
                                <strong>Approval Odds:</strong><br>
                                <span style="color: #28a745; font-weight: bold;">${app.approvalOdds}%</span>
                            </div>
                        </div>
                        <div>
                            <strong>Status:</strong>
                            <span style="padding: 4px 12px; background: #d4edda; color: #28a745; border-radius: 20px; margin-left: 10px; font-weight: bold;">
                                APPROVED ✓
                            </span>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
        html += '</div>';
    }
    
    if (declinedApps.length > 0) {
        html += '<div style="margin-bottom: 40px;">';
        html += '<h3 style="color: #dc3545; margin-bottom: 20px;">❌ Declined (' + declinedApps.length + ')</h3>';
        html += declinedApps.map(app => {
            const card = db.creditCards.find(c => c.id === app.cardId);
            if (!card) return '';
            
            return `
                <div class="card" style="margin-bottom: 15px; border-left: 5px solid #dc3545; opacity: 0.8;">
                    <div class="card-body">
                        <h3 style="margin: 0 0 10px; color: #666;">📄 ${card.name}</h3>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 15px;">
                            <div>
                                <strong>Issuer:</strong><br>
                                ${card.issuer}
                            </div>
                            <div>
                                <strong>Applied:</strong><br>
                                ${new Date(app.date).toLocaleDateString()}
                            </div>
                            <div>
                                <strong>Annual Fee:</strong><br>
                                $${card.annualFee}
                            </div>
                            <div>
                                <strong>Approval Odds:</strong><br>
                                <span style="color: #dc3545; font-weight: bold;">${app.approvalOdds}%</span>
                            </div>
                        </div>
                        <div>
                            <strong>Status:</strong>
                            <span style="padding: 4px 12px; background: #f8d7da; color: #dc3545; border-radius: 20px; margin-left: 10px; font-weight: bold;">
                                DECLINED ✗
                            </span>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
        html += '</div>';
    }
    
    container.innerHTML = html;
}

function updateProfile(event) {
    event.preventDefault();
    if (!currentUser) return;
    
    const annualIncome = parseInt(document.getElementById('profileIncome').value);
    const creditScore = parseInt(document.getElementById('profileCreditScore').value);
    
    if (creditScore < 300 || creditScore > 850) {
        showMessage('Credit score 300-850 only', 'error');
        return;
    }
    
    db.updateUser(currentUser.id, { annualIncome, creditScore });
    currentUser.annualIncome = annualIncome;
    currentUser.creditScore = creditScore;
    
    updateUserInfo();
    loadDashboardCards();
    showMessage('Profile updated!', 'success');
}

window.addEventListener('load', () => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        try {
            currentUser = JSON.parse(savedUser);
            showApp();
        } catch (error) {
            console.error('Error loading user:', error);
            showAuth();
        }
    }
    
    window.showPage = showPage;
    window.updateProfile = updateProfile;
});
