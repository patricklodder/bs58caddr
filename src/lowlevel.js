const bs58check = require('bs58check')

class Base58AddressValidator {

  constructor() {
    this.m_address = ''
    this.m_networkBytes = ''
  }

  address (addr) {
    const argtype = typeof addr
    if (argtype !== 'string') {
      throw new Error('Expected string argument, got ' + argtype)
    }

    this.m_address = addr
    return this
  }

  addNetworkByte (networkByte) {
    const argtype = typeof networkByte
    if (argtype !== 'number') {
      throw new Error('Expected numerical argument, got ' + argtype)
    }

    if (networkByte > 0xff || networkByte < 0) {
      throw new Error('Maximum network byte size is ' + 0xff)
    }

    this.m_networkBytes.push(networkByte)
    return this
  }

  networkBytes (arr) {
    if (!Array.isArray(arr)) {
      throw new Error('Expected array argument, got ' + (typeof arr))
    }

    this.m_networkBytes = []
    arr.forEach(nwb => this.addNetworkByte(nwb))
    return this
  }

  validate () {
    if (this.m_address === '') {
      throw new Error('No address specified')
    }

    const buffer = bs58check.decode(this.m_address)

    if (this.m_networkBytes.length > 0) {
      const networkByte = buffer.readUInt8(0)
      if (this.m_networkBytes.indexOf(networkByte) === -1) {
        throw new Error('Unexpected network byte: ' + networkByte)
      }
    }
  }
}

module.exports = { Base58AddressValidator }
