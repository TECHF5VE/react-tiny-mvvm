import { ObservableArray } from 'react-tiny-mvvm';
import { TodoItemModel } from '../Model/TodoItem.model';

export class TodoListModel {
    list: ObservableArray<TodoItemModel> = new ObservableArray();
}
