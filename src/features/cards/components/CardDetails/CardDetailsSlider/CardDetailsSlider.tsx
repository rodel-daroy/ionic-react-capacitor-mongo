import { IonIcon, IonModal, IonRippleEffect, IonSlide, IonSlides } from '@ionic/react';
import { caretBackOutline, caretForwardOutline } from 'ionicons/icons';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';
import { RootState } from 'src/boot/types';
import { selectCardById, selectCardsByIds, selectMetaCardById } from 'src/features/cards/cardsSlice';
import { CardDetailsBuy } from '../CardDetailsBuy';
import { CardDetailsPrice } from '../CardDetailsPrice';
import { CardDetailsProperties } from '../CardDetailsProperties';
import { CardTitle } from '../CardTitle';
import { CardDetailsSell } from './CardDetailsSell';
import {
    Footer,
    SlideBackBtn,
    SlideFowardBtn,
    SlidePageIndicator,
    SliderWrapper,
    SellButton,
    EditButton,
    CurrentPrice,
    BuyButton,
    EditSaleWraper,
} from './styles';

type IProps = { cardIds: string[] };

export const CardDetailsSlider: React.FC<IProps> = ({ cardIds }: IProps) => {
    const slidesRef = useRef<HTMLIonSlidesElement>(null);
    const cards = useSelector((state: RootState) => selectCardsByIds(state, cardIds));

    const [currentCardId, setCurrentCardId] = useState(cardIds[0]);
    const currentCard = useSelector((state: RootState) => selectCardById(state, currentCardId));
    const currentMetaCard = useSelector(
        (state: RootState) => currentCard && selectMetaCardById(state, currentCard?.metaCard._id),
    );

    const [disablePrevBtn, setDisablePrevBtn] = useState(true);
    const [disableNextBtn, setDisableNextBtn] = useState(false);
    const [showBuyModal, setShowBuyModal] = useState(false);
    const [showSellModal, setShowSellModal] = useState(false);

    const slideNext = useCallback(async () => await slidesRef.current?.slideNext(), []);
    const slidePrev = useCallback(async () => await slidesRef.current?.slidePrev(), []);

    const handleSlideChange = useCallback(async () => {
        if (!slidesRef.current) return;

        const isBeginning = await slidesRef.current.isBeginning();
        const isEnd = await slidesRef.current.isEnd();

        setDisablePrevBtn(isBeginning);
        setDisableNextBtn(isEnd);

        const currrentIndex = await slidesRef.current.getActiveIndex();
        // eslint-disable-next-line security/detect-object-injection
        setCurrentCardId(cardIds[currrentIndex]);
    }, [cardIds]);

    const renderHeader = useMemo(() => {
        return (
            <IonSlides onIonSlideDidChange={handleSlideChange} ref={slidesRef} options={{ onlyExternal: false }}>
                {cards.map((card) => (
                    <IonSlide key={card._id}>
                        {cards.length > 1 && (
                            <SlidePageIndicator>
                                {cardIds.indexOf(currentCardId) + 1}/{cards.length}
                            </SlidePageIndicator>
                        )}
                        <CardTitle metaCardId={card.metaCard._id} cardId={card._id} />
                        {cards.length > 1 && (
                            <React.Fragment>
                                <SlideBackBtn hidden={disablePrevBtn} onClick={slidePrev}>
                                    <IonIcon icon={caretBackOutline}></IonIcon>
                                </SlideBackBtn>
                                <SlideFowardBtn hidden={disableNextBtn} onClick={slideNext}>
                                    <IonIcon icon={caretForwardOutline}></IonIcon>
                                </SlideFowardBtn>
                            </React.Fragment>
                        )}
                    </IonSlide>
                ))}
            </IonSlides>
        );
    }, [cardIds, cards, currentCardId, disableNextBtn, disablePrevBtn, handleSlideChange, slideNext, slidePrev]);

    const renderFooter = useMemo(() => {
        return (
            currentCard && (
                <Footer>
                    <React.Fragment>
                        {currentCard.onSale && (
                            <EditSaleWraper>
                                <CurrentPrice>
                                    <FormattedMessage
                                        defaultMessage="Your price"
                                        description="Collect: Owned card details, label for edit/withdraw"
                                    />
                                    {` ${currentCard.price} IGC`}
                                </CurrentPrice>
                                <EditButton onClick={() => setShowSellModal(true)}>
                                    <FormattedMessage
                                        defaultMessage="Edit/Withdraw"
                                        description="Collect: Owned card details, label for edit/withdraw"
                                    />
                                    <IonRippleEffect></IonRippleEffect>
                                </EditButton>
                            </EditSaleWraper>
                        )}
                        <SellButton hidden={currentCard.onSale} onClick={() => setShowSellModal(true)}>
                            <FormattedMessage
                                defaultMessage="Sell Card"
                                description="Collect: Owned card details, label for selling"
                            />
                            <IonRippleEffect></IonRippleEffect>
                        </SellButton>
                        <BuyButton
                            disabled={!currentMetaCard?.userSpecificFields.onSaleByOthers}
                            onClick={() => setShowBuyModal(true)}
                        >
                            <FormattedMessage
                                defaultMessage="Buy Card"
                                description="Collect: Not owned card details, label for buying"
                            />
                            <IonRippleEffect></IonRippleEffect>
                        </BuyButton>
                    </React.Fragment>
                    <IonModal isOpen={showBuyModal} onDidDismiss={() => setShowBuyModal(false)}>
                        <CardDetailsBuy
                            metaCardId={currentCard.metaCard._id}
                            onClose={() => setShowBuyModal(false)}
                        ></CardDetailsBuy>
                    </IonModal>
                    <IonModal isOpen={showSellModal} onDidDismiss={() => setShowSellModal(false)}>
                        <CardDetailsSell
                            cardId={currentCard._id}
                            onClose={() => setShowSellModal(false)}
                        ></CardDetailsSell>
                    </IonModal>
                </Footer>
            )
        );
    }, [currentCard, currentMetaCard?.userSpecificFields.onSaleByOthers, showBuyModal, showSellModal]);

    return (
        <React.Fragment>
            <SliderWrapper>
                {renderHeader}
                {currentCard && (
                    <React.Fragment>
                        <CardDetailsProperties metaCardId={currentCard.metaCard._id} />
                        {/* Disabled the Athlete Info */}
                        {/*<CardDetailsAthlete metaCardId={currentSlide.card.metaCard._id} />*/}
                        <CardDetailsPrice metaCardId={currentCard.metaCard._id} />
                    </React.Fragment>
                )}
            </SliderWrapper>
            {renderFooter}
        </React.Fragment>
    );
};
