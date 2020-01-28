import mongoose, { Schema } from 'mongoose'

interface ITemplateInstance {
    json: string,
    version: string
}

export interface ITemplate extends mongoose.Document {
    _id: mongoose.Types.ObjectId,
    instances: mongoose.Types.Array<ITemplateInstance>,
    tags: mongoose.Types.Array<string>,
    updatedAt: Date,
}

export const TemplateSchema: Schema = new Schema({
        _id: Schema.Types.ObjectId,
        instances: {type: Schema.Types.Array, default: []},
        tags: {type: Schema.Types.Array, default: []},
        // permissions
    },
    {
        versionKey: false,
        timestamps: {createdAt: false, updatedAt: true}
    }
);