function onClick(e, action, url) {
    e.preventDefault();
    grecaptcha.ready(function() {
        grecaptcha.execute('6LdcshQpAAAAADpV6sJZP0obhQyZ8StDYGOrCYMN', {action: action}).then(function(token) {
            // Pass the token to a hidden input field or use AJAX to send to server
            fetch('verify_recaptcha.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `token=${token}`
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Redirect to the URL
                    window.location.href = url;
                } else {
                    alert("reCAPTCHA verification failed. Please try again.");
                }
            })
            .catch(error => {
                console.error('Error during reCAPTCHA verification:', error);
            });
        });
    });
}
