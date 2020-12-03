import * as React from "react";
import styled from "styled-components";
import { Container } from "../elements/components";
import { Link } from "react-router-dom";
import { toSvg } from "jdenticon";
import { useSelector } from "react-redux";
import { ApplicationState } from "../store";

export interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = () => {
    const statusState = useSelector((state: ApplicationState) => state.status);
    const { id } = statusState;
    return (
        <NavigationBar>
            <Container>
                <NavigationInnerBar>
                    <div>
                        <Link to="/">TypeRace</Link>
                    </div>
                    <Flex>
                        <Link to="/">home</Link>
                        <Link to="/users">users</Link>
                        <div dangerouslySetInnerHTML={{ __html: toSvg(id, 36) }}></div>
                    </Flex>
                </NavigationInnerBar>
            </Container>
        </NavigationBar>
    );
};

export default NavBar;

const NavigationBar = styled.div`
    box-shadow: 2px 0px 26px -8px rgba(0, 0, 0, 0.22);
`;

const NavigationInnerBar = styled.div`
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
            margin-right: 1.25rem;
        }
    }

    h1 {
        font-size: 3rem;
    }
`;

const Flex = styled.div`
    display: flex;
    align-items: center;
`;
