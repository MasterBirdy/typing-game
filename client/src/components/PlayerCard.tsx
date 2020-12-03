import React from "react";
import styled from "styled-components";
import { toSvg } from "jdenticon";
import { AiFillStar } from "react-icons/ai";
import { Status } from "../constants/statusConstants";

/**
 * @param user User name
 * @param clickHandler Function that fires when challenge button is clicked
 * @param status Determines whether user can be challenged
 * @param id User id
 */

export interface PlayerCardProps {
    user: string;
    clickHandler?: () => void;
    status: Status;
    id: string;
}

const PlayerCard: React.FC<PlayerCardProps> = ({ user, clickHandler, status, id }) => {
    return (
        <Card>
            <div dangerouslySetInnerHTML={{ __html: toSvg(id, 40) }}></div>
            <p>Name: {user}</p>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                    className={status !== Status.IDLE ? "disabled" : ""}
                    onClick={clickHandler}
                    disabled={status !== Status.IDLE}
                >
                    <AiFillStar />
                    <ButtonText>Challenge</ButtonText>
                </Button>
            </div>
        </Card>
    );
};

PlayerCard.defaultProps = {
    clickHandler: () => {},
};

export default PlayerCard;

const Card = styled.div`
    margin-top: 0.5rem;
    margin-right: 0.5rem;
    border: 1px solid #eee;
    border-radius: 5px;
    padding: 1rem;
    box-shadow: 7px 7px 8px -9px rgba(0, 0, 0, 0.46);
`;

const Button = styled.button`
    display: flex;
    align-items: center;
    margin-top: 0.5rem;
    font-family: Lato, sans-serif;
    text-transform: uppercase;
    border: 2px solid #48924b;
    border-radius: 5px;
    outline: none;
    background-color: #48924b;
    color: white;
    font-weight: 700;
    padding: 0.5rem;
    font-size: 1.1rem;
    transition: 0.3s all ease-out;
    cursor: pointer;
    &:hover {
        background: white;
        color: #48924b;
    }
    &:active {
        background: #48924b;
        color: white;
    }
    &.disabled {
        border: 2px solid grey;
        background-color: #c5d1c5;
        cursor: not-allowed;
        &:hover {
            color: white;
        }
        &:active {
        }
    }
`;

const ButtonText = styled.span`
    margin-left: 0.25rem;
`;
