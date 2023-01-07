const tape = require('tape')
const validateCoinAddress = require('../src/highlevel')

tape('Validating a good address against the correct coin', t => {
  t.plan(5)

  t.ok(validateCoinAddress('BTC', '1EGqT3R8KW6PAyMQ85g6kEZrWcVKwyQM58'),
    'must pass for a Bitcoin p2pkh address')

  t.ok(validateCoinAddress('LTC', 'LRfSUV2qtVKY8zttL24rDuA2if32VeqPVj'),
    'must pass for a Litecoin p2pkh address')

  t.ok(validateCoinAddress('DOGE', 'DQKGWuy8JBXk5AmA8qH51rYUoa9B18QLa6'),
    'must pass for a Dogecoin p2pkh address')

  t.ok(validateCoinAddress('DOGE', 'A6x4jjE7Mq7t3XHza2mPBg2GTBbnp6AANh'),
    'must pass for a Dogecoin p2sh address')

  t.ok(validateCoinAddress('BTC-TEST', 'mffXs96pWNWzG1GPdFKCCLacZYoVv6pa7G'),
    'must pass for a Bitcoin testnet p2pkh address')
})

tape('Validating a good address against an incorrect coin', t => {
  t.plan(2)

  t.notOk(validateCoinAddress('LTC', '1EGqT3R8KW6PAyMQ85g6kEZrWcVKwyQM58'),
    'must fail for a Bitcoin p2pkh address validated against Litecoin')

  t.notOk(validateCoinAddress('BTC', 'mffXs96pWNWzG1GPdFKCCLacZYoVv6pa7G'),
    'must fail for a Bitcoin testnet p2pkh address validated against Bitcoin mainnet')
})
