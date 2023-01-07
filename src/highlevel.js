const { Base58AddressValidator } = require('./lowlevel')
const coininfo = require('coininfo')

function validateCoinAddress (coin, address) {
  if (typeof coin !== 'string') {
    return false
  }

  const info = coininfo(coin.toUpperCase())
  if (info === null) {
    return false
  }

  const validator = new Base58AddressValidator()
  try {
    validator
      .networkBytes([info.versions.public, info.versions.scripthash])
      .address(address)
      .validate()

    return true
  } catch (err) {
    // do nothing
  }

  return false
}

module.exports = validateCoinAddress
