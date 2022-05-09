import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
    ZoneSelectionPageWrapper,
    ZoneSelectionHeader,
    ZonesContainer,
    WelcomeMessageWrapper,
    WelcomeMessage,
    SubHeader,
    LogoSmall,
    LogoWrapper,
    DiscoverButton,
    Fanzone,
} from './styles';
import { IonModal, useIonRouter } from '@ionic/react';
import { fanzone_logo_white } from '../../../assets/images/icons';

import { ExploreZonesModal } from './ExploreZonesModal';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'src/boot/store';
import { fetchZones, selectRootZoneIds } from '../appDataSlice';
import { RootZone } from './RootZone';

export const ZoneSelection: React.FC = () => {
    const dispatch = useAppDispatch();
    const { push } = useIonRouter();
    const isMountedRef = useRef(false);
    const [showModal, setShowModal] = useState(false);
    const rootZoneIds = useSelector(selectRootZoneIds);

    const renderedZoneCards = useMemo(() => rootZoneIds.map((id) => <RootZone key={id} zoneId={id} />), [rootZoneIds]);

    const onSelectSubZone = useCallback(
        (zoneId: string) => {
            setShowModal(false);
            push(`/zone/${zoneId}/home`);
        },
        [push],
    );

    const closeModal = useCallback(() => {
        if (isMountedRef) {
            setShowModal(false);
        }
    }, [isMountedRef, setShowModal]);

    useEffect(() => {
        isMountedRef.current = true;

        void dispatch(fetchZones());

        return () => {
            isMountedRef.current = false;
        };
    }, [dispatch]);

    return (
        <React.Fragment>
            <ZoneSelectionPageWrapper>
                <ZonesContainer>
                    <ZoneSelectionHeader>
                        <WelcomeMessageWrapper>
                            <WelcomeMessage>Welcome</WelcomeMessage>
                            <WelcomeMessage>
                                To <Fanzone>Fanzone</Fanzone>
                            </WelcomeMessage>
                            <SubHeader>The platform for digital collectibles and ultimate fan experience</SubHeader>
                            <LogoWrapper>
                                <LogoSmall src={fanzone_logo_white} />
                            </LogoWrapper>
                        </WelcomeMessageWrapper>
                    </ZoneSelectionHeader>
                    {renderedZoneCards}
                </ZonesContainer>

                <DiscoverButton onClick={() => setShowModal(true)}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M13.0394 11.6503C12.8469 10.9316 12.1081 10.5051 11.3895 10.6977C10.6708 10.8902 10.2443 11.629 10.4368 12.3476C10.6294 13.0663 11.3681 13.4928 12.0868 13.3002C12.8055 13.1077 13.232 12.369 13.0394 11.6503Z"
                            fill="white"
                        />
                        <path
                            d="M0.460534 15.0205C2.12679 21.239 8.54172 24.9427 14.7603 23.2765C20.9788 21.6102 24.6825 15.1953 23.0162 8.97673C21.35 2.75819 14.935 -0.945476 8.71648 0.720775C2.49795 2.38703 -1.20572 8.80197 0.460534 15.0205ZM13.6436 8.69868L19.4382 16.4441L9.83315 15.2986L4.03852 7.5531L13.6436 8.69868Z"
                            fill="white"
                        />
                    </svg>
                </DiscoverButton>

                <IonModal isOpen={showModal} swipeToClose={true} onWillDismiss={closeModal} cssClass="explore-zones">
                    <ExploreZonesModal onSelect={onSelectSubZone} />
                </IonModal>
            </ZoneSelectionPageWrapper>
        </React.Fragment>
    );
};
