import { ViewModelBase } from '../react-tiny-mvvm/ViewModelBase';
import TodoItem from '../Model/TodoItem.model';

export class TodoListViewModel extends ViewModelBase {
    static readonly Instance = new TodoListViewModel();

    public listItem = new TodoItem();

    public get time(): string {
        return this.listItem.time;
    }

    public set time(v: string) {
        this.listItem.time = v;
        this.notifyValueChanged('time', v);
    }

    public get detail(): string {
        return this.listItem.detail;
    }

    public set detail(v: string) {
        this.listItem.detail = v;
        this.notifyValueChanged('detail', v);
    }

    public onButtonClicked() {
        // this.time = '2018-01-12';
        this.multiValueChanged(() => {
            this.time = '2018-01-12';
        });
    }
}
