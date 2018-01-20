import { Component } from 'react';
import { ViewBase } from '../react-tiny-mvvm/ViewBase';
import { ObservableArray } from './ObservableArray';
// import _ from 'lodash';

export const NotifyProperty = ({ isObservableArrayProperty = false }) => {
    // tslint:disable-next-line:no-any
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        const setter = descriptor.set;
        const getter = descriptor.get;

        if (!getter) {
            throw new Error('Decorated property must have a getter.');
        }

        if (setter) {
            // tslint:disable-next-line:no-any
            descriptor.set = function (this: ViewModelBase, value: any) {
                setter.call(this, value);
                this.notifyValueChanged(propertyKey, descriptor.value);

                // tslint:disable-next-line:no-any
                if (isObservableArrayProperty && !(this[propertyKey] as ObservableArray<any>).notifyCallBack) {
                    // tslint:disable-next-line:no-any
                    (this[propertyKey] as ObservableArray<any>).notifyCallBack = (array: any[]) => {
                        this.notifyValueChanged(propertyKey, array);
                    };
                }
            };
        } else {
            throw new Error('Decorated property must have a setter.');
        }
    };
};

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

export function connectVVM(view: ViewBase, viewmodel: ViewModelBase) {
    view.viewmodel = viewmodel;
    viewmodel.view = view;
}
