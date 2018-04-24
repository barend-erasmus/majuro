# Express JS Helpers

## VideoHelper

```typescript
import { ExpressJSVideoHelper } from 'majuro';

app.route('/big_buck_bunny.mp4')
    .get((request: express.Request, response: express.Response) => {
        const expressJSVideoHelper: ExpressJSVideoHelper = new ExpressJSVideoHelper(
            path.join(__dirname, '..', 'assets'),
            1800000,
        );

        expressJSVideoHelper.send('big_buck_bunny.mp4', request, response);
    });
```