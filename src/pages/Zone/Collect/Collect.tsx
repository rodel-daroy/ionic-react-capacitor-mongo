import React, { useEffect, useMemo } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { callFunction, CardsSegment, PacksSegment } from 'src/features';
import { useAppDispatch } from 'src/boot/store';
import { CollectHeader } from './CollectHeader';
import { StyledPage } from './styles';

enum COLLECT_SEGMENT {
    CARDS = 'cards',
    PACKS = 'packs',
}
const Collect: React.FC = () => {
    const dispatch = useAppDispatch();

    const match = useRouteMatch<{ zoneId: string; segment?: COLLECT_SEGMENT }>();

    const currentSegment: COLLECT_SEGMENT = useMemo(() => {
        if (match.params.segment && Object.values(COLLECT_SEGMENT).includes(match.params.segment))
            return match.params.segment;

        const val = localStorage.getItem('current_collect_segment');
        if (val && Object.values(COLLECT_SEGMENT).includes(val as COLLECT_SEGMENT)) return val as COLLECT_SEGMENT;
        return COLLECT_SEGMENT.CARDS;
    }, [match.params.segment]);

    useEffect(() => {
        void dispatch(callFunction({ name: 'onVisitCollect' }));
    }, [dispatch]);

    const segment = useMemo(() => {
        switch (currentSegment) {
            case COLLECT_SEGMENT.PACKS:
                return <PacksSegment />;
            case COLLECT_SEGMENT.CARDS:
            default:
                return <CardsSegment />;
        }
    }, [currentSegment]);

    return (
        <StyledPage>
            <CollectHeader segment={currentSegment} />
            {segment}
        </StyledPage>
    );
};

export default Collect;
