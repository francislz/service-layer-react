import React from 'react';

export interface MessageContextProps {
    setMessage?: React.Dispatch<React.SetStateAction<string>>;
    message: string;
}

const MessageContext = React.createContext<MessageContextProps>({message: ""});

export default MessageContext;