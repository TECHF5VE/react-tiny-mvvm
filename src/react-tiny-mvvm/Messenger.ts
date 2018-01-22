export interface Token {
    getKeyName(): string;
}

export class DefaultToken implements Token {
    public name = '';

    static create(name: string) {
        const result = new DefaultToken();
        result.name = name;
        return result;
    }

    getKeyName(): string {
        return this.name;
    }
}

export class TokenWithNamespace implements Token {
    public namespace = '';
    public name = '';

    getKeyName(): string {
        return `${this.namespace}_${this.name}`;
    }
}

export class Messenger {
    static readonly Default: Messenger = new Messenger();

    // tslint:disable-next-line:no-any
    private observedMap: Map<string, ((param: any) => void)[]> = new Map();

    // tslint:disable-next-line:no-any
    public register<T extends Token = DefaultToken, M = any>(token: T, callback: (param: M) => void) {
        const keyStr = token.getKeyName();
        const callbackArr = this.observedMap.get(keyStr);
        if (callbackArr) {
            callbackArr.push(callback);
        } else {
            const newArr = [callback];
            this.observedMap.set(keyStr, newArr);
        }
    }

    // tslint:disable-next-line:no-any
    public send<T extends Token = DefaultToken, M = any>(token: T, message: M) {
        const keyStr = token.getKeyName();
        const callbackArr = this.observedMap.get(keyStr);

        if (callbackArr) {
            callbackArr.forEach(callback => {
                callback(message);
            });
        }
    }
}
