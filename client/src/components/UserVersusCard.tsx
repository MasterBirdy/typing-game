import React from "react";
import { toSvg } from "jdenticon";
import styled from "styled-components";

export interface UserVersusCardProps {
    user?: string;
    name?: string;
    apm?: number;
    percent?: number;
    winner: boolean;
}

const UserVersusCard: React.FC<UserVersusCardProps> = ({ user, name, apm, percent, winner }) => {
    return (
        <Container>
            <div dangerouslySetInnerHTML={{ __html: toSvg(user, 64) }}></div> <Text>{name}</Text> <Text>{apm} wpm</Text>
            <Text>{percent}%</Text>
            {winner && <WinnerText className="green">Winner!</WinnerText>}
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

const WinnerText = styled.p`
    color: green;
`;
export default UserVersusCard;
