import React, { useContext, useRef, useEffect, useMemo } from "react";
import { SocketContext } from "../context/SocketContext";
import styled from "styled-components";
import { Container } from "../elements/components";
import { below } from "../elements/utilities";
import { useSelector, useDispatch } from "react-redux";
import { ApplicationState } from "../store";
import TextareaAutosize from "react-textarea-autosize";
import UserVersusCard from "../components/UserVersusCard";
import { incrementActionCounter } from "../actions/gameActions";
import { Prompt } from "react-router-dom";

export interface GameProps {}

const Game: React.FC<GameProps> = () => {
    const intervalRef = useRef(0);
    const dispatch = useDispatch();
    const statusState = useSelector((state: ApplicationState) => state.status);
    const { opponent, id } = statusState;
    const gameState = useSelector((state: ApplicationState) => state.game);
    const context = useContext(SocketContext);
    const {
        typingPrompt,
        yourTyping,
        sliceNumber,
        incorrect,
        yourActions,
        opponentActions,
        opponentTyping,
        timeStarted,
        currentTime,
        gameWon,
        youWon,
    } = gameState;
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

    useEffect(() => {
        const interval = setInterval(() => {
            if (opponent) {
                context?.updateGame(opponent.id);
            }
        }, 700);
        intervalRef.current = interval;
        return () => {
            clearInterval(intervalRef.current);
            context?.leaveGame();
        };
        /* eslint-disable-next-line */
    }, []);

    useEffect(() => {
        if (intervalRef.current && gameWon) {
            clearInterval(intervalRef.current);
        }
    }, [intervalRef, gameWon]);

    // used to update only when the currentTime is updated
    let calculatedNumbers = useMemo(() => {
        return {
            you: Math.floor(yourActions / 5 / ((currentTime - timeStarted) / (1000 * 60))),
            opponent: Math.floor(opponentActions / 5 / ((currentTime - timeStarted) / (1000 * 60))),
            yourPercentage: Math.min(Math.floor((yourTyping.length / typingPrompt.length) * 100), 100),
            opponentPercentage: Math.min(Math.floor((opponentTyping.length / typingPrompt.length) * 100), 100),
        };
        /* eslint-disable-next-line */
    }, [currentTime]);

    return (
        <GameContainer>
            <Prompt when={!gameWon} message={() => "Your game is still being played! Are you sure you want to quit?"} />
            <Flex>
                <UserVersusCard
                    name={"You"}
                    user={id}
                    apm={calculatedNumbers.you}
                    percent={gameWon && youWon ? 100 : calculatedNumbers.yourPercentage}
                    winner={gameWon && youWon}
                />
                <UserVersusCard
                    name={opponent?.name}
                    user={opponent?.id}
                    apm={calculatedNumbers.opponent}
                    percent={gameWon && !youWon ? 100 : calculatedNumbers.opponentPercentage}
                    winner={gameWon && !youWon}
                />
            </Flex>
            <TypingHeader>Typing Prompt</TypingHeader>
            <TypingPrompt>{prompt}</TypingPrompt>
            <TextInput
                onPaste={(e: React.ClipboardEvent) => {
                    e.preventDefault();
                }}
                onContextMenu={(e: React.MouseEvent) => e.preventDefault()}
                onKeyDown={(e: React.KeyboardEvent) => {
                    if (e.keyCode === 13) e.preventDefault();
                    else {
                        if (e.keyCode !== 8) {
                            dispatch(incrementActionCounter());
                        }
                    }
                }}
                value={yourTyping}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    context?.typeACharacter(e.target.value);
                }}
                disabled={gameWon}
            />
        </GameContainer>
    );
};

const GameContainer = styled(Container)`
    margin-top: 1.25rem;
`;

const Flex = styled.div`
    display: flex;
`;

const TypingHeader = styled.p`
    font-family: Lato;
    font-size: 1.3rem;
    font-weight: 700;
    color: #333;
    margin-top: 1.25rem;
    margin-bottom: 0.5rem;
`;

const TypingPrompt = styled.span`
    font-family: Crimson Text;
    font-size: 2.3rem;
    user-select: none;
    ${below.s`
    font-size: 1.5rem;
    `}
    ${below.xs`
    font-size: 1.3rem;
    `}
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
