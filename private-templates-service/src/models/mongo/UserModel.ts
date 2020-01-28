import mongoose, { Schema } from 'mongoose'

export interface IUser extends mongoose.Document {
    _id: string,
    teamID: [string],
    orgID: [string],
    email: string
}

export const UserSchema: Schema = new Schema({
        _id: Schema.Types.ObjectId,
        teamID: [Schema.Types.ObjectId],
        orgID: [Schema.Types.ObjectId],
        email: String
    },
    {
        versionKey: false
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