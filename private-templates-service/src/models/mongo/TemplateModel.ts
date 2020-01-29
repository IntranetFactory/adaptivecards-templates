import mongoose, { Schema, SchemaTypes } from 'mongoose'

interface ITemplateInstance {
    json: string,
    version: string
}



export interface ITemplate extends mongoose.Document {
    _id: mongoose.Types.ObjectId,
    instances: mongoose.Types.Array<ITemplateInstance>,
    tags: mongoose.Types.Array<string>,
    owner: mongoose.Types.ObjectId,
    updatedAt: Date,
}

export const TemplateSchema: Schema = new Schema({
        // _id: Schema.Types.ObjectId,
        instances: {type: [], default: []},
        tags: {type: Schema.Types.Array, default: []},
        owner: { type: Schema.Types.ObjectId, ref: 'User'}
        // permissions
    },
    {
        versionKey: false,
        timestamps: {createdAt: false, updatedAt: true}
    }
);