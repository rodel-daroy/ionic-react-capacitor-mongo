import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/boot/types';
import {
    selectCompletedAchievementCategories,
    selectPendingAchievementCategories,
} from 'src/features/achievements/achievementsSlice';
import { AchievementCategory } from '../AchievementCategory';
import { StyledStatus, StyledTitle, StyledStatusWrapper, AchievementsContainer } from './style';

const getStatus = (points = 0): string => {
    if (points > 1000) return 'Pro';
    return 'Beginner';
};
export const AchievementsSegment: React.FC = () => {
    const user = useSelector((state: RootState) => state.userData.me);
    const completedAchievementCategories = useSelector(selectCompletedAchievementCategories);
    const pendingAchievementCategories = useSelector(selectPendingAchievementCategories);
    const status = useMemo(() => getStatus(user?.points), [user?.points]);

    const renderedCompletedAchievementCategories = useMemo(
        () =>
            !!completedAchievementCategories.length && (
                <React.Fragment>
                    <StyledTitle>Completed Achievements</StyledTitle>
                    {completedAchievementCategories.map((category) => (
                        <AchievementCategory key={category} category={category} />
                    ))}
                </React.Fragment>
            ),
        [completedAchievementCategories],
    );

    const renderedPendingAchievementCategories = useMemo(
        () =>
            pendingAchievementCategories.map((category) => <AchievementCategory key={category} category={category} />),
        [pendingAchievementCategories],
    );

    return (
        <AchievementsContainer>
            <StyledStatusWrapper>
                Your Status <StyledStatus>{status}</StyledStatus>
            </StyledStatusWrapper>
            {renderedCompletedAchievementCategories}
            <StyledTitle>Pending Achievements</StyledTitle>
            {renderedPendingAchievementCategories}
        </AchievementsContainer>
    );
};
