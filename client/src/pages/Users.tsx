import React, { useContext } from "react";
import { Container, Grid, GridItem } from "../elements/components";
import { useSelector } from "react-redux";
import { ApplicationState } from "../store";
import PlayerCard from "../components/PlayerCard";
import styled from "styled-components";
import { GoPrimitiveDot } from "react-icons/go";
import { SocketContext } from "../context/SocketContext";
import { Status } from "../constants/statusConstants";

export interface UsersProps {}

const Users: React.FC<UsersProps> = () => {
    const context = useContext(SocketContext);
    const usersState = useSelector((state: ApplicationState) => state.users);
    const { users } = usersState;
    const statusState = useSelector((state: ApplicationState) => state.status);
    const { id } = statusState;
    const usersOnline = Object.keys(users).filter((user) => users[user].status === Status.IDLE && user !== id);
    const usersBusy = Object.keys(users).filter((user) => users[user].status !== Status.IDLE && user !== id);
    return (
        <Container marginTop={1}>
            <UsersHeader>
                <GoPrimitiveDot />
                Users Online:
            </UsersHeader>
            <Grid columns={12}>
                {usersOnline.length ? (
                    usersOnline.map((user) => (
                        <GridItem className="s-col-6 xs-col-12" span={3} key={user}>
                            <PlayerCard
                                clickHandler={() => context?.challenge(users[user])}
                                user={users[user].name}
                                status={users[user].status}
                                id={user}
                            />
                        </GridItem>
                    ))
                ) : (
                    <GridItem span={12}>
                        <p>No users here!</p>
                    </GridItem>
                )}
            </Grid>
            <UsersHeader className="users-busy" marginTop={1.25}>
                <GoPrimitiveDot />
                Users Busy:
            </UsersHeader>
            <Grid columns={12}>
                {usersBusy.length ? (
                    usersBusy.map((user) => (
                        <GridItem className="s-col-6 xs-col-12" span={3} key={user}>
                            <PlayerCard
                                clickHandler={() => context?.challenge(users[user])}
                                user={users[user].name}
                                status={users[user].status}
                                id={user}
                            />
                        </GridItem>
                    ))
                ) : (
                    <GridItem span={12}>
                        <p>No users here!</p>
                    </GridItem>
                )}
            </Grid>
        </Container>
    );
};

export default Users;

interface HeaderProps {
    marginTop?: number;
}

const UsersHeader = styled.h3<HeaderProps>`
    display: flex;
    align-items: center;
    margin-bottom: 0.25rem;
    margin-top: ${(props) => (props.marginTop ? props.marginTop : 0)}rem;
    &.users-busy {
        svg {
            color: orange;
        }
    }

    svg {
        color: green;
    }
`;
