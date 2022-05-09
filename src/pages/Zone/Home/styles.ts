import styled from 'styled-components';
import { IonText, IonTitle, IonImg, IonItemDivider } from '@ionic/react';
import { zone_title_background } from '../../../assets/images';

export const HomeWrapperOuter = styled.div`
    display: block;
    background-color: white !important;
`;

export const HomeWrapperInner = styled.div`
    margin: 0 auto;
    padding: 10px;
`;

export const ZoneTitleBackground = styled.div`
    display: flex;
    margin: 0 auto;
    min-height: 200px;
    background: url(${zone_title_background});
`;

export const ZoneTitle = styled(IonTitle)`
    display: flex;
    margin: 0 auto;
    text-align: center;
    color: white;
`;

export const ImageWrapper = styled.div`
    display: flex;
    margin: 0 auto;
`;

export const DFBImage = styled.img`
    max-height: 80px;
    max-width: 160px;
    width: 100%;
    display: flex;
    margin: 0 auto;
`;

export const MetaPackWrapper = styled.ul`
    list-style: none;
    padding: 0;
    white-space: nowrap;
    scroll-snap-type: x mandatory;
    overflow-x: scroll;
`;

export const MetaPackItemContainer = styled.li`
    display: inline-block;
    position: relative;
    margin: 5px;
    width: calc(40% - 5px);
    cursor: pointer;
    border-radius: 3px;
    scroll-snap-align: center;
`;

export const MetaPackItem = styled.div`
    height: 250px;
    background-color: lightgrey;
    display: flex;
    margin: 0 auto;
    align-items: center;
`;

export const MetaPackImage = styled.img`
    display: flex;
    margin: 0 auto;
    padding: 5px;
    max-height: 220px;
`;

export const MetaPackNameContainer = styled.div`
    height: 50px;
`;

export const MetaPackName = styled(IonTitle)`
    font-size: 1em;
    text-align: left;
    padding: 0px;
    word-wrap: break-word !important;
    text-overflow: inherit !important;
    white-space: normal !important;
    color: black !important;
`;

export const StatisticsWrapper = styled.div`
    display: flex;
`;

export const Statistics = styled.div`
    margin: 5px;
    padding: 5px;
    background-color: #282828;
    display: block;
    width: 50%;
    min-width: 100px;
    min-height: 150px;
    border-radius: 4px;
`;

export const StatisticsText = styled(IonText)`
    color: lightgray;
    font-size: 1em;
    text-align: left;
`;

export const StatisticsChart = styled.img`
    min-width: 100px;
    min-height: 70px;
    width: 100%;
    height: 100%;
`;

export const CardListingsSection = styled.ul`
    padding: 0px;
`;

export const CardListingWrapper = styled.li`
    list-style: none;
`;

export const CardListing = styled.div`
    display: flex;
    align-items: center;
    padding-top: 15px;
`;

export const CardBorder = styled(IonItemDivider)`
    min-height: 1px;
    margin-top: 10px;
`;

export const CardImageWrapper = styled.div``;

export const CardImage = styled(IonImg)`
    max-height: 110px;
    max-width: 80px;
    height: 110px;
    width: 80px;
    margin: 0px 10px;
`;

export const CardStatsWrapper = styled.div`
    display: flex;
    margin: 0 auto;
    justify-content: space-between;
    width: 100%;
    padding: 25px;
`;

export const CardStatsLeft = styled.div`
    display: block;
    text-align: left;
    width: 50%;
`;

export const CardStatsRight = styled.div`
    display: block;
    text-align: right;
    width: 50%;
`;

export const CardName = styled(IonText)`
    font-size: 1.1em;
    font-weight: 400;
    display: block;
    color: black !important;
`;

export const CardPosition = styled(IonText)`
    font-size: 0.9em;
    font-weight: 400;
    color: black !important;
`;

export const CardEditionWrapper = styled.div`
    padding: 2px;
    border: 1px solid black;
`;

export const CardEdition = styled(IonText)`
    font-size: 1.1em;
    font-weight: 400;
    display: block;
    color: black !important;
`;

export const CardMinPrice = styled(IonText)`
    font-size: 0.9em;
    font-weight: 400;
    color: black !important;
`;
