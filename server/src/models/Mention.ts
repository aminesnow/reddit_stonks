import { createSchema, Type, typedModel } from 'ts-mongoose';


const mentionSchema = createSchema({
    reddit_id: Type.string({ required: true }),
    title: Type.string({ required: true }), 
    full_link: Type.string({ required: true }), 
    permalink: Type.string({ required: true }), 
    created_utc: Type.number({ required: true }), 
    created_date: Type.date({ required: true }), 
    ticker: Type.string({ required: true }), 
    author: Type.string({ required: true }), 
    source: Type.string({ required: true }), 
});

const Mention = typedModel('Mention', mentionSchema);

export { Mention };