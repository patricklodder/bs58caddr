const { Base58AddressValidator } = require('./src/lowlevel')
const validateCoinAddress = require('./src/highlevel')

module.exports = {
  Base58AddressValidator,
  validateCoinAddress
}
