import gql from 'graphql-tag';
import { IMetaAchievement } from 'src/features/achievements/types';
import { createQuery } from './createQuery';

const AchievementFragment = gql`
    fragment Achievement_Achievement on MetaAchievement {
        _id
        meta {
            timeframe
            group
            visualisation
        }
        category
        rewards {
            type
            value
            description
        }
        type
        _translations_id {
            items {
                id
                value
                language
            }
        }
    }
`;

const GetAchievementById = gql`
    query GetAchievementById($metaAchievementId: ObjectId!) {
        metaAchievement(query: { _id: $metaAchievementId }) {
            ...Achievement_Achievement
        }
    }
    ${AchievementFragment}
`;

const GetAchievementsByIds = gql`
    query GetAchievementsByIds($metaAchievementIds: [ObjectId]!) {
        metaAchievements(query: { _id_in: $metaAchievementIds }) {
            ...Achievement_Achievement
        }
    }
    ${AchievementFragment}
`;

const GetAllAchievements = gql`
    query GetAllAchievements {
        metaAchievements(query: { status_ne: DISABLED }) {
            ...Achievement_Achievement
        }
    }
    ${AchievementFragment}
`;

/** Fetches one achievement by achievementId: _id
 *  Includes all data
 */
const fetchAchievementById = createQuery<{ achievementId: string }, { metaAchievement: IMetaAchievement }>({
    query: GetAchievementById,
});

/** Fetches multiple achievements by achievementId: _id
 *  Includes all data
 */
const fetchAchievementsByIds = createQuery<{ achievementIds: string[] }, { metaAchievements: IMetaAchievement[] }>({
    query: GetAchievementsByIds,
});

/** Fetches all achievements
 *  Includes all data
 */
const fetchAllAchievements = createQuery<void, { metaAchievements: IMetaAchievement[] }>({
    query: GetAllAchievements,
});

export const achievementsApi = {
    fetchAchievementById,
    fetchAchievementsByIds,
    fetchAllAchievements,
};
