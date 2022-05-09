import { IonContent } from '@ionic/react';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'src/boot/store';
import { RootState } from 'src/boot/types';
import { PackList } from 'src/features/packs/PackList';
import {
    fetchMetaPacks,
    fetchOwnedPacksByMetaPackIds,
    selectAllMetaPacks,
    selectUnopenedPacksByOwner,
} from 'src/features/packs/packsSlice';

export const PacksSegment: React.FC = () => {
    const dispatch = useAppDispatch();
    const userId = useSelector((state: RootState) => state.userData.me?._id);
    const metaPacks = useSelector(selectAllMetaPacks);
    const ownedPacks = useSelector((state: RootState) => (userId ? selectUnopenedPacksByOwner(state, userId) : []));

    useEffect(() => {
        void dispatch(fetchMetaPacks());
    }, [dispatch]);

    useEffect(() => {
        if (!userId) return;
        void dispatch(
            fetchOwnedPacksByMetaPackIds({ ownerId: userId, metaPackIds: metaPacks.map((metaPack) => metaPack._id) }),
        );
    }, [dispatch, userId, metaPacks]);

    return (
        <IonContent>
            <PackList title="Packs to open" metaPacks={metaPacks} ownedPacks={ownedPacks} />
        </IonContent>
    );
};

export default PacksSegment;
