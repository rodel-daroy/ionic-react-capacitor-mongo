import type { Decimal128, ObjectId } from 'mongodb';
import type { NOTIFICATION_TYPE, NOTIFICATION_STATUS, ACHIEVEMENT_STATUS } from '../utility';

export interface Schemas {
    User: IUser;
    UserStatistics: IUserStatistics;
    Card: ICard;
    Media: any;
    MetaAchievement: IMetaAchievement;
    MetaCard: IMetaCard;
    MetaPack: any;
    Notification: INotification;
    Pack: IPack;
    ShopItem: IShopItem;
    SubGroup: any;
    Translations: ITranslation;
    Zone: IZone;
}

export interface IUser {
    accountId: string;
    _id: ObjectId;
    achievements: IAchievement[];
    coins: Decimal128;
    points: number;
    email: string;
    zoneStats?: {
        [key: string]: number;
    };
    paymentProvider?: number;
    media?: {
        [key: string]: string;
    };
    prizes?: IPrize[];
    invites?: IInvite[];
    groups?: IGroup[];
    preferredLanguage?: string;
    securitySetting?: number;
    statModifiers?: {
        [key: string]: number;
    };
    _bookmarkedCard_ids: ObjectId[];
    username: string;
    vitalState?: {
        [key: string]: string;
    };
    authToken?: string;
}
export interface IUserStatistics {
    _id: ObjectId;
    _user_id: ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
    emailRegistered: Date | null;
    appOpened: {
        count: number;
        list: Array<{ timestamp: Date }>;
    };
    pageViews: {
        count: number;
        list: Array<{ name: string; timestamp: Date }>;
    };
    collectedCards: {
        count: number;
    };
    packs: {
        opened: {
            count: number;
            list: Array<{ _metaPack_id: ObjectId; timestamp: Date }>;
        };
    };
    market: {
        purchases: {
            count: number;
            list: Array<{ _card_id: ObjectId; timestamp: Date }>;
        };
        sales: {
            count: number;
            list: Array<{ _card_id: ObjectId; timestamp: Date }>;
        };
    };
    games: {
        playedCount: number;
        penalty: {
            playedCount: number;
            list: Array<{ timestamp: Date }>;
        };
    };
}
export interface ICard {
    _id: ObjectId;
    _metaCard_id: ObjectId;
    onSale: boolean;
    price: Decimal128;
    mintNumber: number;
    previousOwners: Array<{
        _user_id: ObjectId;
        transferDate: string;
        transferType: 'purchase' | 'pack' | 'gift' | 'promo';
        purchasePrice?: Decimal128;
    }>;
    _user_id: ObjectId;
}

export interface IMetaCard {
    _id: ObjectId;
    cardType: 'athlete';
    metaCardIndex: number;
    _translations_id: ObjectId;
    title: string;
    subtitle: string;
    description: string;
    language: 'en' | 'de' | 'es' | 'fr';
    scoreCalc: string;
}

export interface IPack {
    _id: ObjectId;
    _card_ids: ObjectId[];
    _metaPack_id: ObjectId;
    opened: boolean;
    _user_id: ObjectId;
}
export interface IAchievement {
    _id: ObjectId;
    achievementDate: Date;
    status: ACHIEVEMENT_STATUS;
}

interface IPrize {
    type: string;
    name: string;
    description: string;
}

interface IInvite {
    email: string;
}

interface IGroup {
    id: string;
    name: string;
    founter: string;
}

export interface INotification {
    _id: ObjectId;
    _user_id: ObjectId;
    category: string;
    content: string;
    title: string;
    type: NOTIFICATION_TYPE;
    status: NOTIFICATION_STATUS;
    createdAt: Date;
}
export interface ITranslation {
    _id: ObjectId;
    _relation_id: ObjectId;
    relationType: 'metaCard' | 'metaPack';
    items: Array<{
        id: string;
        value: string;
        language: 'en' | 'de' | 'fr' | 'es';
    }>;
}

export interface IMetaAchievement {
    _id: ObjectId;
    meta: {
        timeframe: 'one-off' | 'daily' | 'weekly';
        internalName: string;
        trigger: string;
        requirements: string;
        prerequesites: string;
        group: string;
        visualisation: string;
    };
    status: 'enabled' | 'disabled';
    category: string;
    rewards: Array<{ type: 'igc' | 'points' | 'other'; value: string; description: string }>;
    type: 'milestone' | 'streak';
    _translation_id: ObjectId;
    createdAt: Date;
}

export interface IZone {
    _id: ObjectId;
    _ancestor_ids: ObjectId[];
    rank: number;
    insigniaImageUrl: string;
    location: string;
    name: string;
    description: string;
    public: boolean;
}
export interface IShopItem {
    _id: ObjectId;
    description: string;
    name: string;
    price: Decimal128;
    type: 'pack' | 'token';
    value?: Decimal128;
    _metaPack_id?: ObjectId;
}
