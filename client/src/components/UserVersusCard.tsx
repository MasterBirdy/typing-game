import React from "react";
import { toSvg } from "jdenticon";
import styled from "styled-components";

export interface UserVersusCardProps {
    user?: string;
    name?: string;
    apm?: number;
    percent?: number;
}

const UserVersusCard: React.FC<UserVersusCardProps> = ({ user, name, apm, percent }) => {
    return (
        <Container>
            <div dangerouslySetInnerHTML={{ __html: toSvg(user, 64) }}></div> <Text>{name}</Text>{" "}
            <Text className="light">{apm} wpm</Text>
            <Text className="light">{percent}%</Text>
        </Container>
    );
};

UserVersusCard.defaultProps = {
    user: "player",
    name: "Player",
    apm: 100,
    percent: 0,
};

const Container = styled.div`
    display: inline-block;
    text-align: center;
    margin-right: 1.25rem;
`;

const Text = styled.p`
    font-family: Lato, sans-serif;
    font-weight: 700;
    color: #222;
    line-height: 1.3;
`;

export default UserVersusCard;
