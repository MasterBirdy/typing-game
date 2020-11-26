import React, { useContext } from "react";
import { SocketContext } from "../context/SocketContext";
import { toSvg } from "jdenticon";
import { Container, MessageWrapper } from "../elements/components";
import { useSelector, useDispatch } from "react-redux";
import { ApplicationState } from "../store";
import Message from "../components/Message";

export interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
    const context = useContext(SocketContext);
    const usersState = useSelector((state: ApplicationState) => state.users);
    const { users } = usersState;
    const statusState = useSelector((state: ApplicationState) => state.status);
    const { status } = statusState;
    const messageState = useSelector((state: ApplicationState) => state.message);
    const { message, error } = messageState;
    return (
        <Container>
            {message && (
                <MessageWrapper>
                    <Message message={message}></Message>
                </MessageWrapper>
            )}
            <p>Status: {status}</p>
            {users.map((user) => (
                <div
                    key={user}
                    dangerouslySetInnerHTML={{ __html: toSvg(user, 40) }}
                    onClick={context?.inviteUser}
                ></div>
            ))}
        </Container>
    );
};

export default Home;
