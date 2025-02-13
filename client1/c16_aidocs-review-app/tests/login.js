// Google Sign-In Initialization
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const googleBtn = document.getElementById('googleBtn');
    const facebookBtn = document.getElementById('facebookBtn');

    // Google Sign-In Setup
    google.accounts.id.initialize({
        client_id: 'YOUR_GOOGLE_CLIENT_ID_HERE',
        callback: handleGoogleResponse
    });

    googleBtn.addEventListener('click', function() {
        google.accounts.id.prompt();
    });

    function handleGoogleResponse(response) {
        console.log('Google Sign-In Response:', response);
        // Here you would typically send the credential to your backend for further processing
        alert('Google Sign-In successful. Server would typically handle this.');
    }

    // Email/Password Login
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        // Here you would typically send this to a server for authentication
        console.log('Email login attempt:', {email, password});
        // Placeholder for server response handling
        alert('Login attempt with email. In real app, server would handle this.');
    });

    // FB SDK Initialization
    window.fbAsyncInit = function() {
        FB.init({
            appId            : 'YOUR_FACEBOOK_APP_ID',
            autoLogAppEvents : true,
            xfbml            : true,
            version          : 'v13.0'
        });
    };

    // FB Login Button
    facebookBtn.addEventListener('click', function() {
        FB.login(response => {
            if (response.authResponse) {
                console.log('Welcome!  Fetching your information.... ');
                FB.api('/me', {fields: 'name, email'}, function(response) {
                    console.log('Successful login for: ' + response.name);
                    // Here you would send this data to your backend for processing
                    alert('FB Sign-In successful. Server would typically handle this.');
                });
            } else {
                console.log('User cancelled login or did not fully authorize.');
            }
        }, {scope: 'public_profile, email'});
    });
});