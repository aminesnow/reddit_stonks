import { createSchema, Type, typedModel } from 'ts-mongoose';


const companySchema = createSchema({
    longName: Type.string({ required: true }),
    sector: Type.string({ required: false }),
    industry: Type.string({ required: false }),
    longBusinessSummary: Type.string({ required: false }),
    city: Type.string({ required: false }),
    country: Type.string({ required: false }),
    website: Type.string({ required: false }),
    symbol: Type.string({ required: true }),
    watchlist: Type.boolean({ required: false })
});

const Company = typedModel('Company', companySchema, 'companies');

export { Company };