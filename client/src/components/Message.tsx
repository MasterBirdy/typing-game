import * as React from "react";
import styled from "styled-components";

export enum messageType {
    error = "error",
    info = "info",
}

export interface MessageProps {
    type?: messageType;
}

const Message: React.FC<MessageProps> = ({ type = messageType.info, children }) => {
    return <MessageBox type={type}>{children}</MessageBox>;
};

const MessageBox = styled.div<{ type: messageType }>`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-style: solid;
    border-width: 2px;
    border-radius: 5px;
    border-color: ${(props) => (props.type === messageType.error ? "red" : "#c6c7ca")};
    box-shadow: 5px 5px 13px -6px rgba(0, 0, 0, 0.29);
    background-color: #e2e3e5;
    font-family: Lato, sans-serif;
    color: #383d41;
    padding: 0.5rem 1.25rem 0.5rem;
`;

export default Message;
