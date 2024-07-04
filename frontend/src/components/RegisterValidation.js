import { useEffect } from 'react';

function RegisterValidation({ isLogin }) {
    useEffect(() => {
        if (!isLogin) {
            const userform = document.getElementById("username");
            const passform = document.getElementById("password");
            const totalform = document.querySelector(".login-box");

            // Username criteria elements
            const lenInput = document.getElementById("userLen");
            const lettInput = document.getElementById("userLett");
            const numInput = document.getElementById("userNum");
            const hypInput = document.getElementById("userHyp");
            const undInput = document.getElementById("userUnd");

            // Password criteria elements
            const pLenInput = document.getElementById("passLen");
            const pLettInput = document.getElementById("passLett");
            const pNumInput = document.getElementById("passNum");
            const pSpecInput = document.getElementById("passSpec");

            // Username validation
            userform.onfocus = function () {
                document.getElementById("explanationUser").style.display = "block";
                document.getElementById("explanation").style.display = "none";
                totalform.style.minHeight = "675px";
            };
            userform.onblur = function () {
                document.getElementById("explanationUser").style.display = "none";
                totalform.style.minHeight = "360px";
            };
            userform.onkeyup = function () {
                const nums = /[0-9]/g;
                const lett = /[a-zA-Z]/g;
                const hyp = /[-]/g;
                const und = /[_]/g;

                // Check length
                if (userform.value.length >= 3 && userform.value.length <= 18) {
                    lenInput.classList.remove("invalid");
                    lenInput.classList.add("valid");
                } else {
                    lenInput.classList.remove("valid");
                    lenInput.classList.add("invalid");
                }

                // Check letters
                if (userform.value.match(lett)) {
                    lettInput.classList.remove("invalid");
                    lettInput.classList.add("valid");
                } else {
                    lettInput.classList.remove("valid");
                    lettInput.classList.add("invalid");
                }

                // Check numbers
                if (userform.value.match(nums)) {
                    numInput.classList.remove("opt");
                    numInput.classList.add("valid");
                } else {
                    numInput.classList.remove("valid");
                    numInput.classList.add("opt");
                }

                // Check hyphens
                if (userform.value.match(hyp)) {
                    hypInput.classList.remove("opt");
                    hypInput.classList.add("valid");
                } else {
                    hypInput.classList.remove("valid");
                    hypInput.classList.add("opt");
                }

                // Check underscores
                if (userform.value.match(und)) {
                    undInput.classList.remove("opt");
                    undInput.classList.add("valid");
                } else {
                    undInput.classList.remove("valid");
                    undInput.classList.add("opt");
                }
            };

            // Password validation
            passform.onfocus = function () {
                document.getElementById("explanation").style.display = "block";
                document.getElementById("explanationUser").style.display = "none";
                totalform.style.minHeight = "570px";
            };
            passform.onblur = function () {
                document.getElementById("explanation").style.display = "none";
                totalform.style.minHeight = "360px";
            };
            passform.onkeyup = function () {
                const nums = /[0-9]/g;
                const lett = /[a-zA-Z]/g;
                const spec = /[!@#$%^&*]/g;

                // Check length
                if (passform.value.length >= 8 && passform.value.length <= 32) {
                    pLenInput.classList.remove("invalid");
                    pLenInput.classList.add("valid");
                } else {
                    pLenInput.classList.remove("valid");
                    pLenInput.classList.add("invalid");
                }

                // Check numbers
                if (passform.value.match(nums)) {
                    pNumInput.classList.remove("invalid");
                    pNumInput.classList.add("valid");
                } else {
                    pNumInput.classList.remove("valid");
                    pNumInput.classList.add("invalid");
                }

                // Check letters
                if (passform.value.match(lett)) {
                    pLettInput.classList.remove("invalid");
                    pLettInput.classList.add("valid");
                } else {
                    pLettInput.classList.remove("valid");
                    pLettInput.classList.add("invalid");
                }

                // Check special characters
                if (passform.value.match(spec)) {
                    pSpecInput.classList.remove("invalid");
                    pSpecInput.classList.add("valid");
                } else {
                    pSpecInput.classList.remove("valid");
                    pSpecInput.classList.add("invalid");
                }
            };
        }
    }, [isLogin]);

    return null;
}

export default RegisterValidation;
