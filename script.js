

function validateSingleField(fieldId) {
    
    let isValid = true;
    let errorMsg = "";
    
    switch(fieldId) {
        case "fullname":
            let name = document.getElementById("fullname").value.trim();
            if (name.length === 0) {
                errorMsg = "Full name cannot be empty.";
                isValid = false;
            } else if (name.length < 2) {
                errorMsg = "Full name must be at least 2 characters.";
                isValid = false;
            }
            document.getElementById("fullnameError").innerHTML = errorMsg;
            break;
        case "birthdate":
            let birthVal = document.getElementById("birthdate").value;
            if (!birthVal) {
                errorMsg = "Birthdate is required.";
                isValid = false;
            } else {
                let today = new Date();
                let birthDate = new Date(birthVal);
                let age = today.getFullYear() - birthDate.getFullYear();
                let monthDiff = today.getMonth() - birthDate.getMonth();
                if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                    age--;
                }
                if (age < 13) {
                    errorMsg = "You must be at least 13 years old.";
                    isValid = false;
                }
            }
            document.getElementById("birthdateError").innerHTML = errorMsg;
            break;
        case "email":
            let email = document.getElementById("email").value.trim();
            if (email.length === 0) {
                errorMsg = "Email address is required.";
                isValid = false;
            } else if (!email.includes("@") || email.indexOf(".") < email.indexOf("@") + 2) {
                errorMsg = "Email must contain '@' and a dot after it (e.g., name@domain.com).";
                isValid = false;
            }
            document.getElementById("emailError").innerHTML = errorMsg;
            break;
        case "username":
            let username = document.getElementById("username").value.trim();
            if (username.length === 0) {
                errorMsg = "Username is required.";
                isValid = false;
            } else if (username.length < 8 || username.length > 20) {
                errorMsg = "Username must be 8–20 characters long.";
                isValid = false;
            } else {
                let lettersDigits = /^[a-zA-Z0-9]+$/;
                if (!lettersDigits.test(username)) {
                    errorMsg = "Username may only contain letters and digits (no spaces or symbols).";
                    isValid = false;
                }
            }
            document.getElementById("usernameError").innerHTML = errorMsg;
            break;
        case "password":
            let pwd = document.getElementById("password").value;
            if (pwd.length === 0) {
                errorMsg = "Password is required.";
                isValid = false;
            } else if (pwd.length < 10) {
                errorMsg = "Password must be at least 10 characters.";
                isValid = false;
            } else {
                let hasUpper = /[A-Z]/.test(pwd);
                let hasLower = /[a-z]/.test(pwd);
                let hasDigit = /[0-9]/.test(pwd);
                if (!hasUpper || !hasLower || !hasDigit) {
                    errorMsg = "Password must include at least one uppercase letter, one lowercase letter, and one digit.";
                    isValid = false;
                }
            }
            document.getElementById("passwordError").innerHTML = errorMsg;
            
            let confirmPwd = document.getElementById("confirmPassword").value;
            if (confirmPwd !== "") {
                validateSingleField("confirmPassword");
            }
            break;
        case "confirmPassword":
            let pwdField = document.getElementById("password").value;
            let confirmField = document.getElementById("confirmPassword").value;
            if (confirmField !== pwdField) {
                errorMsg = "Passwords do not match.";
                isValid = false;
            }
            document.getElementById("confirmError").innerHTML = errorMsg;
            break;
        default: break;
    }
    return isValid;
}


function validateSex() {
    let sexRadios = document.getElementsByName("sex");
    let selected = false;
    for (let i = 0; i < sexRadios.length; i++) {
        if (sexRadios[i].checked) {
            selected = true;
            break;
        }
    }
    if (!selected) {
        document.getElementById("sexError").innerHTML = "Please select your sex.";
    } else {
        document.getElementById("sexError").innerHTML = "";
    }
}


function validateForm() {
  
    let errorSpans = [
        "fullnameError", "birthdateError", "sexError", "emailError",
        "usernameError", "passwordError", "confirmError",
        "stanceError", "actionsError", "effectivenessError"
    ];
    for (let i = 0; i < errorSpans.length; i++) {
        document.getElementById(errorSpans[i]).innerHTML = "";
    }
    let successSpan = document.getElementById("successMessage");
    successSpan.style.display = "none";
    successSpan.innerHTML = "";

    let isValid = true;

    let fullname = document.getElementById("fullname").value.trim();
    if (fullname.length === 0) {
        document.getElementById("fullnameError").innerHTML = "Full name cannot be empty.";
        isValid = false;
    } else if (fullname.length < 2) {
        document.getElementById("fullnameError").innerHTML = "Full name must be at least 2 characters.";
        isValid = false;
    }

    // Birthdate and age (must be 13+)
    let birthdate = document.getElementById("birthdate").value;
    if (!birthdate) {
        document.getElementById("birthdateError").innerHTML = "Birthdate is required.";
        isValid = false;
    } else {
        let today = new Date();
        let birthDate = new Date(birthdate);
        let age = today.getFullYear() - birthDate.getFullYear();
        let monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        if (age < 13) {
            document.getElementById("birthdateError").innerHTML = "You must be at least 13 years old.";
            isValid = false;
        }
    }

    // Sex (radio group) - loop using getElementsByName
    let sexRadios = document.getElementsByName("sex");
    let sexSelected = false;
    for (let i = 0; i < sexRadios.length; i++) {
        if (sexRadios[i].checked) {
            sexSelected = true;
            break;
        }
    }
    if (!sexSelected) {
        document.getElementById("sexError").innerHTML = "Please select your sex.";
        isValid = false;
    }

    // Email
    let email = document.getElementById("email").value.trim();
    if (email.length === 0) {
        document.getElementById("emailError").innerHTML = "Email address is required.";
        isValid = false;
    } else if (!email.includes("@") || email.indexOf(".") < email.indexOf("@") + 2) {
        document.getElementById("emailError").innerHTML = "Email must contain '@' and a dot after it (e.g., name@domain.com).";
        isValid = false;
    }

    // ========== ACCOUNT DETAILS ==========
    // Username
    let username = document.getElementById("username").value.trim();
    if (username.length === 0) {
        document.getElementById("usernameError").innerHTML = "Username is required.";
        isValid = false;
    } else if (username.length < 8 || username.length > 20) {
        document.getElementById("usernameError").innerHTML = "Username must be 8–20 characters long.";
        isValid = false;
    } else {
        let lettersDigitsOnly = /^[a-zA-Z0-9]+$/;
        if (!lettersDigitsOnly.test(username)) {
            document.getElementById("usernameError").innerHTML = "Username may only contain letters and digits (no spaces or symbols).";
            isValid = false;
        }
    }

    // Password
    let password = document.getElementById("password").value;
    if (password.length === 0) {
        document.getElementById("passwordError").innerHTML = "Password is required.";
        isValid = false;
    } else if (password.length < 10) {
        document.getElementById("passwordError").innerHTML = "Password must be at least 10 characters.";
        isValid = false;
    } else {
        let hasUpper = /[A-Z]/.test(password);
        let hasLower = /[a-z]/.test(password);
        let hasDigit = /[0-9]/.test(password);
        if (!hasUpper || !hasLower || !hasDigit) {
            document.getElementById("passwordError").innerHTML = "Password must include at least one uppercase letter, one lowercase letter, and one digit.";
            isValid = false;
        }
    }

    // Confirm password
    let confirmPwd = document.getElementById("confirmPassword").value;
    if (confirmPwd !== password) {
        document.getElementById("confirmError").innerHTML = "Passwords do not match.";
        isValid = false;
    }

    // ========== TOPIC QUESTIONS ==========
    // Dropdown (select) - blank default check
    let stance = document.getElementById("stance").value;
    if (stance === "") {
        document.getElementById("stanceError").innerHTML = "Please select your stance on juvenile justice reform.";
        isValid = false;
    }

    // Checkbox group (same name = "actions") - loop using getElementsByName
    let actionBoxes = document.getElementsByName("actions");
    let atLeastOneChecked = false;
    for (let i = 0; i < actionBoxes.length; i++) {
        if (actionBoxes[i].checked) {
            atLeastOneChecked = true;
            break;
        }
    }
    if (!atLeastOneChecked) {
        document.getElementById("actionsError").innerHTML = "Please select at least one action you support.";
        isValid = false;
    }

    // Third question: effectiveness (radio group)
    let effectivenessRadios = document.getElementsByName("effectiveness");
    let effectivenessSelected = false;
    for (let i = 0; i < effectivenessRadios.length; i++) {
        if (effectivenessRadios[i].checked) {
            effectivenessSelected = true;
            break;
        }
    }
    if (!effectivenessSelected) {
        document.getElementById("effectivenessError").innerHTML = "Please select whether you think the current system is effective.";
        isValid = false;
    }

    // ========== DISPLAY SUCCESS MESSAGE IF VALID ==========
    if (isValid) {
        successSpan.style.display = "block";
        successSpan.innerHTML = "Thank you for joining! You will receive updates on juvenile justice reform.";
        
    }

    return isValid; 
}