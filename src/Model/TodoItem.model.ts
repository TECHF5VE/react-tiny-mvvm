export default class TodoItem {
    private _time = '2018-01-07';
    private _detail = 'todo something';

    public get time(): string {
        return this._time;
    }

    public set time(v: string) {
        this._time = v;
    }

    public get detail(): string {
        return this._detail;
    }

    public set detail(v: string) {
        this._detail = v;
    }
}
