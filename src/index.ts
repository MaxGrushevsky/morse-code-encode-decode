/**
 * Morse code lookup table (ITU standard).
 * Maps characters to their Morse code representations.
 * Space character maps to '/' (word separator).
 */
const MORSE_CODE: Record<string, string> = {
  A: '.-', B: '-...', C: '-.-.', D: '-..', E: '.', F: '..-.',
  G: '--.', H: '....', I: '..', J: '.---', K: '-.-', L: '.-..',
  M: '--', N: '-.', O: '---', P: '.--.', Q: '--.-', R: '.-.',
  S: '...', T: '-', U: '..-', V: '...-', W: '.--', X: '-..-',
  Y: '-.--', Z: '--..',
  '0': '-----', '1': '.----', '2': '..---', '3': '...--', '4': '....-',
  '5': '.....', '6': '-....', '7': '--...', '8': '---..', '9': '----.',
  '.': '.-.-.-', ',': '--..--', '?': '..--..', "'": '.----.', '!': '-.-.--',
  '/': '-..-.', '(': '-.--.', ')': '-.--.-', '&': '.-...', ':': '---...',
  ';': '-.-.-.', '=': '-...-', '+': '.-.-.', '-': '-....-', '_': '..--.-',
  '"': '.-..-.', '$': '...-..-', '@': '.--.-.', ' ': '/',
}

const REVERSE_MORSE: Record<string, string> = {}
for (const [char, code] of Object.entries(MORSE_CODE)) {
  REVERSE_MORSE[code] = char
}

/**
 * Encodes a plain-text string into Morse code.
 *
 * - Letters are separated by a single space.
 * - Words are separated by ` / `.
 * - Input is case-insensitive; unknown characters are passed through unchanged.
 * - Returns an empty string for empty or non-string input.
 *
 * @param text - The text to encode.
 * @returns Morse code string.
 *
 * @example
 * encode('SOS')    // '... --- ...'
 * encode('HELLO WORLD')  // '.... . .-.. .-.. --- / .-- --- .-. .-.. -..'
 */
export function encode(text: string): string {
  if (!text || typeof text !== 'string') return ''
  const words = text.toUpperCase().split(/\s+/).filter((w) => w.length > 0)
  return words
    .map((word) =>
      word
        .split('')
        .map((char) => (MORSE_CODE[char] !== undefined ? MORSE_CODE[char] : char))
        .join(' ')
    )
    .join(' / ')
}

/**
 * Decodes a Morse code string back to plain text.
 *
 * - Morse letters must be separated by a single space.
 * - Morse words must be separated by ` / `.
 * - Unknown codes are passed through unchanged.
 * - Returns an empty string for empty or non-string input.
 *
 * @param morse - The Morse code string to decode.
 * @returns Decoded plain-text string (uppercase).
 *
 * @example
 * decode('... --- ...')           // 'SOS'
 * decode('.... . .-.. .-.. ---') // 'HELLO'
 */
export function decode(morse: string): string {
  if (!morse || typeof morse !== 'string') return ''
  return morse
    .split(' / ')
    .map((word) =>
      word
        .split(' ')
        .map((code) => {
          if (code === '' || code === '/') return ' '
          return REVERSE_MORSE[code] !== undefined ? REVERSE_MORSE[code] : code
        })
        .join('')
    )
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim()
}
