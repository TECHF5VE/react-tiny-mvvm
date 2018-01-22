import { ViewModelBase, NotifyProperty } from '../../react-tiny-mvvm/ViewModelBase';
import { Messenger, DefaultToken } from '../../react-tiny-mvvm/Messenger';

export class TodoInputViewModel extends ViewModelBase {

    static readonly Instance = new TodoInputViewModel();

    private _text = '';

    @NotifyProperty()
    public get text(): string {
        return this._text;
    }

    public set text(v: string) {
        this._text = v;
    }

    public onClick() {
        if (!this.text) {
            return;
        }
        Messenger.Default.send(DefaultToken.create('addTodoItem'), this.text);
        this.text = '';
    }

    public onTextChage(text: string) {
        this.text = text;
    }

}
