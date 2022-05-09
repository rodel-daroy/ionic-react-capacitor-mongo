import { IonLabel, IonPage, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, useIonRouter } from '@ionic/react';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router';
import { Route } from 'react-router-dom';
import { useAppDispatch } from 'src/boot/store';
import { RootState } from 'src/boot/types';
import {
    fetchMetaCardsByZoneId,
    fetchZones,
    LazyCardDetails,
    LazyShopListItemDetailed,
    selectAllZones,
    selectCurrentZone,
    setCurrentZone,
} from 'src/features';
import { LazyCollect } from './Collect';
import { LazyHome } from './Home';
import { LazyPlay } from './Play';
import { LazyShop } from './Shop';
import { bundesliga } from '../../assets/images/icons';
import { Bundesliga, Icon } from './styles';

const tabs = (zoneId: string) => {
    return (
        <IonTabBar slot="bottom" hidden={!zoneId}>
            <IonTabButton tab="home" href={`/zone/${zoneId}/home`}>
                <Bundesliga src={bundesliga} />
            </IonTabButton>
            <IonTabButton tab="collect" href={`/zone/${zoneId}/collect`}>
                <Icon viewBox="0 0 15 21">
                    <path
                        className="icon"
                        d="M0 0.988695V19.8432C0 19.9847 0.050797 20.1204 0.141216 20.2205C0.231636 20.3206 0.354271 20.3768 0.482143 20.3768H13.6607C13.7886 20.3768 13.9112 20.3206 14.0016 20.2205C14.0921 20.1204 14.1429 19.9847 14.1429 19.8432V0.988695C14.1429 0.847171 14.0921 0.711444 14.0016 0.611371C13.9112 0.511298 13.7886 0.455078 13.6607 0.455078H0.482143C0.354271 0.455078 0.231636 0.511298 0.141216 0.611371C0.050797 0.711444 0 0.847171 0 0.988695ZM7.71429 12.5504H3.21429V11.1274H7.71429V12.5504ZM10.9286 8.99295H3.21429V7.56997H10.9286V8.99295ZM10.9286 5.43551H3.21429V4.01253H10.9286V5.43551Z"
                    ></path>
                </Icon>
                <IonLabel>Collect</IonLabel>
            </IonTabButton>
            <IonTabButton tab="play" href={`/zone/${zoneId}/play`}>
                <Icon viewBox="0 0 24 21">
                    <path
                        className="icon"
                        d="M23.7224 16.2357L21.7165 4.5812C21.2617 2.29706 20.5357 0.562012 17.1987 0.562012H6.62279C3.2344 0.562012 2.5598 2.29706 2.10493 4.5812L0.102698 16.2357C-0.256677 18.1672 0.330131 19.703 1.81589 20.3008C3.30165 20.8986 4.46654 19.9787 5.29721 18.1842L6.08886 16.4565C6.15742 16.307 6.26224 16.1814 6.39167 16.0937C6.52109 16.0059 6.67005 15.9595 6.82199 15.9595H17.0015C17.1535 15.9595 17.3024 16.0059 17.4319 16.0937C17.5613 16.1814 17.6661 16.307 17.7347 16.4565L18.5263 18.1842C19.3549 19.9787 20.5224 20.9014 22.0076 20.3008C23.4929 19.7002 24.0781 18.1672 23.7224 16.2357ZM10.6786 9.61935H8.21431V12.3365H6.57145V9.61935H4.10716V7.80788H6.57145V5.09068H8.21431V7.80788H10.6786V9.61935ZM14.1697 9.84578C13.9666 9.84578 13.7681 9.77938 13.5992 9.65498C13.4304 9.53057 13.2988 9.35375 13.221 9.14688C13.1433 8.94 13.123 8.71236 13.1626 8.49274C13.2022 8.27312 13.3 8.07139 13.4436 7.91305C13.5872 7.75471 13.7702 7.64689 13.9693 7.6032C14.1685 7.55952 14.375 7.58194 14.5626 7.66763C14.7502 7.75332 14.9106 7.89843 15.0234 8.08462C15.1362 8.2708 15.1965 8.48969 15.1965 8.71361C15.1965 9.01388 15.0883 9.30185 14.8957 9.51418C14.7032 9.7265 14.442 9.84578 14.1697 9.84578ZM16.4286 12.3365C16.2255 12.3365 16.027 12.2701 15.8581 12.1457C15.6893 12.0213 15.5577 11.8445 15.48 11.6376C15.4023 11.4308 15.3819 11.2031 15.4215 10.9835C15.4612 10.7639 15.5589 10.5622 15.7025 10.4038C15.8461 10.2455 16.0291 10.1377 16.2283 10.094C16.4275 10.0503 16.6339 10.0727 16.8215 10.1584C17.0091 10.2441 17.1695 10.3892 17.2823 10.5754C17.3952 10.7616 17.4554 10.9805 17.4554 11.2044C17.4554 11.5047 17.3472 11.7926 17.1546 12.0049C16.9621 12.2173 16.7009 12.3365 16.4286 12.3365ZM16.4286 7.35501C16.2255 7.35501 16.027 7.28861 15.8581 7.16421C15.6893 7.0398 15.5577 6.86298 15.48 6.65611C15.4023 6.44923 15.3819 6.22159 15.4215 6.00197C15.4612 5.78235 15.5589 5.58062 15.7025 5.42228C15.8461 5.26395 16.0291 5.15612 16.2283 5.11243C16.4275 5.06875 16.6339 5.09117 16.8215 5.17686C17.0091 5.26255 17.1695 5.40766 17.2823 5.59385C17.3952 5.78003 17.4554 5.99893 17.4554 6.22285C17.4554 6.52312 17.3472 6.81109 17.1546 7.02341C16.9621 7.23573 16.7009 7.35501 16.4286 7.35501ZM18.6875 9.84578C18.4844 9.84578 18.2859 9.77938 18.1171 9.65498C17.9482 9.53057 17.8166 9.35375 17.7389 9.14688C17.6612 8.94 17.6408 8.71236 17.6805 8.49274C17.7201 8.27312 17.8179 8.07139 17.9615 7.91305C18.1051 7.75471 18.288 7.64689 18.4872 7.6032C18.6864 7.55952 18.8928 7.58194 19.0805 7.66763C19.2681 7.75332 19.4284 7.89843 19.5413 8.08462C19.6541 8.2708 19.7143 8.48969 19.7143 8.71361C19.7143 9.01388 19.6061 9.30185 19.4136 9.51418C19.221 9.7265 18.9598 9.84578 18.6875 9.84578Z"
                    ></path>
                </Icon>
                <IonLabel>Play</IonLabel>
            </IonTabButton>
            <IonTabButton tab="shop" href={`/zone/${zoneId}/shop`}>
                <Icon viewBox="0 0 17 21">
                    <path
                        className="icon"
                        d="M16.2063 5.82668H12.7448V5.29307C12.7438 3.94742 12.2783 2.65533 11.4473 1.69189C10.6163 0.72845 9.48543 0.169759 8.2955 0.134766H8.06814C6.87821 0.169759 5.74736 0.72845 4.91635 1.69189C4.08534 2.65533 3.61981 3.94742 3.61888 5.29307V5.82668H0.157343C0.115613 5.82668 0.0755921 5.84542 0.0460846 5.87878C0.0165772 5.91214 0 5.95738 0 6.00455V19.345C0 19.5337 0.0663085 19.7147 0.184338 19.8481C0.302368 19.9815 0.462451 20.0565 0.629371 20.0565H15.7343C15.9012 20.0565 16.0613 19.9815 16.1793 19.8481C16.2973 19.7147 16.3636 19.5337 16.3636 19.345V6.00455C16.3636 5.95738 16.3471 5.91214 16.3176 5.87878C16.288 5.84542 16.248 5.82668 16.2063 5.82668ZM5.19231 5.33753C5.19231 3.47699 6.50651 1.93306 8.15232 1.91349C8.54727 1.90956 8.939 1.99404 9.30492 2.16208C9.67085 2.33011 10.0037 2.57837 10.2844 2.89254C10.565 3.20671 10.7879 3.58057 10.9401 3.99257C11.0924 4.40457 11.1709 4.84657 11.1713 5.29307V5.82668H5.19231V5.33753ZM12.5874 9.38413C12.5874 10.705 12.1233 11.9718 11.297 12.9058C10.4708 13.8398 9.35025 14.3646 8.18182 14.3646C7.01338 14.3646 5.8928 13.8398 5.06659 12.9058C4.24038 11.9718 3.77622 10.705 3.77622 9.38413V7.96115H5.03497V9.38413C5.03497 10.3276 5.36651 11.2325 5.95666 11.8996C6.54681 12.5668 7.34722 12.9416 8.18182 12.9416C9.01642 12.9416 9.81683 12.5668 10.407 11.8996C10.9971 11.2325 11.3287 10.3276 11.3287 9.38413V7.96115H12.5874V9.38413Z"
                    ></path>
                </Icon>
                <IonLabel>Shop</IonLabel>
            </IonTabButton>
        </IonTabBar>
    );
};

const Zone: React.FC = () => {
    const dispatch = useAppDispatch();
    const router = useIonRouter();
    const match = useRouteMatch<{ zoneId: string }>();
    const currentZone = useSelector(selectCurrentZone);
    const zones = useSelector(selectAllZones);
    const initialized = useSelector((state: RootState) => state.appData.initialized);

    useEffect(() => {
        if (!zones.length) void dispatch(fetchZones());
    }, [dispatch, zones]);

    useEffect(() => {
        const zoneId = match.params.zoneId;
        if (!zones.length) return; // fetchZones did not return yet
        if (!currentZone || currentZone._id !== zoneId) {
            dispatch(setCurrentZone(zoneId));
        }
    }, [currentZone, dispatch, initialized, zones, match, router]);

    /* We preload meta-cards to display collection a bit faster */
    useEffect(() => {
        if (currentZone) void dispatch(fetchMetaCardsByZoneId(currentZone._id));
    }, [currentZone, dispatch]);

    return (
        <IonPage>
            <IonTabs>
                <IonRouterOutlet>
                    <Route exact path="/zone/:zoneId/:tab(home)" component={LazyHome} />
                    <Route exact path="/zone/:zoneId/:tab(collect)/:segment?" component={LazyCollect} />
                    <Route exact path="/zone/:zoneId/:tab(collect)/:segment/:metaCardId" component={LazyCardDetails} />
                    <Route exact path="/zone/:zoneId/:tab(shop)/:segment?" component={LazyShop} />
                    <Route
                        exact
                        path="/zone/:zoneId/:tab(shop)/:segment/:shopItemId"
                        component={LazyShopListItemDetailed}
                    />
                    <Route exact path="/zone/:zoneId/:tab(play)" component={LazyPlay} />
                </IonRouterOutlet>
                {tabs(match.params.zoneId)}
            </IonTabs>
        </IonPage>
    );
};
export default Zone;
