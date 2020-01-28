import mongoose, { Schema } from 'mongoose'

interface TemplateInstace {
    json: string,
    version: string
}

export interface ITemplate extends mongoose.Document {
    _id: mongoose.Types.ObjectId,
    teamID: [mongoose.Types.ObjectId],
    orgID: [mongoose.Types.ObjectId],
    updatedAt: Date,
    email: string
}

export const TemplateSchema: Schema = new Schema({
        _id: Schema.Types.ObjectId,
        teamID: [Schema.Types.ObjectId],
        orgID: [Schema.Types.ObjectId],
        email: Schema.Types.String
    },
    {
        versionKey: false,
        timestamps: {createdAt: false, updatedAt: true}
    }
);