import { useIonRouter } from '@ionic/react';
import React, { useCallback, useMemo } from 'react';
import { RouteComponentProps, useRouteMatch } from 'react-router';
import { Drawer } from 'src/components';
import { STATUS } from 'src/utility';
import { CardDetailsCollectProps } from './CardDetailsCollectProps';
import { CardDetailsSingle } from './CardDetailsSingle';
import { CardDetailsSlider } from './CardDetailsSlider';

type IProps = RouteComponentProps<{ metaCardId: string }>;
const CardDetails: React.FC<IProps> = (props) => {
    const {
        params: { zoneId },
    } = useRouteMatch<{ zoneId: string; tab: string }>();

    const { status, metaCardId, cardIds, error } = CardDetailsCollectProps(props);

    const { push } = useIonRouter();

    const handleClose = useCallback(() => {
        push(`/zone/${zoneId}/collect/cards`, 'root');
    }, [push, zoneId]);

    const rendContent = useMemo(
        () =>
            cardIds.length ? (
                <CardDetailsSlider cardIds={cardIds}></CardDetailsSlider>
            ) : (
                <CardDetailsSingle metaCardId={metaCardId}></CardDetailsSingle>
            ),
        [cardIds, metaCardId],
    );

    const content = useMemo(() => {
        switch (status) {
            case STATUS.FAILED:
                return <p>{error?.message}</p>;
            case STATUS.LOADING:
            case STATUS.IDLE:
            default:
                return rendContent;
        }
    }, [error?.message, rendContent, status]);

    return (
        <Drawer onClose={handleClose} title="Collect">
            {{ body: content }}
        </Drawer>
    );
};
export default CardDetails;
