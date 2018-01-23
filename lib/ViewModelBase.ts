import { Component } from 'react';
import { ViewBase } from './ViewBase';
import { ObservableArray } from './ObservableArray';
// import _ from 'lodash';

export const NotifyProperty = (param: { isObservableArrayProperty: boolean } = { isObservableArrayProperty: false }) => {
    // tslint:disable-next-line:no-any
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        const setter = descriptor.set;
        const getter = descriptor.get;

        if (!getter) {
            throw new Error('Decorated property must have a getter.');
        } else {
            descriptor.get = function (this: ViewModelBase) {
                // tslint:disable-next-line:no-any
                const result = getter.call(this) as ObservableArray<any>;
                if (param.isObservableArrayProperty && !result.notifyCallBack) {
                    // tslint:disable-next-line:no-any
                    result.notifyCallBack = (array: any[]) => {
                        this.notifyValueChanged(propertyKey, array);
                    };
                }
                return result;
            };
        }

        if (setter) {
            // tslint:disable-next-line:no-any
            descriptor.set = function (this: ViewModelBase, value: any) {
                setter.call(this, value);
                this.notifyValueChanged(propertyKey, descriptor.value);

                if (param.isObservableArrayProperty) {
                    // tslint:disable-next-line:no-any
                    const result = getter.call(this) as ObservableArray<any>;
                    if (!result.notifyCallBack) {
                        // tslint:disable-next-line:no-any
                        result.notifyCallBack = (array: any[]) => {
                            this.notifyValueChanged(propertyKey, array);
                        };
                    }
                }
            };
        } else {
            throw new Error('Decorated property must have a setter.');
        }
    };
};

export function ConnetVVM<VM extends ViewModelBase>(viewmodel: VM) {
    // tslint:disable-next-line:no-any
    return function <T extends { new(...args: any[]): ViewBase }>(target: T) {
        const original = target;

        // tslint:disable-next-line:no-any
        function construct(constructor: T, args: any[]) {
            // tslint:disable-next-line:no-any
            let c: any = function (this: any) {
                return constructor.apply(this, args);
            };
            c.prototype = constructor.prototype;
            return new c();
        }

        // tslint:disable-next-line:no-any
        let f: any = function (...args: any[]) {
            const result = construct(original, args);
            result.viewmodel = viewmodel;
            viewmodel.view = result;
            return result;
        };

        f.prototype = original.prototype;

        return f;
    };
}

export class ViewModelBase {
    public view: Component;
    public noUpdate = false;

    public dirtyObj = {};

    public notifyValueChanged<V>(stateName: string, value: V): void {
        if (this.noUpdate) {
            return;
        } else {
            Object.defineProperty(this.dirtyObj, stateName, {
                value: value,
            });
        }

        this.view.setState({
            ...this.view.state,
            stateName: value,
        });
    }

    public multiValueChanged(callback: () => void): void {
        Object.assign(this.dirtyObj, {});

        this.noUpdate = true;
        callback();
        this.noUpdate = false;

        this.view.setState({
            ...this.view.state,
            ...this.dirtyObj,
        });
    }
}
