export class ObjectPool<T> {

    protected index: number = null;

    protected objects: T[] = null;

    constructor(protected objectCreateMethod: () => T, protected size: number) {
        this.index = 0;

        this.objects = [];
    }

    public get(): T {
        let obj = this.objects[this.index];

        if (!obj) {
            obj = this.objectCreateMethod();

            this.objects.push(obj);
        }

        this.index++;

        if (this.index >= this.size) {
            this.index = 0;
        }

        return obj;
    }
}
