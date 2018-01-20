export type NotifyCallBack<U> = (value: Array<U>) => void;

export class ObservableArray<E> {

    private proxiedArray: Array<E> = [];
    private _notifyCallBack?: NotifyCallBack<E>;

    get notifyCallBack(): NotifyCallBack<E> | undefined {
        return this._notifyCallBack;
    }

    set notifyCallBack(value: NotifyCallBack<E> | undefined) {
        this._notifyCallBack = value;
    }

    constructor(
        proxiedArray?: Array<E>
        // tslint:disable-next-line:no-empty
    ) {
        if (proxiedArray) {
            this.proxiedArray = proxiedArray;
        }
    }

    public get length(): number {
        return this.proxiedArray.length;
    }

    public set(key: number, value: E) {
        this.proxiedArray[key] = value;
        if (this.notifyCallBack) {
            this.notifyCallBack(this.proxiedArray);
        }
    }

    public get(key: number, value: E) {
        return this.proxiedArray[key];
    }

    public modifyArray(callback: (array: Array<E>) => Array<E>) {
        this.proxiedArray = callback(this.proxiedArray);

        if (this.notifyCallBack) {
            this.notifyCallBack(this.proxiedArray);
        }
    }

    public get originArray(): Array<E> {
        return this.proxiedArray;
    }
}
