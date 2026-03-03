import { describe, it, expect } from 'vitest'
import { encode, decode } from './index'

// ---------------------------------------------------------------------------
// encode
// ---------------------------------------------------------------------------

describe('encode', () => {
  it('encodes single letters', () => {
    expect(encode('A')).toBe('.-')
    expect(encode('E')).toBe('.')
    expect(encode('T')).toBe('-')
    expect(encode('S')).toBe('...')
    expect(encode('O')).toBe('---')
  })

  it('is case-insensitive', () => {
    expect(encode('sos')).toBe('... --- ...')
    expect(encode('Hello')).toBe('.... . .-.. .-.. ---')
  })

  it('encodes a word', () => {
    expect(encode('SOS')).toBe('... --- ...')
    expect(encode('HELLO')).toBe('.... . .-.. .-.. ---')
  })

  it('encodes multiple words separated by " / "', () => {
    expect(encode('HELLO WORLD')).toBe('.... . .-.. .-.. --- / .-- --- .-. .-.. -..')
    expect(encode('SOS HELP')).toBe('... --- ... / .... . .-.. .--.') 
  })

  it('handles extra whitespace between words', () => {
    expect(encode('HI  THERE')).toBe('.... .. / - .... . .-. .')
    expect(encode('  SOS  ')).toBe('... --- ...')
  })

  it('encodes digits', () => {
    expect(encode('0')).toBe('-----')
    expect(encode('1')).toBe('.----')
    expect(encode('5')).toBe('.....')
    expect(encode('9')).toBe('----.')
    expect(encode('123')).toBe('.---- ..--- ...--')
  })

  it('encodes punctuation', () => {
    expect(encode('.')).toBe('.-.-.-')
    expect(encode(',')).toBe('--..--')
    expect(encode('?')).toBe('..--..')
    expect(encode('!')).toBe('-.-.--')
    expect(encode('@')).toBe('.--.-.')
  })

  it('passes through unknown characters unchanged', () => {
    expect(encode('A#B')).toBe('.- # -...')
  })

  it('returns empty string for empty input', () => {
    expect(encode('')).toBe('')
  })

  it('returns empty string for non-string input', () => {
    // @ts-expect-error testing runtime guard
    expect(encode(null)).toBe('')
    // @ts-expect-error testing runtime guard
    expect(encode(undefined)).toBe('')
    // @ts-expect-error testing runtime guard
    expect(encode(42)).toBe('')
  })
})

// ---------------------------------------------------------------------------
// decode
// ---------------------------------------------------------------------------

describe('decode', () => {
  it('decodes single letter codes', () => {
    expect(decode('.-')).toBe('A')
    expect(decode('.')).toBe('E')
    expect(decode('-')).toBe('T')
    expect(decode('...')).toBe('S')
    expect(decode('---')).toBe('O')
  })

  it('decodes a word', () => {
    expect(decode('... --- ...')).toBe('SOS')
    expect(decode('.... . .-.. .-.. ---')).toBe('HELLO')
  })

  it('decodes multiple words separated by " / "', () => {
    expect(decode('.... . .-.. .-.. --- / .-- --- .-. .-.. -..')).toBe('HELLO WORLD')
  })

  it('decodes digit codes', () => {
    expect(decode('-----')).toBe('0')
    expect(decode('.---- ..--- ...--')).toBe('123')
  })

  it('decodes punctuation codes', () => {
    expect(decode('.-.-.-')).toBe('.')
    expect(decode('--..--')).toBe(',')
    expect(decode('..--..')).toBe('?')
  })

  it('passes through unknown codes unchanged', () => {
    expect(decode('.- ??? -...')).toBe('A???B')
  })

  it('returns empty string for empty input', () => {
    expect(decode('')).toBe('')
  })

  it('returns empty string for non-string input', () => {
    // @ts-expect-error testing runtime guard
    expect(decode(null)).toBe('')
    // @ts-expect-error testing runtime guard
    expect(decode(undefined)).toBe('')
  })
})

// ---------------------------------------------------------------------------
// round-trip
// ---------------------------------------------------------------------------

describe('round-trip encode → decode', () => {
  const cases = [
    'SOS',
    'HELLO',
    'HELLO WORLD',
    'THE QUICK BROWN FOX',
    'MORSE CODE 2025',
    'A B C D E F G H I J K L M N O P Q R S T U V W X Y Z',
    '0 1 2 3 4 5 6 7 8 9',
  ]

  for (const text of cases) {
    it(`"${text}"`, () => {
      expect(decode(encode(text))).toBe(text)
    })
  }
})
