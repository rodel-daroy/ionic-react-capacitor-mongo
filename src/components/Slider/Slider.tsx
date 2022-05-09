import { IonButtons, IonContent, IonHeader, IonToolbar } from '@ionic/react';
import React, { ReactNode, useCallback, useRef, useState } from 'react';
import { StyledSlides, StyledPage, OnboardProgress, NextButton, BackButton } from './styles';

interface IProps {
    children: {
        slides?: ReactNode;
    };
    onFinish?: () => void;
}

export const Slider: React.FC<IProps> = (props: IProps) => {
    const { children, onFinish } = props;

    const slidesRef = useRef<HTMLIonSlidesElement>(null);

    const [currentSlide, setCurrentSlide] = useState(0);
    const [numSlides, setNumSlides] = useState(-1);
    const [disablePrevBtn, setDisablePrevBtn] = useState(true);
    const [disableNextBtn, setDisableNextBtn] = useState(false);
    const [disableFinishBtn, setDisableFinishBtn] = useState(true);

    const slideNext = useCallback(async () => await slidesRef.current?.slideNext(), []);
    const slidePrev = useCallback(async () => await slidesRef.current?.slidePrev(), []);

    const handleSlideChange = useCallback(async () => {
        if (!slidesRef.current) return;

        if (numSlides === -1) setNumSlides(await slidesRef.current.length());

        setCurrentSlide(await slidesRef.current.getActiveIndex());

        const isBeginning = await slidesRef.current.isBeginning();
        const isEnd = await slidesRef.current.isEnd();

        setDisablePrevBtn(isBeginning);
        setDisableNextBtn(isEnd);
        setDisableFinishBtn(!isEnd);
    }, [numSlides]);

    return (
        <StyledPage>
            <IonHeader>
                <OnboardProgress value={currentSlide / numSlides}></OnboardProgress>
            </IonHeader>
            <IonContent fullscreen>
                <StyledSlides ref={slidesRef} onIonSlideDidChange={handleSlideChange}>
                    {children.slides}
                </StyledSlides>
            </IonContent>
            <IonToolbar>
                <IonButtons slot="start">
                    <BackButton hidden={disablePrevBtn} onClick={slidePrev}>
                        Back
                    </BackButton>
                </IonButtons>
                <IonButtons slot="end">
                    <NextButton hidden={disableNextBtn} onClick={slideNext}>
                        Next
                    </NextButton>
                    <NextButton hidden={disableFinishBtn} onClick={onFinish}>
                        Finish
                    </NextButton>
                </IonButtons>
            </IonToolbar>
        </StyledPage>
    );
};
