import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { ApplicationState } from "../store";
import Message, { messageType } from "./Message";
import { Container } from "../elements/components/";
import { below } from "../elements/utilities";

export interface MessageWrapperProps {}

const MessageWrapper: React.FC<MessageWrapperProps> = () => {
    const messageState = useSelector((state: ApplicationState) => state.message);
    const { message, error, button, errorOnClick } = messageState;
    return (
        <Wrapper>
            {message && (
                <Message>
                    {message}
                    {button.name && <Button onClick={(e: React.MouseEvent) => button.onClick(e)}>{button.name}</Button>}
                </Message>
            )}
            {error && (
                <Message type={messageType.error}>
                    {error}
                    <Button onClick={(e: React.MouseEvent) => errorOnClick(e)}>Accept</Button>
                </Message>
            )}
        </Wrapper>
    );
};

const Wrapper = styled.div`
    position: fixed;
    margin: 0 auto;
    min-width: 40rem;
    bottom: 1rem;
    left: 50%;
    transform: translateX(-50%);
    ${below.s`
        min-width: 80%;
    `}
`;

const Button = styled.button`
    border-style: solid;
    border-width: 2px;
    border-radius: 5px;
    border-color: #d1d1d1;
    background-color: #f0f0f0;
    font-family: Lato, sans-serif;
    color: #292c2e;
    padding: 0.66rem;
    cursor: pointer;
    outline: none;
`;

export default MessageWrapper;
