import { IonAlert, IonButtons, IonContent, IonToolbar, useIonRouter } from '@ionic/react';
import React, { useCallback, useMemo, useRef, useState } from 'react';

import {
    StyledSlide,
    StyledSlideHeader,
    StyledSlideImage,
    StyledSlideMoreInfo,
    StyledSlides,
    StyledPage,
    StyledButton,
} from './styles';

import slide_1 from 'src/assets/images/tutorial/slide_1.png';
import slide_2 from 'src/assets/images/tutorial/slide_2.png';
import slide_3 from 'src/assets/images/tutorial/slide_3.png';
import slide_4 from 'src/assets/images/tutorial/slide_4.png';
import slide_5 from 'src/assets/images/tutorial/slide_5.png';
import slide_6 from 'src/assets/images/tutorial/slide_6.png';
import slide_7 from 'src/assets/images/tutorial/slide_7.png';
import slide_8 from 'src/assets/images/tutorial/slide_8.png';
import slide_9 from 'src/assets/images/tutorial/slide_9.png';
import { updateUserData } from 'src/features/userData';
import { useAppDispatch } from 'src/boot/store';

const slides = [
    { header: '1/9 Who is depicted on the card?', image: slide_1 },
    { header: '2/9 Do I own this card already?', image: slide_2 },
    { header: '3/9 How can I share this card?', image: slide_3 },
    { header: '4/9 How popular is this card?', image: slide_4 },
    { header: '5/9 Where do I find the card details?', image: slide_5 },
    { header: '6/9 How do I sell this card?', image: slide_6 },
    { header: '7/9 Which price to set?', image: slide_7 },
    { header: '8/9 Can I modify the card’s price?', image: slide_8 },
    { header: '9/9 Swipe right, now it’s your turn!', image: slide_9 },
];

export const Tutorial: React.FC = () => {
    const dispatch = useAppDispatch();
    const router = useIonRouter();
    const slidesRef = useRef<HTMLIonSlidesElement>(null);
    const zoneId = '6065be75181eefb288260fc9';

    const [showAlert, setShowAlert] = useState(false);
    const [disablePrevBtn, setDisablePrevBtn] = useState(true);
    const [disableNextBtn, setDisableNextBtn] = useState(false);
    const [disableFinishBtn, setDisableFinishBtn] = useState(true);

    const slideNext = useCallback(async () => await slidesRef.current?.slideNext(), []);

    const slidePrev = useCallback(async () => await slidesRef.current?.slidePrev(), []);

    const handleSlideChange = useCallback(async () => {
        if (!slidesRef.current) return;

        const isBeginning = await slidesRef.current.isBeginning();
        const isEnd = await slidesRef.current.isEnd();

        setDisablePrevBtn(isBeginning);
        setDisableNextBtn(isEnd);
        setDisableFinishBtn(!isEnd);
    }, []);

    const renderedZoneCards = useMemo(
        () =>
            slides.map((slide, index) => (
                <StyledSlide key={index}>
                    <StyledSlideHeader>{slide.header}</StyledSlideHeader>
                    <StyledSlideImage src={slide.image} />
                    <StyledSlideMoreInfo>Find more answers in the FAQ.</StyledSlideMoreInfo>
                </StyledSlide>
            )),
        [],
    );

    const endTutorial = useCallback(() => {
        setShowAlert(false);

        void dispatch(updateUserData({ tutorialFinished: true })).then(() =>
            router.push(`/zone/${zoneId}/collect/packs`, 'root'),
        );
    }, [dispatch, router]);

    return (
        <StyledPage>
            <IonContent fullscreen>
                <StyledSlides ref={slidesRef} onIonSlideDidChange={handleSlideChange}>
                    {renderedZoneCards}
                </StyledSlides>
                <IonAlert
                    isOpen={showAlert}
                    onDidDismiss={endTutorial}
                    header={'Congratulations 🎉'}
                    message={'Get your free onboarding pack.'}
                    buttons={['Open Pack']}
                />
            </IonContent>
            <IonToolbar>
                <IonButtons slot="start">
                    <StyledButton hidden={disablePrevBtn} onClick={slidePrev}>
                        Back
                    </StyledButton>
                </IonButtons>
                <IonButtons slot="end">
                    <StyledButton hidden={disableNextBtn} onClick={slideNext}>
                        Next
                    </StyledButton>
                    <StyledButton hidden={disableFinishBtn} onClick={() => setShowAlert(true)}>
                        Finish
                    </StyledButton>
                </IonButtons>
            </IonToolbar>
        </StyledPage>
    );
};

export default Tutorial;
