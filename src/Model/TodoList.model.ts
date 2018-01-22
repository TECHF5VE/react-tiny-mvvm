import { ObservableArray } from '../react-tiny-mvvm/ObservableArray';
import { TodoItemModel } from '../Model/TodoItem.model';

export class TodoListModel {
    list: ObservableArray<TodoItemModel> = new ObservableArray();
}
