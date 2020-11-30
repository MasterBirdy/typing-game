import styled from "styled-components";
import { below } from "../utilities";

interface ContainerProps {
    marginTop?: number;
}

export const Container = styled.div<ContainerProps>`
    margin: 0 auto;
    padding: 0 2rem;
    max-width: 70rem;
    margin-top: ${(props) => props.marginTop}rem;
    ${below.s`
  padding: 0;
  width: 90%;
  `}
    ${below.xs`
  width: 92.5%;
  `};
`;

Container.defaultProps = {
    marginTop: 0,
};
