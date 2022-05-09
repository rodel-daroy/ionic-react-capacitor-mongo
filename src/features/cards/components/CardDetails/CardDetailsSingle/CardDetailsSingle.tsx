import { IonModal, IonRippleEffect } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useAppDispatch } from 'src/boot/store';
import { fetchCardsOnSaleByMetaCardId } from 'src/features/cards/cardsSlice';
import { CardDetailsPrice } from '../CardDetailsPrice';
import { CardDetailsProperties } from '../CardDetailsProperties';
import { CardTitle } from '../CardTitle';
import { CardDetailsBuy } from '../CardDetailsBuy';
import { Content, Footer, BuyButton } from './styles';

type IProps = { metaCardId: string };

export const CardDetailsSingle: React.FC<IProps> = ({ metaCardId }: IProps) => {
    const dispatch = useAppDispatch();
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        void dispatch(fetchCardsOnSaleByMetaCardId(metaCardId));
    }, [dispatch, metaCardId]);

    return (
        <React.Fragment>
            <Content>
                <CardTitle metaCardId={metaCardId} />
                <CardDetailsProperties metaCardId={metaCardId} />
                <CardDetailsPrice metaCardId={metaCardId} />
                <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
                    <CardDetailsBuy metaCardId={metaCardId} onClose={() => setShowModal(false)}></CardDetailsBuy>
                </IonModal>
            </Content>
            <Footer>
                <BuyButton onClick={() => setShowModal(true)}>
                    <FormattedMessage
                        defaultMessage="Buy"
                        description="Collect: Not owned card details, label for buying"
                    />
                    <IonRippleEffect></IonRippleEffect>
                </BuyButton>
            </Footer>
        </React.Fragment>
    );
};
