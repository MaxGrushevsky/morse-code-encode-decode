# morse-code-encode-decode

> Encode and decode Morse code (ITU standard). Zero runtime dependencies. TypeScript-first.

[![npm](https://img.shields.io/npm/v/morse-code-encode-decode)](https://www.npmjs.com/package/morse-code-encode-decode)
[![license](https://img.shields.io/npm/l/morse-code-encode-decode)](./LICENSE)

## Features

- Encodes plain text → Morse code and decodes back
- Supports all **26 Latin letters**, **digits 0–9**, and **common punctuation**
- ITU / international standard codes
- Written in **TypeScript** — ships with full type declarations
- **Zero runtime dependencies**
- Works in **Node.js**, **browsers** (via bundler), **Deno**, **Bun**
- **ESM** and **CommonJS** — use `import` or `require()`
- **TypeScript** — types included (`.d.ts` / `.d.cts`)

## Where it works

| Environment | How |
|-------------|-----|
| Node.js (ESM) | `import { encode, decode } from 'morse-code-encode-decode'` |
| Node.js (CommonJS) | `const { encode, decode } = require('morse-code-encode-decode')` |
| Bundlers (Vite, Webpack, Rollup, etc.) | Same as Node ESM; tree-shakeable |
| Browser (no bundler) | Use a CDN that serves ESM (e.g. esm.sh, unpkg with ?module) or bundle in your app |
| Deno | `import { encode, decode } from 'npm:morse-code-encode-decode'` |
| Bun | Same as Node (ESM or require) |

## Install

```bash
npm install morse-code-encode-decode
# or
pnpm add morse-code-encode-decode
# or
yarn add morse-code-encode-decode
```

## Usage

```ts
import { encode, decode } from 'morse-code-encode-decode'

// Encode
encode('SOS')         // '... --- ...'
encode('HELLO')       // '.... . .-.. .-.. ---'
encode('Hello World') // '.... . .-.. .-.. --- / .-- --- .-. .-.. -..'
encode('73')          // '--... ...--'

// Decode
decode('... --- ...')            // 'SOS'
decode('.... . .-.. .-.. ---')   // 'HELLO'
decode('.... . .-.. .-.. --- / .-- --- .-. .-.. -..') // 'HELLO WORLD'
```

CommonJS (require) is also supported:

```js
const { encode, decode } = require('morse-code-encode-decode')
```

## API

### `encode(text: string): string`

Converts a plain-text string to Morse code.

| Detail | Behaviour |
|---|---|
| Case | Input is **case-insensitive** — `'sos'` and `'SOS'` produce the same result |
| Letter separator | Letters within a word are separated by a **single space** |
| Word separator | Words are separated by ` / ` (space-slash-space) |
| Unknown chars | Characters not in the Morse table are **passed through unchanged** |
| Empty / non-string | Returns `''` |

### `decode(morse: string): string`

Converts a Morse code string back to plain text (uppercase).

| Detail | Behaviour |
|---|---|
| Letter separator | Morse letters must be separated by a **single space** |
| Word separator | Morse words must be separated by ` / ` |
| Unknown codes | Unrecognised sequences are **passed through unchanged** |
| Empty / non-string | Returns `''` |

## Supported Characters

| Category | Characters |
|---|---|
| Letters | A–Z (case-insensitive) |
| Digits | 0–9 |
| Punctuation | `. , ? ' ! / ( ) & : ; = + - _ " $ @` |

## Development

```bash
git clone https://github.com/MaxGrushevsky/morse-code-encode-decode.git
cd morse-code-encode-decode
npm install

npm run build       # compile to dist/
npm test            # run tests once
npm run test:watch  # run tests in watch mode
npm run typecheck   # TypeScript type-check only
```

## License

[MIT](./LICENSE)
