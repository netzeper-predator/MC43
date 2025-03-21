# MC43 Cipher

MC43 (Message Cipher 43) is a seeded algorithm for encoding and decoding messages using a predefined set of allowed characters. This implementation is written in JavaScript and can be run using Node.js.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Algorithm](#algorithm)
- [Functions](#functions)
  - [encode](#encode)
  - [decode](#decode)
- [License](#license)

## Installation

1. Clone the repository or download the source code.
2. Navigate to the project directory.
3. Ensure you have Node.js installed on your machine.
4. Run the following command to install dependencies (if any):

```sh
npm install
```

## Usage

To run the MC43 cipher, use the following command:

```sh
npm start
```

You will be prompted to choose whether you want to encode or decode a message and then enter the string to process.

## Algorithm

The MC43 cipher uses a seeded value to encode and decode messages. The allowed characters include lowercase letters, uppercase letters, numbers, and a set of special characters. The seed value is set to 43.

### Allowed Characters

- Lowercase letters: `a-z`
- Uppercase letters: `A-Z`
- Numbers: `0-9`
- Special characters: `! # $ % ^ & * ( ) _ - + , .`

### Encoding

1. Initialize the seed value to 43.
2. For each character in the input text:
   - Find the index of the character in the allowed characters array.
   - Calculate the new index using the formula: `(index + previousEncodedIndex) % 76`.
   - Append the character at the new index to the encoded string.
   - Update the previous encoded index to the new index.

### Decoding

1. Initialize the seed value to 43.
2. For each character in the encoded text:
   - Find the index of the character in the allowed characters array.
   - Calculate the original index using the formula: `(encodedIndex - previousEncodedIndex + 76) % 76`.
   - Append the character at the original index to the decoded string.
   - Update the previous encoded index to the encoded index.

## Functions

### encode

Encodes a given plaintext string.

```javascript
function encode(text) {
  let encoded = '';
  let previousEncodedIndex = 43; // Seed value
  for (const char of text) {
    const index = allowedChars.indexOf(char);
    if (index === -1) {
      throw new Error(`Invalid character in plaintext: ${char}`);
    }
    const newIndex = (index + previousEncodedIndex) % 76;
    encoded += allowedChars[newIndex];
    previousEncodedIndex = newIndex;
  }
  return encoded;
}
```

### decode

Decodes a given encoded string.

```javascript
function decode(encodedText) {
  let decoded = '';
  let previousEncodedIndex = 43; // Seed value
  for (const char of encodedText) {
    const encodedIndex = allowedChars.indexOf(char);
    if (encodedIndex === -1) {
      throw new Error(`Invalid character in ciphertext: ${char}`);
    }
    const originalIndex = (encodedIndex - previousEncodedIndex + 76) % 76;
    decoded += allowedChars[originalIndex];
    previousEncodedIndex = encodedIndex;
  }
  return decoded;
}
```

## License

This project is licensed under the MIT License. 