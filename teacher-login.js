document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const teacherId = document.getElementById('teacherId').value;
        const password = document.getElementById('password').value;

        // Here you would typically make an API call to your backend
        // For now, we'll just do basic validation
        if (validateInput(teacherId, password)) {
            // Simulate login process
            attemptLogin(teacherId, password);
        }
    });

    function validateInput(teacherId, password) {
        if (!teacherId || !password) {
            alert('Please fill in all fields');
            return false;
        }
        
        if (teacherId.length < 5) {
            alert('Teacher ID must be at least 5 characters long');
            return false;
        }
        
        if (password.length < 6) {
            alert('Password must be at least 6 characters long');
            return false;
        }
        
        return true;
    }

    function attemptLogin(teacherId, password) {
        // This is where you would normally make an API call to your backend
        // For demonstration, we'll just show a success message
        // Replace this with actual authentication logic
        
        // Simulating API call delay
        showLoadingState();
        
        setTimeout(() => {
            hideLoadingState();
            // For demonstration purposes, redirect to index page
            window.location.href = 'index.html';
        }, 1500);
    }

    function showLoadingState() {
        const submitBtn = loginForm.querySelector('.submit-btn');
        submitBtn.textContent = 'Logging in...';
        submitBtn.disabled = true;
    }

    function hideLoadingState() {
        const submitBtn = loginForm.querySelector('.submit-btn');
        submitBtn.textContent = 'Login';
        submitBtn.disabled = false;
    }
});
