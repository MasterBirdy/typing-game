import * as React from "react";
import styled from "styled-components";
import { Container } from "../elements/components";
import { below } from "../elements/utilities";

export interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = () => {
    return (
        <NavigationBar>
            <Container>
                <NavigationInnerBar>
                    <div>
                        <span>TypeRace</span>
                    </div>
                    <div>
                        <span>Home</span>
                        <span>Users</span>
                    </div>
                </NavigationInnerBar>
            </Container>
        </NavigationBar>
    );
};

export default NavBar;

export const NavigationBar = styled.div`
    box-shadow: 2px 0px 26px -8px rgba(0, 0, 0, 0.22);
`;

export const NavigationInnerBar = styled.div`
    padding: 1.35rem 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    span {
        display: inline-block;
        color: #444;
        text-transform: lowercase;
        font-family: Lato, sans-serif;
        &:not(:last-child) {
            margin-right: 2rem;
        }
    }
    a,
    a:visited {
        text-decoration: none;
        color: black;
    }

    h1 {
        font-size: 3rem;
    }
`;
