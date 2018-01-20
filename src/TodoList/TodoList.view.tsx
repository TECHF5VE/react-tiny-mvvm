import * as React from 'react';
import { connectVVM } from '../react-tiny-mvvm/ViewModelBase';
import { TodoListViewModel } from './TodoList.viewmodel';
import { ViewBase } from '../react-tiny-mvvm/ViewBase';

export class TodoList extends ViewBase<TodoListViewModel> {
  constructor(props: {}, contex: {}) {
    super(props, contex);

    connectVVM(this, TodoListViewModel.Instance);
  }

  render() {
    const vm = this.viewmodel;

    return (
      <div className="todoList">
        {
          vm.list.list.originArray.map((value, index) => {
            return <div key={index}>
              <p>{value.detail}</p>
              <p>{value.time}</p>
            </div>;
          })
        }
        <a onClick={() => vm.onButtonClicked()}>click me</a>
      </div>
    );
  }
}
