/*eslint-disable */
import styled from 'styled-components';
import { IonTitle } from '@ionic/react';
import { Coming_Soon_01 } from '../../../../assets/images';

export const ZoneName = styled.h3`
    margin: 0 10px;
    color: black !important;
`;

export const LeaguesList = styled.ul`
    list-style: none;
    padding: 0;
    white-space: nowrap;
    scroll-snap-type: x mandatory;
    overflow-x: scroll;
`;

export const ImageWrapper = styled.div`
    margin: 10px;
`;

export const ComingSoonImage = styled.div`
    width: 100%;
    height: 200px;
    background: url(${Coming_Soon_01});
    background-size: 100% 100%;
    display: flex;
    margin: 0 auto;
    align-items: center;
`;

export const ComingSoonBox = styled.div`
    border: 1px solid white !important;
    padding: 15px;
    display: block;
    margin: 0 auto; 
    text-align: center;
`;

export const ComingSoon = styled(IonTitle)`
    display: flex;
    margin: 0 auto; 
    align-items: center;
    color: white !important;
`;
