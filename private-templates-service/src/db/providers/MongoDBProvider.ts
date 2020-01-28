import mongoose, { Schema } from 'mongoose'
import {Collections, Queries, StorageProvider } from './StorageProvider'
import getCollection, { UserSchema, IUser } from '../../models/mongo/UserModel'
import {ITemplate, TemplateSchema} from '../../models/mongo/TemplateModel'

const USERS_COLLECTION_NAME_SINGULAR: string = 'User'
const TEMPLATES_COLLECTION_NAME_SINGULAR: string = 'Template'


export class MongoDBProvider extends StorageProvider {
    // Base64 is used here due to mongo not supporting $ in key values
    encodeTemplate(template: string): string {
        return btoa(template);
    }
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
    
    db!: mongoose.Connection // ! - for definite assignment
    static User: mongoose.Model<IUser>;
    static Template: mongoose.Model<ITemplate>;


    connectToDB() : void {
        try {
            this.db = mongoose.createConnection(this.connectionString, {
                socketOptions: {
                    connectTimeoutMS : 5000,
                    autoReconnect: true,
                    socketTimeoutMS: 30000
                }
            });
        } catch(e) {
            console.log(e);
        }
    }

    setUpCollections() : void {
        try {

            MongoDBProvider.User = getCollection<IUser>(this.db, USERS_COLLECTION_NAME_SINGULAR, 
                UserSchema);

            MongoDBProvider.Template = getCollection<ITemplate>(this.db, TEMPLATES_COLLECTION_NAME_SINGULAR, 
                TemplateSchema);

        } catch (e) {
            console.log(e);
        }
    }

    constructor(connectionString: string) {
        super(connectionString)
        this.connectToDB();
        this.setUpCollections();
    }
}


