import * as React from "react";
import styled from "styled-components";

enum messageType {
    error = "error",
    info = "info",
}

export interface MessageProps {
    message: string;
    type?: messageType;
}

const Message: React.FC<MessageProps> = ({ message, type = messageType.info }) => {
    return <MessageBox type={type}>{message}</MessageBox>;
};

const MessageBox = styled.div<{ type: messageType }>`
    border-style: solid;
    border-width: 2px;
    border-radius: 5px;
    border-color: ${(props) => (props.type === messageType.error ? "red" : "#c6c7ca")};
    box-shadow: 5px 5px 13px -6px rgba(0, 0, 0, 0.29);
    background-color: #e2e3e5;
    font-family: Lato, sans-serif;
    color: #383d41;
    padding: 1rem;
`;

export default Message;
