import mongoose, { Schema, SchemaTypes } from 'mongoose'
import { Interface } from '../../providers/StorageProvider'

export interface ITemplateModel extends mongoose.Document, Interface.ITemplate {
    _id : string
}

// export interface ITemplate extends mongoose.Document {
//     _id: mongoose.Types.ObjectId,
//     instances: [ITemplateInstance],
//     tags: [string],
//     owner: mongoose.Types.ObjectId,
//     updatedAt: Date,
// }

export const TemplateSchema: Schema = new Schema({
        // _id: Schema.Types.ObjectId,
        instances: {type: [], default: []},
        tags: {type: Schema.Types.Array, default: []},
        owner: { type: Schema.Types.ObjectId, ref: 'User'}
        // permissions
    },
    {
        versionKey: false,
        timestamps: {createdAt: true, updatedAt: true}
    }
);