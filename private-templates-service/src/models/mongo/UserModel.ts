import mongoose, { Schema, Mongoose, SchemaTypes } from 'mongoose'

export interface IUser extends mongoose.Document {
    _id: mongoose.Types.ObjectId,
    team: [string],
    org: [string],
    email: string
}

export const UserSchema: Schema = new Schema({
        // _id: Schema.Types.ObjectId,
        team: {type: [Schema.Types.String], default: []},
        org: {type: [Schema.Types.String], default: []},
        email: Schema.Types.String
    },
    {
        versionKey: false // we don't need version for user
    }
);


export default function <T extends mongoose.Document>(db: mongoose.Connection, collection: string, 
                        schema: Schema) : mongoose.Model<T>{
    return db.model<T>(collection, schema);
}

// export default mongoose.model<IUser>('User', UserSchema); 
// export const User = mongoose.model<IUser>('User', UserSchema);
// export function(db: mongoose.Connection) {

// }