import React, { useContext } from "react";
import { SocketContext } from "../context/SocketContext";
import styled from "styled-components";
import { Container } from "../elements/components";
import { useSelector } from "react-redux";
import { ApplicationState } from "../store";
import TextareaAutosize from "react-textarea-autosize";

export interface GameProps {}

const Game: React.FC<GameProps> = () => {
    const gameState = useSelector((state: ApplicationState) => state.game);
    const context = useContext(SocketContext);
    const { typingPrompt, yourTyping, sliceNumber, incorrect } = gameState;
    let slice = 0;
    let prompt = [];
    if (sliceNumber > 0) {
        prompt.push(<GreenSpan>{typingPrompt.slice(0, sliceNumber)}</GreenSpan>);
        slice += sliceNumber;
    }
    if (incorrect && sliceNumber !== typingPrompt.length) {
        prompt.push(<RedSpan>{typingPrompt.slice(slice, slice + 1)}</RedSpan>);
        slice++;
    }
    prompt.push(typingPrompt.slice(slice));

    return (
        <GameContainer>
            <TypingHeader>Typing Prompt</TypingHeader>
            <TypingPrompt>{prompt}</TypingPrompt>
            <TextInput
                onPaste={(e: React.ClipboardEvent) => {
                    e.preventDefault();
                }}
                onContextMenu={(e: React.MouseEvent) => e.preventDefault()}
                onKeyDown={(e: React.KeyboardEvent) => {
                    if (e.keyCode === 13) e.preventDefault();
                }}
                value={yourTyping}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    console.log(context);
                    context?.typeACharacter(e.target.value);
                }}
            />
        </GameContainer>
    );
};

const GameContainer = styled(Container)`
    margin-top: 1.25rem;
`;

const TypingHeader = styled.p`
    font-family: Lato;
    font-size: 1.3rem;
    font-weight: 700;
    color: #333;
    margin-bottom: 0.5rem;
`;

const TypingPrompt = styled.span`
    font-family: Crimson Text;
    font-size: 2.5rem;
    user-select: none;
`;

const GreenSpan = styled.span`
    background-color: #aedcb8;
`;

const RedSpan = styled.span`
    background-color: #f1aeae;
`;

const TextInput = styled(TextareaAutosize)`
    margin-top: 1rem;
    display: block;
    width: 100%;
    font-family: Lato;
    padding: 1rem 1.25rem 2rem;
    font-size: 1.15rem;
    outline: none;
    resize: none;
    user-select: none;
`;

export default Game;
