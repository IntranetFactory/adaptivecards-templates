import mongoose, { Schema } from 'mongoose'
import { Interface } from '../../providers/StorageProvider'

export interface IUserModel extends mongoose.Document, Interface.IUser {
    _id : string
}

export const UserSchema: Schema = new Schema({
        // _id: Schema.Types.ObjectId,
        team: {type: [Schema.Types.String], default: []},
        org: {type: [Schema.Types.String], default: []},
        email: {type: Schema.Types.String, default: ""}
    },
    {
        versionKey: false // we don't need version for user
    }
);