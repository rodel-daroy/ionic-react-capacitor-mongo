import gql from 'graphql-tag';
import { IZone } from 'src/features/appData/types';
import { createQuery } from './createQuery';

const ZoneFragment = gql`
    fragment Zone_Zone on Zone {
        _id
        name
        rank
        description
        location
        insigniaImageUrl
        zoneMetaCardCount {
            total
            owned
        }
    }
`;

const GetZones = gql`
    query GetZonesByRank {
        zones(query: { public: true }) {
            ...Zone_Zone
            _ancestor_ids {
                ...Zone_Zone
            }
        }
    }
    ${ZoneFragment}
`;

const fetchZones = createQuery<void, { zones: IZone[] }>({
    query: GetZones,
});

export const appDataApi = {
    fetchZones,
};
