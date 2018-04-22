# Express JS Middleware

## IP Restrictor

```typescript
import { ExpressJSIPRestrictor } from 'majuro';

app.use(new ExpressJSIPRestrictor()
            .addIPAddress('127.0.0.1')
            .allow() // or deny()
            .build()
        );
```