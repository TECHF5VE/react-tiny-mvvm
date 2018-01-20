import { ObservableArray } from '../react-tiny-mvvm/ObservableArray';
import { TodoItemModel } from '../Model/TodoItem.model';

export class TodoListModel {
    list: ObservableArray<TodoItemModel> = new ObservableArray();

    constructor() {
        for (let index = 0; index < 5; index++) {
            this.list.modifyArray((array) => {
                array.push(new TodoItemModel());
                return array;
            });
        }
    }
}
