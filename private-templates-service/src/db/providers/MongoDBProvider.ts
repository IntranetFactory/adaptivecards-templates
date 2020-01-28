import mongoose, { Schema } from 'mongoose'
import {Collections, Queries, StorageProvider } from './StorageProvider'
import getCollection, { UserSchema, IUser } from '../../models/mongo/UserModel'

const USERS_COLLECTION_NAME_SINGULAR: string = 'User'


export class MongoDBProvider extends StorageProvider {
    getTemplate(query: Queries.TemplateQuery): [Collections.Template] {
        throw new Error("Method not implemented.")
    }
    getUser(query: Queries.UserQuery): [Collections.User] {
        throw new Error("Method not implemented.")
    }
    getFolder(query: Queries.FolderQuery): [Collections.Folder] {
        throw new Error("Method not implemented.")
    }

    findUser() {
        this.addUser();
        MongoDBProvider.User.findOne({email: "hello@microsoft.com"})
        .then(result => {
            console.log(result?._id.getTimestamp());
            // console.log(result?);
            console.log(result);
            this.db.close();

        })
        .catch(error => (console.log(error)));
    }
    addUser() {
        let user: IUser = new MongoDBProvider.User ({
            // _id: new mongoose.Types.ObjectId(),
            teamID: [new mongoose.Types.ObjectId()],
            orgID: [new mongoose.Types.ObjectId()],
            email: "hello@microsoft.com"
            });
        user.save().then(result => {
            // console.log(result);
            // mongoose.disconnect();
        });
    }
    
    db: mongoose.Connection;
    static User: mongoose.Model<IUser>;

    constructor(connectionString: string) {
        super(connectionString)
        this.db = mongoose.createConnection(connectionString);
        MongoDBProvider.User = getCollection<IUser>(this.db, USERS_COLLECTION_NAME_SINGULAR, 
                                    UserSchema);
    }
}


