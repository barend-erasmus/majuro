# Cryptography Algorithms

## AES 256 CTR Cryptography Algorithm

```typescript
import { AES256CTRCryptographyAlgorithm, ICryptographyAlgorithm } from 'majuro';

const cryptographyAlgorithm: ICryptographyAlgorithm = new AES256CTRCryptographyAlgorithm('password');

const encryptedText: string = cryptographyAlgorithm.encrypt('hello world');

const decryptedText: string = cryptographyAlgorithm.decrypt(encryptedText);
```