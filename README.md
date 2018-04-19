# Majuro

## Installation

`npm install majuro --save`

## What's inside?

### Cryptography Algorithms

Interface: *ICryptographyAlgorithm*

* `AES256CTRCryptographyAlgorithm`

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

### Mail Senders

Interface: *IMailSender*

* `SendGridMailSender`

### Models

* `OperationResult<T>`
* `ValidationMessage`