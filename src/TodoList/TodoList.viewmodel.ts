import { ViewModelBase, NotifyProperty } from '../react-tiny-mvvm/ViewModelBase';
import { TodoItemModel } from '../Model/TodoItem.model';
import { ObservableArray } from '../react-tiny-mvvm/ObservableArray';
import { TodoListModel } from '../Model/TodoList.model';

export class TodoListViewModel extends ViewModelBase {
    static readonly Instance = new TodoListViewModel();

    public listItem = new TodoItemModel();
    public list = new TodoListModel();

    constructor() {
        super();
    }

    @NotifyProperty({})
    public get time(): string {
        return this.listItem.time;
    }

    public set time(v: string) {
        this.listItem.time = v;
    }

    @NotifyProperty({})
    public get detail(): string {
        return this.listItem.detail;
    }

    public set detail(v: string) {
        this.listItem.detail = v;
    }

    @NotifyProperty({ isObservableArrayProperty: true })
    public get todoList(): ObservableArray<TodoItemModel> {
        return this.list.list;
    }

    public set todoList(value: ObservableArray<TodoItemModel>) {
        this.list.list = value;
    }

    public onButtonClicked() {
        // this.time = '2018-01-12';
        this.multiValueChanged(() => {
            this.todoList.modifyArray((array) => {
                array[0].detail = 'fuck';
                return array;
            });
        });
    }
}
