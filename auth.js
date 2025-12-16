let currentUser = null;

function getAPIUrl() {
    return window.location.hostname === 'localhost' ? 'http://localhost:3001' : '';
}

function switchTab(tab) {
    const allTabs = document.querySelectorAll('.auth-tab');
    allTabs.forEach(t => t.classList.remove('active'));
    
    const clickedTab = Array.from(allTabs).find(t => {
        return t.getAttribute('onclick').includes("'" + tab + "'");
    });
    
    if (clickedTab) {
        clickedTab.classList.add('active');
    }
    
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    loginForm.classList.remove('active');
    signupForm.classList.remove('active');
    document.getElementById(tab + 'Form').classList.add('active');
}

function showMessage(text, type = 'info') {
    const message = document.createElement('div');
    message.className = `message ${type}`;
    message.textContent = text;
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.style.animation = 'slideIn 0.3s ease-out reverse';
        setTimeout(() => {
            message.remove();
        }, 300);
    }, 3000);
}

function showAuth() {
    document.getElementById('authScreen').classList.add('active');
    document.getElementById('authScreen').classList.remove('hidden');
    document.getElementById('appScreen').classList.add('hidden');
    document.getElementById('appScreen').classList.remove('active');
}

function showApp() {
    document.getElementById('authScreen').classList.remove('active');
    document.getElementById('authScreen').classList.add('hidden');
    document.getElementById('appScreen').classList.remove('hidden');
    document.getElementById('appScreen').classList.add('active');
    updateUserInfo();
}

function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    showAuth();
    showMessage('Logged out successfully', 'success');
}

async function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;
    
    if (!email || !password) {
        showMessage('Please enter email and password', 'error');
        return;
    }
    
    try {
        const response = await fetch(`${getAPIUrl()}/api/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            showMessage(data.error || 'Login failed', 'error');
            return;
        }
        
        currentUser = data;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        
        document.getElementById('loginEmail').value = '';
        document.getElementById('loginPassword').value = '';
        
        showMessage('Login successful!', 'success');
        setTimeout(() => showApp(), 500);
    } catch (error) {
        console.error('Login error:', error);
        showMessage('Login failed: ' + error.message, 'error');
    }
}

async function handleSignup(event) {
    event.preventDefault();
    
    const email = document.getElementById('signupEmail').value.trim();
    const password = document.getElementById('signupPassword').value;
    const firstName = document.getElementById('signupFirstName').value.trim();
    const lastName = document.getElementById('signupLastName').value.trim();
    const dob = document.getElementById('signupDOB').value;
    const annualIncome = document.getElementById('signupIncome').value;
    const creditScore = document.getElementById('signupCreditScore').value;
    
    document.querySelectorAll('.form-input-signup').forEach(field => {
        field.classList.remove('error');
    });
    
    const emptyFields = [];
    
    if (!firstName) emptyFields.push('signupFirstName');
    if (!lastName) emptyFields.push('signupLastName');
    if (!email) emptyFields.push('signupEmail');
    if (!dob) emptyFields.push('signupDOB');
    if (!password) emptyFields.push('signupPassword');
    if (!annualIncome) emptyFields.push('signupIncome');
    if (!creditScore) emptyFields.push('signupCreditScore');
    
    if (emptyFields.length > 0) {
        emptyFields.forEach(fieldId => {
            document.getElementById(fieldId).classList.add('error');
        });
        showMessage('Please fill out all required fields marked in red', 'error');
        return;
    }
    
    if (password.length < 6) {
        document.getElementById('signupPassword').classList.add('error');
        showMessage('Password must be at least 6 characters', 'error');
        return;
    }
    
    const birthDate = new Date(dob + 'T00:00:00');
    
    if (isNaN(birthDate.getTime())) {
        document.getElementById('signupDOB').classList.add('error');
        showMessage('Please enter a valid date', 'error');
        return;
    }
    
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    
    if (age < 18) {
        document.getElementById('signupDOB').classList.add('error');
        showMessage('You must be at least 18 years old to sign up', 'error');
        return;
    }
    
    try {
        const response = await fetch(`${getAPIUrl()}/api/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email,
                password,
                firstName,
                lastName,
                dateOfBirth: dob,
                annualIncome: parseInt(annualIncome),
                creditScore: parseInt(creditScore)
            })
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            document.getElementById('signupEmail').classList.add('error');
            showMessage(data.error || 'Signup failed', 'error');
            return;
        }
        
        currentUser = data;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        
        document.getElementById('signupFirstName').value = '';
        document.getElementById('signupLastName').value = '';
        document.getElementById('signupEmail').value = '';
        document.getElementById('signupDOB').value = '';
        document.getElementById('signupPassword').value = '';
        document.getElementById('signupIncome').value = '';
        document.getElementById('signupCreditScore').value = '';
        
        showMessage('Account created successfully!', 'success');
        setTimeout(() => showApp(), 500);
    } catch (error) {
        console.error('Signup error:', error);
        showMessage('Signup failed: ' + error.message, 'error');
    }
}

function updateUserInfo() {
    if (!currentUser) return;
    
    document.getElementById('userName').textContent = currentUser.firstName || 'User';
    document.getElementById('greetingName').textContent = currentUser.firstName || 'User';
    document.getElementById('profileName').textContent = `${currentUser.firstName} ${currentUser.lastName}`;
    document.getElementById('profileEmail').textContent = currentUser.email;
    document.getElementById('statScore').textContent = currentUser.creditScore;
    document.getElementById('statIncome').textContent = `$${currentUser.annualIncome.toLocaleString()}`;
    document.getElementById('profileIncome').value = currentUser.annualIncome;
    document.getElementById('profileCreditScore').value = currentUser.creditScore;
}

async function updateProfile(event) {
    event.preventDefault();
    
    const newIncome = parseInt(document.getElementById('profileIncome').value);
    const newCreditScore = parseInt(document.getElementById('profileCreditScore').value);
    
    if (!newIncome || !newCreditScore) {
        showMessage('Please fill in all fields', 'error');
        return;
    }
    
    try {
        const response = await fetch(`${getAPIUrl()}/api/profile/update`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId: currentUser.id,
                annualIncome: newIncome,
                creditScore: newCreditScore
            })
        });
        
        const data = await response.json();
        
        if (response.ok && data.success) {
            currentUser.annualIncome = newIncome;
            currentUser.creditScore = newCreditScore;
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            updateUserInfo();
            showMessage('Profile updated successfully!', 'success');
        } else {
            showMessage('Failed to update profile', 'error');
        }
    } catch (error) {
        console.error('Profile update error:', error);
        showMessage('Profile update failed: ' + error.message, 'error');
    }
}

window.addEventListener('load', () => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        try {
            currentUser = JSON.parse(savedUser);
            showApp();
        } catch (e) {
            console.error('Error loading user:', e);
            showAuth();
        }
    }
    
    window.showPage = showPage;
    window.updateProfile = updateProfile;
    window.switchTab = switchTab;
    window.handleLogin = handleLogin;
    window.handleSignup = handleSignup;
    window.logout = logout;
});
