// MC42, Message Cipher 43 Seed Algorithm.
console.log("MC43, Message Cipher 43 Seed Algorithm.");
const allowedChars = [];

// Populate the allowed characters in order: lowercase, uppercase, numbers, specials
// lowercase a-z
for (let i = 0; i < 26; i++) {
  allowedChars.push(String.fromCharCode(97 + i));
}
// uppercase A-Z
for (let i = 0; i < 26; i++) {
  allowedChars.push(String.fromCharCode(65 + i));
}
// numbers 0-9
for (let i = 0; i < 10; i++) {
  allowedChars.push(String.fromCharCode(48 + i));
}
// special characters: ! # $ % ^ & * ( ) _ - + ,
const specials = ['!', '#', '$', '%', '^', '&', '*', '(', ')', '_', '-', '+', ',', '.'];
allowedChars.push(...specials);

function encode(text) {
  let encoded = '';
  let previousEncodedIndex = 42; // Seed value
  for (const char of text) {
    const index = allowedChars.indexOf(char);
    if (index === -1) {
      throw new Error(`Invalid character in plaintext: ${char}`);
    }
    const newIndex = (index + previousEncodedIndex) % 75;
    encoded += allowedChars[newIndex];
    previousEncodedIndex = newIndex;
  }
  return encoded;
}

function decode(encodedText) {
  let decoded = '';
  let previousEncodedIndex = 42; // Seed value
  for (const char of encodedText) {
    const encodedIndex = allowedChars.indexOf(char);
    if (encodedIndex === -1) {
      throw new Error(`Invalid character in ciphertext: ${char}`);
    }
    const originalIndex = (encodedIndex - previousEncodedIndex + 75) % 75;
    decoded += allowedChars[originalIndex];
    previousEncodedIndex = encodedIndex;
  }
  return decoded;
}

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

readline.question('Do you want to encode or decode? (e/d): ', option => {
  if (option !== 'e' && option !== 'd') {
    console.log('Invalid option. Please enter "e" to encode or "d" to decode.');
    readline.close();
    return;
  }

  readline.question('Enter the string: ', inputString => {
    if (option === 'e') {
      console.log('Encoded:', encode(inputString));
    } else {
      console.log('Decoded:', decode(inputString));
    }
    readline.close();
  });
});