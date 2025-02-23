document.addEventListener("DOMContentLoaded", function () {
    document.getElementById('login-form').addEventListener('submit', function (e) {
        e.preventDefault();

        const email = document.getElementById('email');
        const password = document.getElementById('password');
        const emailError = document.getElementById('email-error');
        const passwordError = document.getElementById('password-error');

        let isValid = true;

        // Email validation
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
            emailError.textContent = '⚠ שים לב! לא הזנת כתובת אימייל חוקית.';
            emailError.classList.add('visible');
            isValid = false;
        } else {
            emailError.classList.remove('visible');
        }

        // Password validation
        const passwordValue = password.value;
        const passwordCriteria = [
            {regex: /.{8,}/, message: '⚠ הסיסמה חייבת לכלול לפחות 8 תווים'},
            {regex: /[A-Z]/, message: '⚠ הסיסמה חייבת לכלול לפחות אות גדולה אחת באנגלית'},
            {regex: /[a-z]/, message: '⚠ הסיסמה חייבת לכלול לפחות אות קטנה אחת באנגלית'},
            {regex: /[0-9]/, message: '⚠ הסיסמה חייבת לכלול לפחות מספר אחד'},
            {regex: /[!@#$%^&*(),.?":{}|<>]/, message: '⚠ הסיסמה חייבת לכלול לפחות תו מיוחד (!@#$%^&*...)'}
        ];
        passwordError.textContent = '';
        passwordError.classList.remove('visible');

        for (let criterion of passwordCriteria) {
            if (!criterion.regex.test(passwordValue)) {
                passwordError.textContent = criterion.message;
                passwordError.classList.add('visible');
                isValid = false;
                break;
            }
        }
        if (!isValid) {
            return;
        }

        //If everything is in order - display a message and go to the home page
        alert('🎉 התחברת בהצלחה! מועבר לעמוד הבית...');
        window.location.href = "../Home Page/HomePage.html";
    });
});

