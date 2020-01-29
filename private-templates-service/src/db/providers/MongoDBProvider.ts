import mongoose, { Schema } from 'mongoose'
import {Collections, Queries, StorageProvider } from './StorageProvider'
import getCollection, { UserSchema, IUser } from '../../models/mongo/UserModel'
import {ITemplate, TemplateSchema} from '../../models/mongo/TemplateModel'
import { json } from 'express'

const USERS_COLLECTION_NAME_SINGULAR: string = 'User'
const TEMPLATES_COLLECTION_NAME_SINGULAR: string = 'Template'


export class MongoDBProvider extends StorageProvider {
    static Template: mongoose.Model<ITemplate>;
    static User: mongoose.Model<IUser>;
    db!: mongoose.Connection // ! - for definite assignment




    // Base64 is used here due to mongo not supporting $ in key values
    encodeTemplate(template: string): string {
        return btoa(template);
    }
    getTemplate(query: Queries.TemplateQuery): [Collections.Template] {
        MongoDBProvider.Template.find(query).then(result => console.log(result));
        return [new Collections.Template("", JSON.parse("{}"), "", "", true)];
    }
    getUser(query: Queries.UserQuery): [Collections.User] {
        let user: IUser;
        MongoDBProvider.User.findOne(query)
        .then(result => {
            if (result?._id) {
                console.log("found it");
                this.getTemplate({owner: result.id});
            }
        })
        .catch(err => console.log(err));
        return [new Collections.User("", "", "", "")];
    }
    getFolder(query: Queries.FolderQuery): [Collections.Folder] {
        throw new Error("Method not implemented.")
    }

    addTemplate(query: Queries.TemplateQuery) : void {
        let template: ITemplate = new MongoDBProvider.Template(query)
        template.save().then(result => console.log(result));
    }

    // findUser(query: Queries.UserQuery) {
    //     // let user: IUser = MongoDBProvider.User.findOne(query);
    //     return user;
        
    // }
    addUser(query: Queries.UserQuery) : void {
        try {
            let user: IUser = new MongoDBProvider.User(query);
        // let user: IUser = new MongoDBProvider.User ({
        //     _id: new mongoose.Types.ObjectId(),
        //     teamID: [new mongoose.Types.ObjectId()],
        //     orgID: [new mongoose.Types.ObjectId()],
        //     email: "hello@microsoft.com"
        //     });
            user.save().then(result => {
                console.log(result);
            // mongoose.disconnect();
            });
        } catch(e) {
            console.log(e);
        }
    }

    connectToDB() : void {
        try {
            this.db = mongoose.createConnection(this.connectionString, {
                connectTimeoutMS : 5000,
                autoReconnect: true,
                socketTimeoutMS: 30000
                
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


