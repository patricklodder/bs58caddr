bs58c-address
--------------

A library to verify base58-check addresses for errors.

### Features

- Verify an address for typos by calculating the checksum
- Check that the correct network / address type byte is set.
- Expose high level API to simply check against all coins maintained by `coininfo`
- Exposes low level API to check against any (set of) network byte(s) (or none)
- Support for both websites and node.js

### Installation and usage (web)

Copy the file `bs58caddr.bundle.min.js` to your website project, and:


```html
<html>
  <head>
    <script src="bs58caddr.bundle.min.js"></script>
  </head>
  <body>
    <div id="output"></div>
    <button id="clickme">clickme</button>
    <script>
      const btn = document.querySelector('#clickme')
      const out = document.querySelector('#output')

      btn.addEventListener('click', (e) => {
        e.preventDefault()
        const result = bs58caddr.validateCoinAddress('BTC', '1EGqT3R8KW6PAyMQ85g6kEZrWcVKwyQM58')
        const text = '1EGqT3R8KW6PAyMQ85g6kEZrWcVKwyQM58 is a ' + (result ? 'valid' : 'invalid') + ' bitcoin address<br>'
        out.innerHTML = text
      })
    </script>
  </body>
</html>
```

### Installation and usage (node.js)

Install the libarary with:

```bash
npm i --save bs58caddr
```

High-level:

```js
const { validateCoinAddress } = require('bs58caddr')

const result = validateCoinAddress('BTC', '1EGqT3R8KW6PAyMQ85g6kEZrWcVKwyQM58')
console.log('This is a ' + (result ? 'valid' : 'invalid') + ' bitcoin address')
```

Low-level:

```js
const { Base58AddressValidator } = require('bs58caddr')

try {
  (new Base58AddressValidator())
    .networkBytes([0x00, 0x05]).address('1EGqT3R8KW6PAyMQ85g6kEZrWcVKwyQM58')
    .validate()
  console.log('This is a valid Bitcoin address')
} catch (err) {
  console.log('This address is not valid: ' err.message)
}
```

### Could you please add my coin?

This library does not maintain any coin parametrization. You can either use the
low-level API, or file a pull request against the `coininfo` library, at
https://github.com/cryptocoinjs/coininfo.

### Acknowledgements

This library is not rocket science. Most of the actual work has been done by
Daniel Cousins, Jonathan Underwood and other contributors in:

- https://github.com/bitcoinjs/bs58check
- https://github.com/cryptocoinjs/coininfo
- https://github.com/cryptocoinjs/bs58

Please show them your love.

### License

MIT - see [LICENSE](./LICENSE)
