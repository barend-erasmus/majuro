# Majuro

25+ fully tested and extensible classes helping you with Rapid Application Development(RAD).

![Majuro](https://i1.wp.com/www.theglobalcouple.com/wp-content/uploads/2015/10/majuro-13.jpg)

## Installation

`npm install --save majuro`

## What's inside?

### Cryptography Algorithms

Interface: *ICryptographyAlgorithm*

* `AES256CTRCryptographyAlgorithm`

[Read more](https://github.com/barend-erasmus/majuro/tree/master/src/cryptography-algorithms)

### Enums

* `Frequency`

## Express JS Middleware

* `ExpressJSIPRestrictor`

[Read more](https://github.com/barend-erasmus/majuro/tree/master/src/expressjs-middleware)

### Gateways

* `FixerForeignExchangeGateway`
* `PayFastPaymentGateway`

### Hash Algorithms

Interface: *IHashAlgorithm*

* `DJB2`
* `FNV1A`
* `MD4`
* `MD5`
* `PJW`
* `RS`
* `SDBM`
* `SHA1`
* `SHA256`
* `SHA512`

### Loggers

Interface: *ILogger*

* `LogglyLogger`

### Mail Senders

Interface: *IMailSender*

* `SendGridMailSender`

### Models

* `OperationResult<T>`
* `Payment`
* `SubscriptionCreateResult`
* `Subscription`
* `ValidationMessage`

### Services

* `SubscriptionService`

### Validators

* `SubscriptionValidator`