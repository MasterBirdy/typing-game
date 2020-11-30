import styled from "styled-components";

interface GridProps {
    marginTop?: number;
    columns?: number;
}

export const Grid = styled.div<GridProps>`
    display: grid;
    margin-top: ${(props) => props.marginTop}rem;
    grid-template-columns: repeat(${(props) => props.columns}, 1fr);
`;

Grid.defaultProps = {
    marginTop: 0,
    columns: 1,
};

interface GridItemProps {
    start?: string | number;
    span?: number;
}

export const GridItem = styled.div<GridItemProps>`
    grid-column: ${(props) => props.start} / span ${(props) => props.span};
    height: 100%;
`;

GridItem.defaultProps = {
    start: "auto",
    span: 1,
};
