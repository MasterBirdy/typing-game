import React, { useState, useContext } from "react";
import { SocketContext } from "../context/SocketContext";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationState } from "../store";
import { below } from "../elements/utilities";
import styled from "styled-components";
import { setError } from "../actions/messageActions";

export interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
    const dispatch = useDispatch();
    const context = useContext(SocketContext);
    const [nameInput, setNameInput] = useState("");
    const statusState = useSelector((state: ApplicationState) => state.status);
    const { name } = statusState;

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (nameInput.length) {
            context?.setMyName(nameInput);
        } else {
            dispatch(setError("Name cannot be blank!"));
        }
    };

    return (
        <Wrapper>
            <Header>Welcome to TypeRacer! 🏎️</Header>
            <Text>To get started, change your name here.</Text>
            <Holder onSubmit={submitHandler}>
                <Input
                    type="text"
                    placeholder={name}
                    value={nameInput}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setNameInput(e.target.value);
                    }}
                ></Input>
                <Button>Submit</Button>
            </Holder>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    position: fixed;
    top: 43%;
    left: 50%;
    transform: translate(-50%, -43%);
    ${below.s`
    top: 50%;
    transform: translate(-50%, -50%);
    `}
`;

const Header = styled.h1`
    font-size: 2.8rem;
    text-align: center;
    font-family: Lato, sans-serif;
    ${below.s`
    font-size: 2.4rem;
    `}
`;

const Text = styled.p`
    margin-top: 0.5rem;
    font-size: 1.15rem;
    text-align: center;
    font-family: Lato, sans-serif;
`;

const Holder = styled.form`
    display: flex;
    justify-content: center;
    margin-top: 0.75rem;
`;

const Input = styled.input`
    padding: 0.5rem;
    font-family: Lato, sans-serif;
    font-size: 1rem;
`;

const Button = styled.button`
    margin-left: 0.5rem;
    font-family: "Lato", sans-serif;
    font-size: 1.025rem;
    padding: 0.5rem;
    font-weight: 700;
    border: 2px solid #272727;
    color: white;
    background-color: #333;
    cursor: pointer;
    transition: 0.5s all ease;
    &:hover {
        color: #333;
        background-color: white;
    }
    &:active {
        color: white;
        background-color: #2a6138;
    }
`;

export default Home;
