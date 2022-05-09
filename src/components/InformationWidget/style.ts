import styled from 'styled-components';

interface IProps {
    backgroundColor?: string;
}
export const StyledInformationWidget = styled.button<IProps>`
    background-color: white;
    border-radius: 999px;
    width: 3px;
    height: 3px;
    border: 1px solid black;
`;

export const StyledInformationWidgetModal = styled.button<IProps>`
    background-color: white;
    border-radius: 15px;
`;
