import mongoose from 'mongoose'
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
        this.User.findOne({email: "seva@microsoft.com"})
        .then(result => {console.log(result); this.db.close()})
        .catch(error => (console.log(error)));
    }
    
    db: mongoose.Connection;
    User: mongoose.Model<IUser>;

    constructor(connectionString: string) {
        super(connectionString)
        this.db = mongoose.createConnection(connectionString);
        this.User = getCollection<IUser>(this.db, USERS_COLLECTION_NAME_SINGULAR, 
                                    UserSchema);
        let m: IUser = new this.User();
    }
}


