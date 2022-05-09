import { chevronUp } from 'ionicons/icons';
import React, { useMemo } from 'react';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';
import { RootState } from 'src/boot/types';
import { Accordion } from 'src/components';
import { selectAchievementIdsByCategory, selectCompletedAchievementsByIds } from '../../achievementsSlice';
import { Achievement } from '../Achievement';
import {
    StyledWrapper,
    StyledHeader,
    StyledTitle,
    StyledCompleted,
    StyledToggle,
    StyledList,
    StyledRewardsList,
} from './style';

const UNITS: Record<string, string> = {
    IGC: ' FZC',
    POINTS: ' Points',
};
interface IProps {
    category: string;
}
export const AchievementCategory: React.FC<IProps> = ({ category }: IProps) => {
    const achievementIds = useSelector((state: RootState) => selectAchievementIdsByCategory(state, category));
    const completedAchievements = useSelector((state: RootState) =>
        selectCompletedAchievementsByIds(state, achievementIds),
    );

    const { completedCount, rewardsObj } = useMemo(
        () => ({
            completedCount: completedAchievements.length,
            rewardsObj: completedAchievements.reduce((acc, { rewards }) => {
                const result = { ...acc };
                rewards.forEach((reward) => {
                    if (['igc', 'points'].includes(reward.type)) {
                        result[reward.type] = Number(reward.value) + Number(result[reward.type]);
                    } else {
                        result[reward.type] = reward.value;
                    }
                });
                return result;
            }, {} as Record<string, string | number>),
        }),
        [completedAchievements],
    );

    const renderedRewards = useMemo(
        () =>
            Object.entries(rewardsObj)
                .filter(([type]) => type === 'POINTS')
                .map(([type, value]) => (
                    <li key={type}>
                        {value}
                        {/* eslint-disable-next-line security/detect-object-injection */}
                        {UNITS[type] || ''}
                    </li>
                )),
        [rewardsObj],
    );

    const renderedAchievements = useMemo(
        () => achievementIds.map((id) => <Achievement key={id} achievementId={id} />),
        [achievementIds],
    );

    return (
        <StyledWrapper>
            <Accordion>
                {{
                    header({ isOpen }: { isOpen: boolean }) {
                        return (
                            <StyledHeader>
                                <StyledTitle>{category}</StyledTitle>
                                <StyledCompleted>
                                    <FormattedMessage
                                        defaultMessage="completed"
                                        description="Label for 'completed' achievements count"
                                    />{' '}
                                    {completedCount}/{achievementIds.length}
                                </StyledCompleted>
                                <StyledRewardsList>{renderedRewards}</StyledRewardsList>
                                <StyledToggle icon={chevronUp} isOpen={isOpen} />
                            </StyledHeader>
                        );
                    },
                    content() {
                        return <StyledList>{renderedAchievements}</StyledList>;
                    },
                }}
            </Accordion>
        </StyledWrapper>
    );
};
