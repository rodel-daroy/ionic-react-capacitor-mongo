import styled from 'styled-components';

export const StyledWrapper = styled.li<{ seen: boolean }>`
    position: relative;
    background-color: ${({ seen }) => (seen ? 'transparent' : '#f0f0f0')};
    height: 105px;
    display: grid;
    padding: 8px 20px;
    grid-template: 'time date' 1em 'image content' auto / 70px auto;
    grid-column-gap: 12px;
    grid-row-gap: 5px;

    &::after {
        content: '';
        position: absolute;
        bottom: 0;
        right: 0;
        height: 2px;
        width: calc(100% - 102px);
        background: rgb(200, 200, 200);
    }
`;

export const StyledTime = styled.div`
    grid-area: time;
    font-size: 0.8em;
`;

export const StyledDate = styled.div`
    grid-area: date;
    font-size: 0.8em;
    text-align: right;
`;

export const StyledImage = styled.div`
    grid-area: image;
`;

export const StyledContent = styled.div`
    grid-area: content;
    font-size: 0.9em;
    padding: 4px 0;
`;
