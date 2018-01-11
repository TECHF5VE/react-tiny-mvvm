import { Component } from 'react';
import { ViewBase } from '../react-tiny-mvvm/ViewBase';
// import _ from 'lodash';

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
