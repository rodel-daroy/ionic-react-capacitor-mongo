import { IonAlert, useIonRouter } from '@ionic/react';
import React, { useCallback, useMemo, useState } from 'react';
import { useAppDispatch } from 'src/boot/store';
import { Slider } from 'src/components/Slider';
import { updateUserData } from 'src/features';
import { Wellcome } from './Slides/Wellcome';
import { Slide1 } from './Slides/Slide1';
import { Slide2 } from './Slides/Slide2';
import { Slide3 } from './Slides/Slide3';

export const Onboard: React.FC = () => {
    const dispatch = useAppDispatch();
    const router = useIonRouter();

    const [showWellcome, setShowWellcome] = useState(true);
    const [showAlert, setShowAlert] = useState(false);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');

    const goToTutorial = useCallback(() => {
        setShowAlert(false);

        void dispatch(updateUserData({ firstName, lastName, username }));

        router.push(`/tutorial`);
    }, [dispatch, firstName, lastName, router, username]);

    const renderSlides = useMemo(() => {
        return (
            <React.Fragment>
                <Slide1 setFirstname={setFirstName} setLastname={setLastName}></Slide1>
                <Slide2 setUsername={setUsername}></Slide2>
                <Slide3></Slide3>
            </React.Fragment>
        );
    }, []);

    return showWellcome ? (
        <Wellcome onNext={() => setShowWellcome(false)} />
    ) : (
        <React.Fragment>
            <Slider onFinish={() => setShowAlert(true)}>{{ slides: renderSlides }}</Slider>
            <IonAlert
                isOpen={showAlert}
                onDidDismiss={goToTutorial}
                header={"All set! Let's Go"}
                message={'Swipe through FANZONE main functionalities'}
                buttons={['Go']}
            />
        </React.Fragment>
    );
};

export default Onboard;
