const alphabet = 'abcdefghijklmnopqrstuvwxyz0123456789.,;:!? ';

function toBinary(key) {
    return key.split('').map(char => char.charCodeAt(0).toString(2)).join('');
}
 
function encrypt(message, key) {
    const binaryKey = toBinary(key);
    let encryptedMessage = '';

    for (let i = 0; i < message.length; i++) {
        const charIndex = alphabet.indexOf(message[i]); 
        const keyMultiplier = parseInt(binaryKey[i % binaryKey.length], 2);
        const encryptedCharIndex = charIndex * keyMultiplier; 
        encryptedMessage += encryptedCharIndex + ';'; 
    }

    return encryptedMessage; 
}

function decrypt(encryptedMessage, key) {
    const binaryKey = toBinary(key);
    const encryptedChars = encryptedMessage.split(';').filter(Boolean); 
    let decryptedMessage = '';

    for (let i = 0; i < encryptedChars.length; i++) {
        const charIndex = parseInt(encryptedChars[i]); 
        const keyMultiplier = parseInt(binaryKey[i % binaryKey.length], 2); 
        const originalIndex = charIndex / keyMultiplier; 
        decryptedMessage += alphabet[Math.round(originalIndex)]; 
    }

    return decryptedMessage; 
}

document.getElementById('process').addEventListener('click', () => {
    const message = document.getElementById('message').value; 
    const key = document.getElementById('key').value; 
    const mode = document.getElementById('mode').value; 

    let result;
    if (mode === 'encrypt') {
        result = encrypt(message, key); 
    } else {
        result = decrypt(message, key); 
    }

    document.getElementById('result').innerText = result; 
});
