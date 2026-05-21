document.addEventListener('DOMContentLoaded', () => {
    // If logged in, push out to dashboard
    if (MockBackend.getCurrentUser()) {
        window.location.href = 'dashboard.html';
        return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    let isLogin = urlParams.get('mode') !== 'register';

    const authTitle = document.getElementById('auth-title');
    const authDesc = document.getElementById('auth-desc');
    const authForm = document.getElementById('auth-form');
    const authBtnText = document.getElementById('auth-btn').querySelector('span');
    const authSpinner = document.getElementById('auth-spinner');
    const errorBox = document.getElementById('error-box');
    const toggleText = document.getElementById('toggle-text');
    const toggleLink = document.getElementById('toggle-link');

    function updateUI() {
        errorBox.classList.add('hidden');
        if (isLogin) {
            authTitle.textContent = "Welcome Back";
            authDesc.textContent = "Log in to manage your world trips.";
            authBtnText.textContent = "Sign In";
            toggleText.textContent = "Don't have an account?";
            toggleLink.textContent = "Sign Up";
        } else {
            authTitle.textContent = "Join Wanderlust";
            authDesc.textContent = "Create an account to start exploring.";
            authBtnText.textContent = "Create Account";
            toggleText.textContent = "Already have an account?";
            toggleLink.textContent = "Log In";
        }
    }

    toggleLink.addEventListener('click', (e) => {
        e.preventDefault();
        isLogin = !isLogin;
        updateUI();
    });

    authForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        errorBox.classList.add('hidden');
        authSpinner.classList.remove('hidden');

        const user = document.getElementById('username').value.trim();
        const pass = document.getElementById('password').value.trim();

        try {
            if (isLogin) {
                await MockBackend.loginUser(user, pass);
                window.location.href = 'dashboard.html';
            } else {
                await MockBackend.registerUser(user, pass);
                await MockBackend.loginUser(user, pass); // auto login
                window.location.href = 'dashboard.html';
            }
        } catch(err) {
            errorBox.textContent = err.message;
            errorBox.classList.remove('hidden');
        } finally {
            authSpinner.classList.add('hidden');
        }
    });

    updateUI();
});
