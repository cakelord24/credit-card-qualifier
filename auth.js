let currentUser = null;

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

async function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    if (email === 'demo@example.com' && password === 'demo123') {
        currentUser = db.findUser(email) || {
            id: 1,
            email: 'demo@example.com',
            firstName: 'Demo',
            lastName: 'User',
            annualIncome: 75000,
            creditScore: 720
        };
        showApp();
        showMessage('Login successful! Welcome Demo User', 'success');
        return;
    }
    
    const foundUser = db.findUser(email);
    if (foundUser && await db.verifyPassword(password, foundUser.password)) {
        currentUser = foundUser;
        showApp();
        showMessage('Login successful!', 'success');
    } else {
        showMessage('Invalid email or password', 'error');
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
    
    if (db.findUser(email)) {
        document.getElementById('signupEmail').classList.add('error');
        showMessage('User with this email already exists', 'error');
        return;
    }
    
    const userData = {
        email: email,
        password: await db.hashPassword(password),
        firstName: firstName,
        lastName: lastName,
        dateOfBirth: dob,
        annualIncome: parseInt(annualIncome),
        creditScore: parseInt(creditScore)
    };
    
    currentUser = db.createUser(userData);
    showApp();
    showMessage('Account created successfully!', 'success');
}

function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    showAuth();
    showMessage('Logged out successfully', 'info');
}

function showApp() {
    const authScreen = document.getElementById('authScreen');
    const appScreen = document.getElementById('appScreen');
    authScreen.classList.add('hidden');
    appScreen.classList.remove('hidden');
    updateUserInfo();
    showPage('dashboard');
    loadDashboardCards();
    if (currentUser) {
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }
}

function showAuth() {
    document.getElementById('authScreen').classList.remove('hidden');
    document.getElementById('appScreen').classList.add('hidden');
    switchTab('login');
}

window.switchTab = switchTab;
window.handleLogin = handleLogin;
window.handleSignup = handleSignup;
window.logout = logout;
