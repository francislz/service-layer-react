import { useContext } from "react";
import MessageContext, { MessageContextProps } from "../contexts/MessageContext";

export default function useService<T>(type: {new(context: MessageContextProps):  T }): T {
    const context = useContext(MessageContext);
    return new type(context);
}