import { IonIcon } from '@ionic/react';
import { bookmarkOutline } from 'ionicons/icons';
import React from 'react';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { InformationWidget } from 'src/components';
import { addBookmarkedCard } from 'src/features/userData';
import { StyledCardBookmark } from './style';

interface IProps {
    metaCardId: string;
}
export const CardBookmark: React.FC<IProps> = ({ metaCardId }: IProps) => {
    const intl = useIntl();
    const dispatch = useDispatch();

    const content = intl.formatMessage({
        defaultMessage: 'Some Info Text',
        description: 'Information on the Bookmark button within the Card-Page',
    });

    const handleBookmark = () => {
        dispatch(addBookmarkedCard(metaCardId));
    };

    return (
        <>
            <StyledCardBookmark onClick={handleBookmark}>
                <IonIcon icon={bookmarkOutline} />
            </StyledCardBookmark>
            <InformationWidget content={content} />
        </>
    );
};
