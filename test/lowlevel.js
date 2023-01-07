const tape = require('tape')
const { Base58AddressValidator } = require('../src/lowlevel')

tape('Validating a good address without networkBytes specified', t => {
  t.plan(4)

  t.doesNotThrow(() => {
    (new Base58AddressValidator())
      .address('1EGqT3R8KW6PAyMQ85g6kEZrWcVKwyQM58')
      .validate()
  }, 'must pass for a Bitcoin p2pkh address')

  t.doesNotThrow(() => {
    (new Base58AddressValidator())
      .address('LRfSUV2qtVKY8zttL24rDuA2if32VeqPVj')
      .validate()
  }, 'must pass for a Litecoin p2pkh address')

  t.doesNotThrow(() => {
    (new Base58AddressValidator())
      .address('DQKGWuy8JBXk5AmA8qH51rYUoa9B18QLa6')
      .validate()
  }, 'must pass for a Dogecoin p2pkh address')

  t.doesNotThrow(() => {
    (new Base58AddressValidator())
      .address('A6x4jjE7Mq7t3XHza2mPBg2GTBbnp6AANh')
      .validate()
  }, 'must pass for a Dogecoin p2sh address')
})

tape('Validating a good address with correct networkBytes specified', t => {
  t.plan(4)

  t.doesNotThrow(() => {
    (new Base58AddressValidator())
      .networkBytes([0x00, 0x05]).address('1EGqT3R8KW6PAyMQ85g6kEZrWcVKwyQM58')
      .validate()
  }, 'must pass for a Bitcoin p2pkh address')

  t.doesNotThrow(() => {
    (new Base58AddressValidator())
      .networkBytes([0x30, 0x32]).address('LRfSUV2qtVKY8zttL24rDuA2if32VeqPVj')
      .validate()
  }, 'must pass for a Litecoin p2pkh address')

  t.doesNotThrow(() => {
    (new Base58AddressValidator())
      .networkBytes([0x1e, 0x16]).address('DQKGWuy8JBXk5AmA8qH51rYUoa9B18QLa6')
      .validate()
  }, 'must pass for a Dogecoin p2pkh address')

  t.doesNotThrow(() => {
    (new Base58AddressValidator())
      .networkBytes([0x1e, 0x16]).address('A6x4jjE7Mq7t3XHza2mPBg2GTBbnp6AANh')
      .validate()
  }, 'must pass for a Dogecoin p2sh address')
})

tape('Validating a good address with incorrect networkBytes specified', t => {
  t.plan(2)

  t.throws(() => {
    (new Base58AddressValidator())
      .networkBytes([0x30, 0x32]).address('1EGqT3R8KW6PAyMQ85g6kEZrWcVKwyQM58')
      .validate()
  }, 'must throw for a Bitcoin p2pkh address validated against Litecoin networkBytes')

  t.throws(() => {
    (new Base58AddressValidator())
      .addNetworkByte(0x1e).address('A6x4jjE7Mq7t3XHza2mPBg2GTBbnp6AANh')
      .validate()
  }, 'must throw for a p2sh address validated against a p2pkh networkByte')
})

tape('Validating an address with incorrect checksum', t => {
  t.plan(1)

  t.throws(() => {
    (new Base58AddressValidator())
      .address('1EGqT3R8KW6PAyMQ85g6kEZrWcVKwyQM57')
      .validate()
  }, 'must throw')
})

tape('Validating an address with incorrect body', t => {
  t.plan(1)

  t.throws(() => {
    (new Base58AddressValidator())
      .address('1DGqT3R8KW6PAyMQ85g6kEZrWcVKwyQM58')
      .validate()
  }, 'must throw')
})

tape('Validating a random string', t => {
  t.plan(1)

  t.throws(() => {
    (new Base58AddressValidator())
      .address('abc')
      .validate()
  }, 'must throw')
})

tape('Validating a non-string address', t => {
  t.plan(3)

  t.throws(() => {
    (new Base58AddressValidator())
      .address(1)
      .validate()
  }, 'must throw for a number')

  t.throws(() => {
    (new Base58AddressValidator())
      .address()
      .validate()
  }, 'must throw for undefined')

  t.throws(() => {
    (new Base58AddressValidator())
      .address(null)
      .validate()
  }, 'must throw for null')
})

tape('Validating a good address with bad networkBytes', t => {
  t.plan(4)

  t.throws(() => {
    (new Base58AddressValidator())
      .networkBytes(['0x30', 0x32]).address('LRfSUV2qtVKY8zttL24rDuA2if32VeqPVj')
      .validate()
  }, 'must throw for a string-encapsulated networkByte in an array')

  t.throws(() => {
    (new Base58AddressValidator())
      .addNetworkByte('1234').address('LRfSUV2qtVKY8zttL24rDuA2if32VeqPVj')
      .validate()
  }, 'must throw for a string-encapsulated single networkByte')

  t.throws(() => {
    (new Base58AddressValidator())
      .addNetworkByte(256).address('LRfSUV2qtVKY8zttL24rDuA2if32VeqPVj')
      .validate()
  }, 'must throw for a networkByte > 255')

  t.throws(() => {
    (new Base58AddressValidator())
      .addNetworkByte(-1).address('LRfSUV2qtVKY8zttL24rDuA2if32VeqPVj')
      .validate()
  }, 'must throw for a networkByte < 0')
})

tape('Validating without specifying an address', t => {
  t.plan(2)

  t.throws(() => {
    (new Base58AddressValidator())
      .validate()
  }, 'must throw')

  t.throws(() => {
    (new Base58AddressValidator())
      .addNetworkByte(0x32)
      .validate()
  }, 'must throw even when adding a network byte')
})
