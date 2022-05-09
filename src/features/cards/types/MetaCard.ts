import { LOCALES } from 'src/boot/ReactIntlProvider';
import { IZoneQueryInput } from 'src/features/appData/types';
import { IUserQueryInput } from 'src/features/userData/types';

export interface IMetaCard {
    _id: string;
    cardType: MetaCardCardType;
    season: string;
    cardStats: Array<{
        name: string;
        value: string;
        type: string;
    }>;
    tier: number;
    scoreMin: number;
    scoreMax: number;
    scoreCalc: string;
    batch: number;
    batchMax: number;
    title: string;
    subtitle: string;
    description: string;
    language: LOCALES;
    edition: string;
    editionCategory: string;
    editionSet: string;
    amount: number;
    circulation: number;
    priceMin: number;
    priceMax: number;
    priceAvg: number;
    priceSuggested: number;
    image: IMedia;
    imageUrl: string;
    imageBack?: IMedia;
    video?: IMedia;
    exclusive?: IMedia;
    creator: {
        _id: string;
        username: string;
    };
    owner: {
        _id: string;
        username: string;
    };
    zones: Array<{
        _id: string;
        name: string;
        description: string;
        rank: number;
        _ancestor_ids: string;
        location: string;
        insigniaImageUrl: string;
    }>;
    profile: {
        _id: string;
        username: string;
    };
    translations: {
        _id: string;
        _relation_id: string;
        relationType: string;
        items: Array<{ id: string; value: string; language: MetaCardLanguage }>;
    };
    userSpecificFields: {
        owned: boolean;
        bookmarked: boolean;
        onSaleByMe: boolean;
        onSaleByOthers: boolean;
    };
}

interface IMedia {
    _id: string;
    path: string;
    mediaType: 'image' | 'video';
    mimeType: string;
    name: string;
    category: string;
}

export enum MetaCardLanguage {
    EN = 'en',
    DE = 'de',
    FR = 'fr',
    ES = 'es',
}
export enum MetaCardCardType {
    ATHLETE = 'athlete',
}

export type IMetaCardQueryInput = Partial<{
    updatedAt: string;
    cardType_in: [MetaCardCardType];
    priceMax_ne: number;
    circulation_lte: number;
    leagueLabel_lt: string;
    editionSet_in: string[];
    imageBackUrl_lt: string;
    createdAt_ne: string;
    description_nin: string[];
    circulation_gt: number;
    imageBackFilename_in: string[];
    imageUrl_ne: string;
    videoFilename_ne: string;
    subtitle_nin: string[];
    videoFilename_lt: string;
    cardStats: IMetaCardCardStatQueryInput[];
    imageFilename: string;
    imageIpfs_exists: boolean;
    _creator_id_exists: boolean;
    imageIpfs_gt: string;
    imageBackIpfs_gte: string;
    cardType_ne: MetaCardCardType;
    imageIpfs_nin: string[];
    _zone_ids_exists: boolean;
    priceMax: number;
    exclusiveIpfs_in: string[];
    cardType_gt: MetaCardCardType;
    title_gt: string;
    batchMax_lt: number;
    videoUrl_lt: string;
    exclusiveUrl_lte: string;
    language_lte: MetaCardLanguage;
    metaCardIndex_lte: number;
    amount_gt: number;
    subtitle_gt: string;
    subtitle_lte: string;
    leagueLabel_nin: string[];
    priceSuggested_gt: number;
    statusComment_lt: string;
    scoreCalc_gt: string;
    createdAt_nin: string[];
    description_lt: string;
    scoreMin_in: number[];
    statusComment: string;
    _zone_ids_in: IZoneQueryInput[];
    tierLabel_exists: boolean;
    videoUrl_gte: string;
    season_lt: string;
    createdAt: string;
    videoIpfs_in: string[];
    exclusiveFilename_lt: string;
    priceMin_lte: number;
    scoreCalc_in: string[];
    status_lt: string;
    amount_lt: number;
    batch_exists: boolean;
    imageIpfs_gte: string;
    createdAt_lte: string;
    imageBackIpfs_in: string[];
    exclusiveUrl_lt: string;
    subtitle_in: string[];
    statusComment_ne: string;
    imageBackFilename_exists: boolean;
    priceAvg_lte: number;
    imageUrl_lt: string;
    scoreMin_lt: number;
    status_in: string[];
    imageBackFilename_ne: string;
    zoneLabel_lt: string;
    scoreMin_gt: number;
    status_nin: string[];
    subtitle_ne: string;
    exclusiveUrl_gte: string;
    createdAt_exists: boolean;
    scoreMax_lte: number;
    subtitle_gte: string;
    language_gt: MetaCardLanguage;
    teamLabel: string;
    priceSuggested_exists: boolean;
    imageUrl_exists: boolean;
    imageIpfs_in: string[];
    scoreMin: number;
    exclusiveUrl_exists: boolean;
    imageFilename_nin: string[];
    _profile_id: IUserQueryInput;
    circulation_nin: number[];
    subtitle: string;
    _zone_ids_nin: IZoneQueryInput[];
    zoneLabel_exists: boolean;
    statusComment_lte: string;
    videoIpfs_nin: string[];
    updatedAt_ne: string;
    _id_lte: string;
    updatedAt_nin: string[];
    videoUrl_lte: string;
    _profile_id_exists: boolean;
    teamLabel_lt: string;
    imageBackIpfs: string;
    imageIpfs_lte: string;
    batch_ne: number;
    tierLabel_nin: string[];
    priceMin_ne: number;
    circulation_ne: number;
    zoneLabel_gt: string;
    statusComment_in: string[];
    zoneLabel_gte: string;
    cardType_gte: MetaCardCardType;
    exclusiveUrl_gt: string;
    exclusiveIpfs_exists: boolean;
    editionSet_ne: string;
    imageBackIpfs_exists: boolean;
    season_gt: string;
    imageBackUrl_exists: boolean;
    imageFilename_exists: boolean;
    _id_exists: boolean;
    circulation_exists: boolean;
    description_lte: string;
    exclusiveIpfs_gte: string;
    priceMin_in: number[];
    status_lte: string;
    statusComment_exists: boolean;
    status_gte: string;
    imageFilename_ne: string;
    exclusiveFilename_in: string[];
    exclusiveFilename_gt: string;
    editionCategory_exists: boolean;
    imageFilename_gte: string;
    title: string;
    tierLabel_gte: string;
    // _image_id: MediumQueryInput;
    imageBackIpfs_ne: string;
    _zone_ids: IZoneQueryInput;
    tierLabel_ne: string;
    imageUrl: string;
    cardType_nin: [MetaCardCardType];
    leagueLabel_gt: string;
    tier_lte: number;
    updatedAt_gt: string;
    imageFilename_gt: string;
    tierLabel_lt: string;
    imageBackUrl: string;
    // cardStats_nin: [MetaCardCardStatQueryInput];
    _translations_id_exists: boolean;
    videoFilename_gt: string;
    updatedAt_in: string[];
    teamLabel_in: string[];
    exclusiveFilename_gte: string;
    imageBackFilename_gt: string;
    priceSuggested_gte: number;
    season_ne: string;
    editionSet_lte: string;
    exclusiveUrl_ne: string;
    circulation_in: number[];
    scoreMax_gte: number;
    imageBackFilename_lte: string;
    imageUrl_gte: string;
    priceSuggested: number;
    videoUrl_ne: string;
    amount_in: number[];
    description_in: string[];
    editionSet_gte: string;
    scoreCalc_lt: string;
    priceMin_nin: number[];
    updatedAt_lte: string;
    circulation_lt: number;
    scoreMin_ne: number;
    priceMax_gt: number;
    description_gte: string;
    exclusiveIpfs_gt: string;
    priceMax_nin: number[];
    teamLabel_nin: string[];
    description: string;
    imageFilename_in: string[];
    editionCategory_in: string[];
    _id_nin: string[];
    description_ne: string;
    language_exists: boolean;
    imageBackFilename_nin: string[];
    _id_ne: string;
    edition_lte: string;
    priceMax_gte: number;
    season_in: string[];
    language_nin: [MetaCardLanguage];
    title_nin: string[];
    leagueLabel: string;
    status_exists: boolean;
    scoreMax_ne: number;
    imageBackIpfs_lt: string;
    priceSuggested_in: number[];
    _image_id_exists: boolean;
    edition_gt: string;
    status_ne: string;
    videoFilename_lte: string;
    exclusiveFilename_lte: string;
    editionCategory_lte: string;
    videoIpfs_lt: string;
    priceMin: number;
    title_exists: boolean;
    teamLabel_ne: string;
    batch_lte: number;
    updatedAt_gte: string;
    priceAvg_exists: boolean;
    cardType_exists: boolean;
    imageBackUrl_ne: string;
    videoIpfs_exists: boolean;
    exclusiveIpfs_ne: string;
    imageBackUrl_lte: string;
    batchMax_exists: boolean;
    _id_in: string[];
    tierLabel_gt: string;
    updatedAt_exists: boolean;
    tierLabel_in: string[];
    editionSet_nin: string[];
    scoreMin_exists: boolean;
    edition_ne: string;
    editionSet_exists: boolean;
    cardType_lte: MetaCardCardType;
    priceMax_lte: number;
    tierLabel: string;
    teamLabel_gte: string;
    scoreMax_gt: number;
    circulation: number;
    cardStats_exists: boolean;
    videoFilename_in: string[];
    imageUrl_nin: string[];
    scoreMin_gte: number;
    imageUrl_lte: string;
    season: string;
    leagueLabel_exists: boolean;
    statusComment_nin: string[];
    language_in: [MetaCardLanguage];
    imageFilename_lt: string;
    // _imageBack_id: MediumQueryInput;
    scoreMin_lte: number;
    edition_in: string[];
    _owner_id_exists: boolean;
    updatedAt_lt: string;
    videoUrl_nin: string[];
    priceMax_exists: boolean;
    amount: number;
    subtitle_exists: boolean;
    exclusiveIpfs: string;
    editionCategory_gte: string;
    edition_lt: string;
    metaCardIndex: number;
    scoreMin_nin: number[];
    language_ne: MetaCardLanguage;
    title_lte: string;
    _id_gt: string;
    leagueLabel_in: string[];
    metaCardIndex_in: number[];
    _video_id_exists: boolean;
    tier_lt: number;
    zoneLabel: string;
    tier_gte: number;
    createdAt_in: string[];
    videoUrl: string;
    priceMin_exists: boolean;
    metaCardIndex_nin: number[];
    description_exists: boolean;
    _exclusive_id_exists: boolean;
    season_gte: string;
    priceMin_gt: number;
    videoIpfs_gt: string;
    language_gte: MetaCardLanguage;
    // OR: [!MetaCardQueryInput];
    tier_nin: number[];
    metaCardIndex_exists: boolean;
    zoneLabel_in: string[];
    edition_gte: string;
    priceAvg_gte: number;
    batchMax_gt: number;
    videoIpfs_ne: string;
    priceAvg_nin: number[];
    createdAt_lt: string;
    videoUrl_exists: boolean;
    batch_in: number[];
    videoIpfs: string;
    leagueLabel_gte: string;
    priceMax_lt: number;
    title_gte: string;
    tierLabel_lte: string;
    exclusiveFilename_ne: string;
    editionSet_gt: string;
    editionCategory_lt: string;
    imageUrl_in: string[];
    language_lt: MetaCardLanguage;
    imageBackIpfs_nin: string[];
    batch_gt: number;
    metaCardIndex_gte: number;
    tier_gt: number;
    imageBackFilename: string;
    scoreCalc_ne: string;
    status_gt: string;
    editionCategory: string;
    statusComment_gte: string;
    videoUrl_gt: string;
    // _video_id: MediumQueryInput;
    priceSuggested_lte: number;
    exclusiveIpfs_lte: string;
    exclusiveUrl_nin: string[];
    tier_ne: number;
    batchMax: number;
    title_ne: string;
    zoneLabel_lte: string;
    editionCategory_ne: string;
    leagueLabel_ne: string;
    exclusiveFilename_nin: string[];
    edition_nin: string[];
    exclusiveIpfs_nin: string[];
    imageBackUrl_gt: string;
    priceAvg: number;
    tier: number;
    scoreCalc_exists: boolean;
    videoFilename_gte: string;
    amount_nin: number[];
    scoreCalc_nin: string[];
    exclusiveFilename_exists: boolean;
    _id_gte: string;
    videoFilename_nin: string[];
    metaCardIndex_ne: number;
    // _translations_id: TranslationQueryInput;
    season_exists: boolean;
    tier_exists: boolean;
    zoneLabel_ne: string;
    subtitle_lt: string;
    editionSet: string;
    scoreMax_lt: number;
    imageIpfs_ne: string;
    batchMax_lte: number;
    scoreMax_in: number[];
    _id: string;
    scoreCalc: string;
    videoIpfs_lte: string;
    metaCardIndex_gt: number;
    tier_in: number[];
    batch_gte: number;
    editionSet_lt: string;
    createdAt_gt: string;
    batch_nin: number[];
    priceSuggested_ne: number;
    exclusiveUrl: string;
    imageBackUrl_nin: string[];
    editionCategory_gt: string;
    status: string;
    priceMin_lt: number;
    // cardStats_in: [MetaCardCardStatQueryInput];
    teamLabel_lte: string;
    scoreMax: number;
    imageBackFilename_gte: string;
    edition_exists: boolean;
    editionCategory_nin: string[];
    language: MetaCardLanguage;
    videoFilename_exists: boolean;
    batchMax_nin: number[];
    scoreCalc_lte: string;
    priceMin_gte: number;
    imageBackIpfs_lte: string;
    leagueLabel_lte: string;
    priceSuggested_nin: number[];
    priceSuggested_lt: number;
    scoreMax_nin: number[];
    imageFilename_lte: string;
    priceAvg_ne: number;
    season_nin: string[];
    title_in: string[];
    imageBackUrl_in: string[];
    cardType_lt: MetaCardCardType;
    priceMax_in: number[];
    imageBackUrl_gte: string;
    teamLabel_exists: boolean;
    amount_lte: number;
    amount_ne: number;
    priceAvg_lt: number;
    batch: number;
    _id_lt: string;
    edition: string;
    metaCardIndex_lt: number;
    imageIpfs: string;
    videoUrl_in: string[];
    imageBackFilename_lt: string;
    scoreCalc_gte: string;
    scoreMax_exists: boolean;
    circulation_gte: number;
    description_gt: string;
    imageUrl_gt: string;
    batchMax_gte: number;
    _creator_id: IUserQueryInput;
    createdAt_gte: string;
    batchMax_ne: number;
    imageIpfs_lt: string;
    amount_exists: boolean;
    AND: IMetaCardQueryInput[];
    batchMax_in: number[];
    exclusiveIpfs_lt: string;
    exclusiveFilename: string;
    zoneLabel_nin: string[];
    exclusiveUrl_in: string[];
    title_lt: string;
    priceAvg_in: number[];
    videoIpfs_gte: string;
    priceAvg_gt: number;
    batch_lt: number;
    imageBackIpfs_gt: string;
    // _exclusive_id: MediumQueryInput;
    amount_gte: number;
    season_lte: string;
    _imageBack_id_exists: boolean;
    cardType: MetaCardCardType;
    videoFilename: string;
    teamLabel_gt: string;
    statusComment_gt: string;
    _owner_id: IUserQueryInput;
}>;

export interface IMetaCardCardStatQueryInput {
    name_nin: string[];
    value_ne: string;
    type_lte: string;
    type_in: string[];
    value_lte: string;
    type: string;
    name: string;
    name_gte: string;
    AND: IMetaCardCardStatQueryInput[];
    type_gte: string;
    value_nin: string[];
    name_lte: string;
    type_gt: string;
    name_gt: string;
    value_lt: string;
    name_exists: boolean;
    name_in: string[];
    name_ne: string;
    type_ne: string;
    value: string;
    value_in: string[];
    type_lt: string;
    value_gt: string;
    value_exists: boolean;
    name_lt: string;
    type_exists: boolean;
    OR: IMetaCardCardStatQueryInput[];
    value_gte: string;
    type_nin: string[];
}