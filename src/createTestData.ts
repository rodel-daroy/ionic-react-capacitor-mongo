/* eslint-disable no-console */
// @ts-ignore
async function loginApiKey() {
    const { App, Credentials, BSON } = await import('realm-web');
    // Create an API Key credential
    const credentials = Credentials.apiKey(process.env.DUMMY_USER_API_KEY!);
    const app = new App(process.env.REACT_APP_REALM_APP_ID!);
    // Authenticate the user
    const user = await app.logIn(credentials);
    // `App.currentUser` updates to match the logged in user
    if (user.id !== app.currentUser?.id) {
        throw new Error('Does not match');
    }
    const mongodb = app.currentUser.mongoClient('fanzone-dev-atlas');

    const testData = [
        {
            collection: 'Zone',
            data: [
                {
                    _id: new BSON.ObjectId('602d443f263e4ba6e11dd284'),
                    name: 'Soccer',
                    category: 'Sports',
                },
            ],
        },
        {
            collection: 'ShopItem',
            data: [
                {
                    _id: new BSON.ObjectId('602d4469263e4ba6e11dd285'),
                    type: 'pack',
                    description: 'Buy for 1 Rare Cards Pack!',
                    name: 'Rare Pack',
                    price: new BSON.Decimal128(Buffer.alloc(16, 0)),
                },
            ],
        },
        {
            collection: 'SubGroup',
            data: [
                {
                    _id: new BSON.ObjectId('602d4470263e4ba6e11dd286'),
                    insigniaImageUrl: 'abc123x3g2',
                    name: 'Bulls',
                    location: 'Chicago',
                    season: new Date(),
                },
            ],
        },
        {
            collection: 'MetaPack',
            data: [
                {
                    _id: new BSON.ObjectId('602d4470263e4ba6e11dd287'),
                    name: 'Xmas super',
                    edition: 1,
                    type: 'Super Rares',
                },
            ],
        },
        {
            collection: 'MetaAchievement',
            data: [
                {
                    _id: new BSON.ObjectId('602d4470263e4ba6e11dd288'),
                    title: 'Log in 5 times',
                    type: 'tutorial',
                },
            ],
        },
        {
            collection: 'Media',
            data: [
                {
                    _id: new BSON.ObjectId('602d4470263e4ba6e11dd289'),
                    name: 'dog.jpg',
                    path: 'images/gaga4$$$5aaf/',
                    mimeType: 'image/jpg',
                    mediaType: 'image',
                    category: 'jpg',
                },
            ],
        },
        {
            collection: 'MetaCard',
            data: [
                {
                    _id: new BSON.ObjectId('602d443f263e4ba6e11dd28a'),
                    creatorId: new BSON.ObjectId(new BSON.ObjectId(app.currentUser.id)),
                    subGroups: [
                        {
                            id: '602d4470263e4ba6e11dd286',
                            name: 'test',
                            type: 'test',
                        },
                    ],
                    people: { id: '123', name: 'David Beckham', type: 'Player' },
                    zone: 'Football',
                    cardMediaId: new BSON.ObjectId('602d4470263e4ba6e11dd289'),
                    baseValue: 10,
                    name: 'David Beckham',
                    batch: 1,
                    maxBatches: 10,
                    title: 'David Beckham',
                    tier: 1,
                    stats: [{ kick: 34, defense: 22 }],
                    editionId: 'xyz',
                    effects: [
                        { effect: 'lightning', location: 'border', rules: 'shop' },
                        { effect: 'signature', location: 'photo', rules: 'special' },
                    ],
                },
            ],
        },
        {
            collection: 'Card',
            data: [
                {
                    _id: new BSON.ObjectId('602d4470263e4ba6e11dd28b'),
                    metaCardId: new BSON.ObjectId('602d443f263e4ba6e11dd28a'),
                    userId: new BSON.ObjectId(app.currentUser.id),
                },
                {
                    _id: new BSON.ObjectId('602d4470263e4ba6e11dd28c'),
                    metaCardId: new BSON.ObjectId('602d443f263e4ba6e11dd28a'),
                    userId: new BSON.ObjectId(app.currentUser.id),
                },
                {
                    _id: new BSON.ObjectId('602d4470263e4ba6e11dd28d'),
                    metaCardId: new BSON.ObjectId('602d443f263e4ba6e11dd28a'),
                    userId: new BSON.ObjectId(app.currentUser.id),
                },
                {
                    _id: new BSON.ObjectId('602d4470263e4ba6e11dd28e'),
                    metaCardId: new BSON.ObjectId('602d443f263e4ba6e11dd28a'),
                    userId: new BSON.ObjectId(app.currentUser.id),
                },
                {
                    _id: new BSON.ObjectId('602d4470263e4ba6e11dd28f'),
                    metaCardId: new BSON.ObjectId('602d443f263e4ba6e11dd28a'),
                    userId: new BSON.ObjectId(app.currentUser.id),
                },
                {
                    _id: new BSON.ObjectId('602d4470263e4ba6e11dd290'),
                    metaCardId: new BSON.ObjectId('602d443f263e4ba6e11dd28a'),
                    userId: new BSON.ObjectId(app.currentUser.id),
                },
                {
                    _id: new BSON.ObjectId('602d4470263e4ba6e11dd291'),
                    metaCardId: new BSON.ObjectId('602d443f263e4ba6e11dd28a'),
                    userId: new BSON.ObjectId(app.currentUser.id),
                },
                {
                    _id: new BSON.ObjectId('602d4470263e4ba6e11dd292'),
                    metaCardId: new BSON.ObjectId('602d443f263e4ba6e11dd28a'),
                    userId: new BSON.ObjectId(app.currentUser.id),
                },
                {
                    _id: new BSON.ObjectId('602d4470263e4ba6e11dd293'),
                    metaCardId: new BSON.ObjectId('602d443f263e4ba6e11dd28a'),
                    userId: new BSON.ObjectId(app.currentUser.id),
                },
                {
                    _id: new BSON.ObjectId('602d4470263e4ba6e11dd294'),
                    metaCardId: new BSON.ObjectId('602d443f263e4ba6e11dd28a'),
                    userId: new BSON.ObjectId(app.currentUser.id),
                },
                {
                    _id: new BSON.ObjectId('602d4470263e4ba6e11dd295'),
                    metaCardId: new BSON.ObjectId('602d443f263e4ba6e11dd28a'),
                    userId: new BSON.ObjectId(app.currentUser.id),
                },
                {
                    _id: new BSON.ObjectId('602d4470263e4ba6e11dd296'),
                    metaCardId: new BSON.ObjectId('602d443f263e4ba6e11dd28a'),
                    userId: new BSON.ObjectId(app.currentUser.id),
                },
            ],
        },
        {
            collection: 'Pack',
            data: [
                {
                    _id: new BSON.ObjectId('602d443f263e4ba6e11dd28b'),
                    metaPackId: new BSON.ObjectId('602d4470263e4ba6e11dd287'),
                    userId: new BSON.ObjectId(new BSON.ObjectId(app.currentUser.id)),
                    opened: false,
                    cards: [
                        new BSON.ObjectId('602d4470263e4ba6e11dd28b'),
                        new BSON.ObjectId('602d4470263e4ba6e11dd28c'),
                        new BSON.ObjectId('602d4470263e4ba6e11dd28d'),
                        new BSON.ObjectId('602d4470263e4ba6e11dd28e'),
                        new BSON.ObjectId('602d4470263e4ba6e11dd28f'),
                        new BSON.ObjectId('602d4470263e4ba6e11dd290'),
                        new BSON.ObjectId('602d4470263e4ba6e11dd291'),
                        new BSON.ObjectId('602d4470263e4ba6e11dd292'),
                        new BSON.ObjectId('602d4470263e4ba6e11dd293'),
                        new BSON.ObjectId('602d4470263e4ba6e11dd294'),
                        new BSON.ObjectId('602d4470263e4ba6e11dd295'),
                        new BSON.ObjectId('602d4470263e4ba6e11dd296'),
                    ],
                },
            ],
        },
    ];

    for (const entry of testData) {
        const subgroups = mongodb.db('fanzone-dev').collection(entry.collection);
        for (const p of entry.data) {
            try {
                const result = await subgroups.findOneAndReplace({ _id: p._id }, p, { upsert: true });
                console.log(result);
            } catch (e) {
                console.log(entry.collection);
                console.log(e);
            }
        }
    }
}

loginApiKey()
    .then(() => {
        console.log('Success!');
    })
    .catch((err) => console.log(err));
