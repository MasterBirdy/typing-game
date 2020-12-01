import * as React from "react";
import styled from "styled-components";
import { Container } from "../elements/components";
import { Link } from "react-router-dom";
import { below } from "../elements/utilities";

export interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = () => {
    return (
        <NavigationBar>
            <Container>
                <NavigationInnerBar>
                    <div>
                        <Link to="/">TypeRace</Link>
                    </div>
                    <div>
                        <Link to="/">home</Link>
                        <Link to="/users">users</Link>
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

    a,
    a:visited {
        text-decoration: none;
        display: inline-block;
        color: #444;

        font-family: Lato, sans-serif;
        &:not(:last-child) {
            margin-right: 2rem;
        }
    }

    h1 {
        font-size: 3rem;
    }
`;
