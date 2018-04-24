import * as fs from 'fs';
import * as path from 'path';
import { Stream } from 'stream';

export class ExpressJSVideoHelper {

    constructor(
        protected basePath: string,
        protected chunkSize: number,
    ) {

    }

    public send(fileRelativePath: string, request, response): void {
        const filePath: string = path.join(this.basePath, fileRelativePath);
        const fileStat: any = fs.statSync(filePath);
        const fileSize: number = fileStat.size;

        const range: { end: number, start: number } = this.getRange(request);

        if (range) {
            const end: number = range.end ? range.end : Math.min(range.start + this.chunkSize - 1, fileSize - 1);
            const start: number = range.start;

            const stream: Stream = fs.createReadStream(filePath, {
                end,
                start,
            });

            response.set('Accept-Ranges', 'bytes');
            response.set('Content-Length', end - start + 1);
            response.set('Content-Range', `bytes ${start}-${end}/${fileSize}`);
            response.set('Content-Type', 'video/mp4');

            response.status(206);

            stream.pipe(response);

        } else {
            const stream: Stream = fs.createReadStream(filePath);

            response.set('Content-Length', fileSize);
            response.set('Content-Type', 'video/mp4');

            response.status(200);

            stream.pipe(response);
        }
    }

    protected getRange(request): { end: number, start: number } {
        const range: string = request.get('range');

        if (!range) {
            return null;
        }

        const matches: RegExpExecArray = new RegExp(/bytes=(\d+)-(\d*)/).exec(range);

        return {
            end: parseInt(matches[2], undefined),
            start: parseInt(matches[1], undefined),
        };
    }

}
