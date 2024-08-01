function signUp() {
    var username = document.getElementById('username').value.trim();
    var email = document.getElementById('email').value.trim();
    var mobile = document.getElementById('mobile').value.trim();
    var password = document.getElementById('password').value.trim();
    var confirmPassword = document.getElementById('confirmPassword').value.trim();

    //validation for empty field
    if (username === '') {
        document.getElementById('usernameError').innerText = "Username cannot be empty.";
        return false;
    }

    if (email === '') {
        document.getElementById('emailError').innerText = "Email cannot be empty.";
        return false;
    }

    if (mobile === '') {
        document.getElementById('mobileError').innerText = "Mobile number cannot be empty.";
        return false;
    }

    if (password === '') {
        document.getElementById('passwordError').innerText = "Password cannot be empty.";
        return false;
    }

    if (confirmPassword === '') {
        document.getElementById('confirmPasswordError').innerText = "Confirm Password cannot be empty.";
        return false;
    }

    // Password validation
    var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&_]{10,}$/;
    if (!passwordRegex.test(password)) {
        document.getElementById('passwordError').innerText = "Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be 10 or more characters long.";
        return false;
    }

    if (password !== confirmPassword) {
        document.getElementById('confirmPasswordError').innerText = "Passwords do not match.";
        return false;
    }

    alert("Sign up successful!");
    return false; 
}

function openGooglePopup() {
    // Google login
    var googleLoginWindow = window.open("https://www.google.com", "googleLoginWindow", "width=600,height=600");
    
}
