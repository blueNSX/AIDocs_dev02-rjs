document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const googleLogin = document.getElementById('googleLogin');
    const facebookLogin = document.getElementById('facebookLogin');

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        console.log('Email Login Attempt:', {email, password});
        alert('Email login not implemented yet.');
    });

    // Google Sign-In Setup
    function handleGoogleSignIn(googleUser) {
        var profile = googleUser.getBasicProfile();
        console.log('ID: ' + profile.getId());
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());
        alert('Google login successful. Profile data logged to console.');
    }

    function onGoogleSignInFailure(error) {
        console.error('Google Sign In failed:', error);
    }

    function googleSignIn() {
        gapi.load('auth2', function() {
            gapi.auth2.init({
                client_id: 'richard.schinner@gmail.com'
            }).then(() => {
                gapi.signin2.render('googleLogin', {
                    'scope': 'profile email',
                    'width': 240,
                    'height': 50,
                    'longtitle': true,
                    'theme': 'dark',
                    'onsuccess': handleGoogleSignIn,
                    'onfailure': onGoogleSignInFailure
                });
            });
        });
    }

    googleSignIn();

    // FB SDK Initialization
    window.fbAsyncInit = function() {
        FB.init({
            appId      : 'richard.schinner@gmail.com',
            cookie     : true,
            xfbml      : true,
            version    : 'v13.0'
        });
        
        FB.Event.subscribe('auth.statusChange', function(response) {
            if (response.status === 'connected') {
                FB.api('/me?fields=name,email', function(response) {
                    console.log('FB User:', response);
                    alert('Facebook login successful. User data logged to console.');
                });
            } else {
                console.log('User is not logged into FB or not connected to this app.');
            }
        });
    };

    // Triggering manual login for Facebook
    facebookLogin.addEventListener('click', function() {
        FB.login(function(response) {
            if (response.authResponse) {
                console.log('Welcome! Fetching your information.... ');
                FB.api('/me', function(response) {
                    console.log('Good to see you, ' + response.name + '.');
                });
            } else {
                console.log('User cancelled login or did not fully authorize.');
            }
        }, {scope: 'email'});
    });
});