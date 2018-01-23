# React Tiny Mvvm
## Introduce

`React Tiny Mvvm` is a light mvvm framework for React/React-Native.

`React Tine Mvvm` has future s as follow:

- `Message` is used to connect different components. You can simply use  `send`/`register` pattern to complete the communication between two components.
- Peal the bussiness logic off the `View` (in tranditional react) and provide  `View`/`ViewModel` for developing in Mvvm pattern.
- **Observable** Object and Array.
- Unify the usage for Sync / Async operation.
- So on...

## Usage

- For npm: `npm install react-tiny-mvvm --save`
- For yarn: `yarn add react-tiny`

### Create a ViewModel with Observable Properties

```typescript
// MyViewModel.viewmodel.ts

import { ViewModelBase, NotifyProperty } from 'react-tiny-mvvm';

export class MyViewModel extends ViewModel {
  constructor() {
    super()
  }
  
  // Observable Property
  private _propName: any = ...
  @NotifyProperty()
  get propName(): any { return this._propName; }
  set propName(value: any) { this._propName = value; }
  
  // Event handler
  onClick() {
    this.propName = ...;
  }
}
```

### Connect ViewModel to View:

```typescript
// MyView.view.ts
import * as React from 'react';
import { ViewBase, ConnectVVM } from 'react-tiny-mvvm';
import { MyViewModel } from './MyViewModel.viewmodel';

// Connect the viewmodel to its view.
@ConnectVVM(MyViewModel)
export class MyView extends ViewBase<MyViewModel> {
  constructor(props: {}, contex: {}) {
    super(props, contex);
  }
  
  render() {
    const vm = this.viewmodel;
    
    return (
      <div onClick={ () => vm.onClick() }>{vm.propName}</div>
    );
  }
}

```

### Register / Send a message

```typescript
// Place where you want to send message to all listening to it.
Messenger.Default.send(DefaultToken.create('todoSometing'), 'a message');

// Place where you want to accept message.
Messenger.Default.register(DefaultToken.create('todoSomething'), (msg: string) => {
  console.log(msg); // parameter of msg will be 'a message'
});
```

### Create a Observable Array Property

```typescript
import { ObservableArray } from 'react-tiny-mvvm';

private _array: ObservableArray<any> = new ObservableArray();
@NotifyProperty({isObservableArrayProperty: true})
get array(): ObservableArray<any> { return this._array; }
set array(value: ObservableArray<any>) { this._array = value; }

// To modify array then notify the change.
this.array.modifyArray(array => array.push(1));
```

## Run Demo

```
cd demo
cd todo-list
yarn install
yarn start
```

## Route Map

- Observable object
- Async operation optimizing
- ...

## Distribute

> Under construction

## Contact

Take issue directly please if you have any question or suggestion.