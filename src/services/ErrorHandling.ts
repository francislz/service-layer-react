import { MessageContextProps } from '../contexts/MessageContext';

export default abstract class ErrorHandling {
    private context: MessageContextProps;

    constructor(context: MessageContextProps){
        this.context = context;
    }

    public handleError(errorMsg: string){
        if(this.context.setMessage){
            this.context.setMessage(errorMsg);
        }
    }
}