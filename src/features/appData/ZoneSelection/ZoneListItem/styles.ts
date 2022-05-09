import styled from 'styled-components';
import { DFB_Teams } from '../../../../assets/images';

export const StyledLeagueCardWrapper = styled.li`
    display: inline-block;
    position: relative;
    margin: 10px;
    width: calc(100% - 20px);
    height: 0;
    padding-bottom: 250px;
    background: url(${DFB_Teams});
    background-size: 100% 100%;
    background-repeat: none;
    cursor: pointer;
    border-radius: 3px;
    scroll-snap-align: center;
    box-shadow: 0px 4px 4px rgb(0 0 0 / 25%);
`;

export const StyledLeagueName = styled.span`
    position: absolute;
    width: 180px;
    bottom: 22px;
    left: 22px;
    font-size: 24px;
    font-weight: 500;
    line-height: 30px;
    letter-spacing: -0.41px;
    white-space: normal;
    color: white;
`;

export const StyledCollection = styled.span`
    position: absolute;
    display: flex;
    align-items: center;
    top: 15px;
    right: 15px;
    font-size: 26px;
`;

export const StyledCollectionCount = styled.span`
    font-size: 13px;
    font-weight: 700;
    margin-right: 5px;
`;
