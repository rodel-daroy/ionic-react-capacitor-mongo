import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/boot/types';
import { selectChildZoneIds, selectZoneById } from '../../appDataSlice';
import { LeagueListItem } from '../ZoneListItem';
import { LeaguesList, ZoneName, ImageWrapper, ComingSoonImage, ComingSoonBox, ComingSoon } from './styles';

interface IProps {
    zoneId: string;
}
export const RootZone: React.FC<IProps> = ({ zoneId }: IProps) => {
    const rootZone = useSelector((state: RootState) => selectZoneById(state, zoneId));
    const childZoneIds = useSelector((state: RootState) => selectChildZoneIds(state, zoneId));

    return (
        <div>
            <ZoneName>{rootZone?.name}</ZoneName>
            <ImageWrapper>
                <ComingSoonImage>
                    <ComingSoonBox>
                        <ComingSoon>Coming</ComingSoon>
                        <ComingSoon>Soon!</ComingSoon>
                    </ComingSoonBox>
                </ComingSoonImage>
            </ImageWrapper>
            <LeaguesList>
                {childZoneIds.map((zoneId) => (
                    <LeagueListItem key={zoneId} zoneId={zoneId} />
                ))}
            </LeaguesList>
        </div>
    );
};
