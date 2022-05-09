import React, { useState, useEffect } from 'react';
import { IPack, IMetaPack } from 'src/features/packs/types';
import { openPack } from 'src/features/packs/packsSlice';
import { fetchCardsByIds } from 'src/features/cards/';
import { CardDetailsCollectOpenPack } from 'src/features/cards/components/CardDetails';
import { useSelector } from 'react-redux';
import { useRealmApp } from 'src/boot';
import { useAppDispatch } from 'src/boot/store';
import { RootState } from 'src/boot/types';
import { PackOpenVideoWrapper } from './style';
// @ts-ignore
import sampleVid from 'src/assets/video/sample.mp4';

export interface IOpenPackProps {
    open: IPack;
    metaPacks: IMetaPack[];
    openVideo: boolean;
}

export const OpenPack: React.FC<IOpenPackProps> = (props: IOpenPackProps) => {
    const dispatch = useAppDispatch();
    const app = useRealmApp();
    const { open, metaPacks, openVideo } = props;
    const packCards = open._card_ids;
    const [openVideoWatched, setOpenVideoWatched] = useState(openVideo);
    const userId = useSelector((state: RootState) => state.userData?.me?._id);

    useEffect(() => {
        void dispatch(fetchCardsByIds(packCards));
    }, [dispatch, packCards]);

    const endVideo = () => {
        setOpenVideoWatched(true);
        return 'complete';
    };

    const showVideo = () => {
        return (
            <video autoPlay onEnded={() => endVideo()}>
                <source src={sampleVid} type="video/mp4" />
            </video>
        );
    };

    useEffect(() => {
        setOpenVideoWatched(false);
        if (!packCards) return;
        void dispatch(openPack(open));
    }, [app, dispatch, open, packCards, userId, metaPacks]);

    return openVideoWatched === true ? (
        <CardDetailsCollectOpenPack cardIds={packCards} />
    ) : (
        <PackOpenVideoWrapper>{showVideo()}</PackOpenVideoWrapper>
    );
};
