import * as React from 'react';
import { ViewBase } from 'react-tiny-mvvm';
import { ConnetVVM } from 'react-tiny-mvvm';
import { TodoInputViewModel } from './TodoInput.viewmodel';

@ConnetVVM(TodoInputViewModel.Instance)
export class TodoInput extends ViewBase<TodoInputViewModel> {
    render() {
        const vm = this.viewmodel;

        return (
            <div className="input-group">
                <input type="text" className="form-control input-lg" placeholder="What do you want to do today?" value={vm.text} onChange={(text) => vm.onTextChage(text.target.value)}/>
                <span className="input-group-btn">
                    <button className="btn btn-default btn-lg" type="button" onClick={() => vm.onClick()}>Append</button>
                </span>
            </div>
        );
    }
}

export default TodoInput;
