import React, { useContext } from "react";
import { SocketContext } from "../context/SocketContext";
import { toSvg } from "jdenticon";
import { Container, MessageWrapper } from "../elements/components";
import { useSelector, useDispatch } from "react-redux";
import { ApplicationState } from "../store";
import Message from "../components/Message";
import { Status } from "../constants/statusConstants";

export interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
    const context = useContext(SocketContext);
    const usersState = useSelector((state: ApplicationState) => state.users);
    const { users } = usersState;
    const statusState = useSelector((state: ApplicationState) => state.status);
    const { status, opponent } = statusState;
    const messageState = useSelector((state: ApplicationState) => state.message);
    const { message, error } = messageState;
    return (
        <Container style={{ marginTop: "1rem" }}>
            {message && (
                <MessageWrapper>
                    <Message message={message}></Message>
                </MessageWrapper>
            )}
            <p>Status: {status}</p>
            {users.length ? (
                users.map((user) => (
                    <div key={user}>
                        <div
                            dangerouslySetInnerHTML={{ __html: toSvg(user, 40) }}
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                                context?.challenge(user);
                            }}
                        ></div>
                        <p>{user}</p>
                    </div>
                ))
            ) : (
                <p>No users are playing right now!</p>
            )}
            {status && status === Status.WAITING && opponent && (
                <button
                    onClick={() => {
                        context?.acceptInvite(opponent);
                    }}
                >
                    Play Game
                </button>
            )}
        </Container>
    );
};

export default Home;
