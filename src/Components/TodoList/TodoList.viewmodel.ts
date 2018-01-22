import { ViewModelBase, NotifyProperty } from '../../react-tiny-mvvm/ViewModelBase';
import { TodoItemModel } from '../../Model/TodoItem.model';
import { ObservableArray } from '../../react-tiny-mvvm/ObservableArray';
import { TodoListModel } from '../../Model/TodoList.model';
import { Messenger, DefaultToken } from '../../react-tiny-mvvm/Messenger';

export class TodoListViewModel extends ViewModelBase {
    static readonly Instance = new TodoListViewModel();

    public list = new TodoListModel();

    constructor() {
        super();
        Messenger.Default.register(DefaultToken.create('addTodoItem'), (msg: string) => {
            this.appendRecord(msg);
        });
    }

    @NotifyProperty({ isObservableArrayProperty: true })
    public get todoList(): ObservableArray<TodoItemModel> {
        return this.list.list;
    }

    public set todoList(value: ObservableArray<TodoItemModel>) {
        this.list.list = value;
    }

    public onButtonClicked(index: number) {
        this.todoList.modifyArray((array) => {
            array.splice(index, 1);
            return array;
        });
    }

    private appendRecord(msg: string) {
        this.todoList.modifyArray(array => {
            const item = new TodoItemModel();
            item.detail = msg;
            item.time = (new Date(Date.now())).toDateString();
            array.push(item);
            return array;
        });
    }
}
