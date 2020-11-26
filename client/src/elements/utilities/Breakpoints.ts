import { css, FlattenSimpleInterpolation } from "styled-components";

interface SizeProps {
    [key: string]: number;
}

const size: SizeProps = {
    xs: 480,
    s: 768,
    m: 1024,
    l: 1200,
};

/**
 * @desc Method for injecting template literals with max-width css breakpoints
 * for styled components.
 */
//

export const below = Object.keys(size).reduce((accumulator, label) => {
    accumulator[label] = (first: any, ...args: TemplateStringsArray[]) => css`
        @media (max-width: ${size[label]}px) {
            ${css(first, ...args)};
        }
    `;
    return accumulator;
}, {} as Record<keyof typeof size, (...p: TemplateStringsArray[]) => FlattenSimpleInterpolation>);
