import * as React from 'react';

export class ViewBase<VM = {}, P = {}, S = {}> extends React.Component<P, S> {
    public viewmodel: VM;
}
