import { createSchema, Type, typedModel } from 'ts-mongoose';
import * as bcrypt from 'bcrypt';


const userSchema = createSchema({
    username: Type.string({ required: true, unique: true }),
    pwd: Type.string({ required: true }),
    ...({} as {
        generateHash: (password: string) => string;
        validPassword: (password: string) => boolean;
    }),
});



// methods ======================
// generating a hash

userSchema.method("generateHash", function (password: string) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
});


userSchema.method("validPassword", function (password) {
    const user = this as any;
    return bcrypt.compareSync(password, user.pwd);
});

const User = typedModel('User', userSchema, 'users');

export { User };