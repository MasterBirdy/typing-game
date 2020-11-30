import React, { useContext } from "react";
import { SocketContext } from "../context/SocketContext";
import { Container } from "../elements/components";
import { useSelector } from "react-redux";
import { ApplicationState } from "../store";
import { Status } from "../constants/statusConstants";

export interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
    const context = useContext(SocketContext);
    const statusState = useSelector((state: ApplicationState) => state.status);
    const { status, opponent } = statusState;
    return (
        <Container style={{ marginTop: "1rem" }}>
            <p>Status: {status}</p>
            {status && status === Status.WAITING && opponent && (
                <button
                    onClick={() => {
                        context?.acceptInvite(opponent.name);
                    }}
                >
                    Play Game
                </button>
            )}
        </Container>
    );
};

export default Home;
