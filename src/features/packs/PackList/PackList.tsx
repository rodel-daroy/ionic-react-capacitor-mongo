import React, { useState, useCallback, useMemo } from 'react';
import { IonButton, IonIcon, useIonRouter } from '@ionic/react';
import { IMetaPack, IPack } from 'src/features/packs/types';
import { OpenPack } from 'src/features/packs/OpenPack';
import {
    StyledMetaPackBadge,
    StyledMetaPackCardsCount,
    StyledMetaPackImage,
    StyledMetaPackInfo,
    StyledMetaPackName,
    StyledMetaPackWrapper,
    StyledPacksList,
    StyledMetaPackOwnedCount,
    StyledOpenButton,
} from './styles';
import { layers } from 'ionicons/icons';
import { Drawer } from 'src/components';
import { useRouteMatch } from 'react-router';

export interface IPackListProps {
    metaPacks: IMetaPack[];
    ownedPacks: IPack[];
    title: string;
}

export const PackList: React.FC<IPackListProps> = (props: IPackListProps) => {
    const { metaPacks, ownedPacks } = props;

    const { push } = useIonRouter();
    const {
        params: { zoneId },
    } = useRouteMatch<{ zoneId: string }>();
    const [open, setOpenPack] = useState<IPack>();
    const [openVideo, setOpenVideo] = useState(false);

    const ownedMetaPacks = useMemo(() => {
        const ownedMetaPackIds = ownedPacks.map((ownedPack) => ownedPack.metaPack._id);
        const ownedMetaPackIdsUniq = ownedMetaPackIds.filter((item, pos, self) => self.indexOf(item) === pos);
        const resultsArray = [];
        for (const metaPackId of ownedMetaPackIdsUniq) {
            const filterPacks = metaPacks.filter((metaPack) => metaPackId === metaPack._id);
            resultsArray.push(...filterPacks);
        }
        return resultsArray;
    }, [metaPacks, ownedPacks]);

    const getPacksByMetaPack = (metaPackName: string | null, ownedPacks: IPack[], metaPacks: IMetaPack[]) => {
        const specificMetaPacks = metaPacks.filter((metaPack) => metaPack.name === metaPackName);
        const specificMetaPack = specificMetaPacks ? specificMetaPacks[0] : undefined;
        if (metaPackName && specificMetaPack) {
            const specificPacks = ownedPacks.filter((ownedPack) => ownedPack.metaPack._id === specificMetaPack._id);
            return specificPacks[0];
        }
    };

    const handleClick = useCallback(
        (metaPack: IMetaPack) => {
            setOpenVideo(false);
            const getPack = getPacksByMetaPack(metaPack.name, ownedPacks, metaPacks);
            if (getPack) {
                setOpenPack(getPack);
            }
        },
        [metaPacks, ownedPacks],
    );

    const countPacks = (metaPack: IMetaPack, ownedPacks: IPack[]) => {
        let count = 0;
        for (const ownedPack of ownedPacks) {
            if (ownedPack.metaPack._id === metaPack._id) {
                count += 1;
            }
        }
        return count;
    };

    const navigateToShop = useCallback(() => push(`/zone/${zoneId}/shop/packs`), [push, zoneId]);

    const renderedPacks = (metaPacks: IMetaPack[], ownedPacks: IPack[]) => {
        return metaPacks.map((metaPack) => (
            <StyledMetaPackWrapper key={metaPack._id} id={metaPack._id}>
                <StyledMetaPackImage src={metaPack.imageUrl}></StyledMetaPackImage>
                <StyledMetaPackInfo>
                    <StyledMetaPackName>{metaPack.name}</StyledMetaPackName>
                    <StyledMetaPackBadge>{metaPack.edition}</StyledMetaPackBadge>
                    <StyledMetaPackCardsCount>
                        <IonIcon icon={layers}></IonIcon> {metaPack.cardsInPack} CARDS
                    </StyledMetaPackCardsCount>
                    <StyledMetaPackOwnedCount>
                        You own {countPacks(metaPack, ownedPacks)} packs
                    </StyledMetaPackOwnedCount>
                    <StyledOpenButton expand="block" onClick={() => handleClick(metaPack)}>
                        Open
                    </StyledOpenButton>
                </StyledMetaPackInfo>
            </StyledMetaPackWrapper>
        ));
    };

    const handleClose = useCallback(() => {
        push(`/zone/${zoneId}/collect/cards`, 'root');
    }, [push, zoneId]);

    return (
        <div>
            {ownedMetaPacks.length ? (
                <StyledPacksList>{renderedPacks(ownedMetaPacks, ownedPacks)}</StyledPacksList>
            ) : (
                <IonButton onClick={navigateToShop}>Buy Packs</IonButton>
            )}
            {open && (
                <Drawer onClose={handleClose} title="Collect">
                    {{ body: <OpenPack open={open} metaPacks={metaPacks} openVideo={openVideo} /> }}
                </Drawer>
            )}
        </div>
    );
};
