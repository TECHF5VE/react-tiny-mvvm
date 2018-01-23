import * as React from 'react';
import { ConnetVVM } from 'react-tiny-mvvm';
import { TodoListViewModel } from './TodoList.viewmodel';
import { ViewBase } from 'react-tiny-mvvm';

import './TodoList.view.css';

@ConnetVVM(TodoListViewModel.Instance)
export class TodoList extends ViewBase<TodoListViewModel> {
  constructor(props: {}, contex: {}) {
    super(props, contex);
  }

  render() {
    const vm = this.viewmodel;

    return (
      <div className="container-fluid TodoList-container">
        {
          vm.todoList.originArray.map((value, index) => {
            return <div key={index} className="row TodoList-row">
              <div className="col-md-6">{value.detail}</div>
              <div className="col-md-3">{value.time}</div>
              <div className="col-md-3">
                <button type="submit" className="col-2 btn btn-success btn-sm" onClick={() => vm.onButtonClicked(index)}>Complete</button>
              </div>
            </div>;
          })
        }
      </div>
    );
  }
}
