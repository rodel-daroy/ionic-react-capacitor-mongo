import gql from 'graphql-tag';
import { IUser, IUserData, IUserQueryInput } from 'src/features/userData/types';
import { createMutation } from './createMutation';
import { createQuery } from './createQuery';

const UserFragment = gql`
    fragment User_User on User {
        _id
        username
        bio
        media {
            profilePhoto
        }
        achievements {
            _id
            achievementDate
            status
        }
        groups {
            name
            founder
            _id
        }
    }
`;

const UserDataFragment = gql`
    fragment Userdata_User on User {
        coins
        points
        email
        accountId
        _bookmarkedCard_ids
        firstName
        lastName
        phoneNumber
        invites {
            email
        }
        paymentProvider
        preferredLanguage
        prizes {
            name
            type
            description
        }
        securitySetting
        tutorialFinished
    }
`;

const GetUserDataByAccountId = gql`
    query GetUserDataByAccountId($accountId: String!) {
        user(query: { accountId: $accountId }) {
            ...User_User
            ...Userdata_User
        }
    }
    ${UserDataFragment}
    ${UserFragment}
`;

const GetUserData = gql`
    query GetUserData($userId: ObjectId!) {
        user(query: { _id: $userId }) {
            ...UserData_User
        }
    }
    ${UserDataFragment}
`;

const GetUsersByIds = gql`
    query GetUsersByIds($userIds: [ObjectId]!) {
        users(query: { _id_in: $userIds }) {
            ...User_User
        }
    }
    ${UserFragment}
`;

const GetUserById = gql`
    query GetUserById($userId: ObjectId!) {
        users(query: { _id: $userId }) {
            ...User_User
        }
    }
    ${UserFragment}
`;

const UpdateUserDataById = gql`
    mutation UpdateUser($query: UserQueryInput!, $updates: UserUpdateInput!) {
        updatedUserData: updateOneUser(query: $query, set: $updates) {
            ...User_User
            ...Userdata_User
        }
    }
    ${UserDataFragment}
    ${UserFragment}
`;

/** Fetches own userData
 *  Includes all user-data
 */
const fetchUserData = createQuery<{ userId: string }, { user: IUserData }>({
    query: GetUserData,
});

/** Fetches one user by userId: _id
 *  Includes only public user-data
 */
const fetchUserById = createQuery<{ userId: string }, { user: IUser }>({
    query: GetUserById,
});

/** Fetches multiple users by userid: _id
 *  Includes only public user-data
 */
const fetchUsersByIds = createQuery<{ userIds: string[] }, { users: IUser[] }>({
    query: GetUsersByIds,
});

/** Fetches owned user by userid: _id
 *  Includes private user-data
 */
const fetchUserDataByAccountId = createQuery<{ accountId: string }, { user: IUserData }>({
    query: GetUserDataByAccountId,
    fetchPolicy: 'network-only',
});

/** Updates userData by userId: _id
 *  Requires Authentication; will fail if updating user is not the 'owner'
 */
const updateUserData = createMutation<IUserQueryInput, void, { updates: Partial<IUserData> }>({
    mutation: UpdateUserDataById,
});

export const userDataApi = {
    fetchUserData,
    fetchUserById,
    fetchUserDataByAccountId,
    fetchUsersByIds,
    updateUserData,
};
