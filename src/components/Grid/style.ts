import styled from 'styled-components';

export const gridGap = '10px';

export const StyledGridWrapper = styled.ul`
    display: flex;
    flex-wrap: wrap;
    grid-gap: ${gridGap};
    list-style: none;
    padding: 0;
    margin: 10px;
`;
