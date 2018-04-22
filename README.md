# Majuro

## Installation

`npm install majuro --save`

## What's inside?

### Cryptography Algorithms

Interface: *ICryptographyAlgorithm*

* `AES256CTRCryptographyAlgorithm`

[Read more]()

### Enums

* `Frequency`

## Express JS Middleware

* `ExpressJSIPRestrictor`

[Read more]()

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