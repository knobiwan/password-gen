const passwordLengthEl = document.getElementById('password-length')
    , passwordLengthTextEl = document.getElementById('password-length-text')
    , lettersUpperEl = document.getElementById('letters-upper')
    , lettersLowerEl = document.getElementById('letters-lower')
    , numberEl = document.getElementById('numbers')
    , symbolsEl = document.getElementById('symbols')
    , passwordResultEl = document.getElementById('password-result')
    , copyClipBoardButtonEl = document.getElementById('copy-to-clipboard');

const lettersUpper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    , lettersLower = 'abcdefghijklmnopqrstuvwxyz'
    , numbers = '0123456789'
    , symbols = '[!@#$%^&*()_+-={};:|,.<>?~]';

let password = "";

function generatePassword() {
    resetPassword();
    
    if (!lettersUpperEl.checked && !lettersLowerEl.checked && !numberEl.checked && !symbolsEl.checked) {
        return;
    }

    const pattern = getPattern();
    for (let i = 0, n = pattern.length; i < passwordLengthEl.value; i++) {
        let passwordChar = pattern[Math.floor(Math.random() * n)];
        generateSpan(passwordChar);
        password += passwordChar;
    }
}

function resetPassword() {
    password = "";
    copyClipBoardButtonEl.innerHTML = 'Copy to Clipboard';
    while (passwordResultEl.firstChild) {
        passwordResultEl.removeChild(passwordResultEl.firstChild);
    }
}

function getPattern() {
    let pattern = '';
    if (lettersUpperEl.checked)
        pattern += lettersUpper;
    if (numberEl.checked)
        pattern += numbers.repeat(3);
    if (lettersLowerEl.checked)
        pattern += lettersLower;
    if (symbolsEl.checked)
        pattern += symbols;
    
    return pattern;
}

function generateSpan(passwordChar) {
    var span = document.createElement("span");
    let colorClass = lettersUpper.concat(lettersLower).includes(passwordChar) ? "letter" : numbers.includes(passwordChar) ? "number" : "symbol";
    span.classList.add(colorClass);
    span.appendChild(document.createTextNode(passwordChar));
    passwordResultEl.appendChild(span);
}

function copyPasswordToClipboard() {
  navigator.clipboard.writeText(password);
  copyClipBoardButtonEl.innerHTML = 'Copied!';
  setTimeout(() => { copyClipBoardButtonEl.innerHTML = 'Copy to Clipboard' }, 2000);
}

function setPasswordLengthText() {
    passwordLengthTextEl.textContent = passwordLengthEl.value;
}