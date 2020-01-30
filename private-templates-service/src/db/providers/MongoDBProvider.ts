import mongoose, { Schema, Mongoose, Query, Collection } from 'mongoose'
import {Collections, Queries, StorageProvider, Interface} from './StorageProvider'
import { UserSchema, IUserModel } from '../models/mongo/UserModel'
import { ITemplateModel, TemplateSchema } from '../models/mongo/TemplateModel'
import {Mongo} from '../utils/mongoutils'
import MONGO_CONFIG from '../config/mongo.json'

const USERS_COLLECTION_NAME_SINGULAR: string = 'User'
const TEMPLATES_COLLECTION_NAME_SINGULAR: string = 'Template'


export class MongoDBProvider extends StorageProvider {
    Template!: mongoose.Model<ITemplateModel>;
    User!: mongoose.Model<IUserModel>;
    db!: mongoose.Connection // ! - for definite assignment

    getTemplate(query: Queries.TemplateQuery): [Collections.Template] {
        let templates: [Collections.Template];
        this.Template.find(query)
        .then(result => {
            console.log(result);

        });
        return [new Collections.Template([], JSON.parse("{}"), "", new Date(Date.now()), new Date(Date.now()), true)];
    }
    getUser(query: Queries.UserQuery): [Collections.User] {
        let user: IUserModel;
        this.User.findOne(query)
        .then(result => {
            if (result?._id) {
                console.log("found it");
                this.getTemplate({owner: result.id});
            }
        })
        .catch(err => console.log(err));
        return [new Collections.User("", "", "", "")];
    }


    async addUser(user: Collections.User) : Promise<void> {
            let newUser: IUserModel = new this.User(Mongo.Utils.objToJSON(user));
            newUser.save()
            .then(result => console.log(result))
            .catch(err => console.log("Error: " + err));
    }
    addTemplate(user: Collections.User) : void {
        let template: ITemplateModel = new this.Template(user)
        template.save().then(result => console.log(result));
    }


    // Set up mongoose models to work with the chosen collections
    setUpCollections() : void {
        try {
            this.User = Mongo.Model.getCollection<IUserModel>(this.db, USERS_COLLECTION_NAME_SINGULAR, 
                UserSchema);
            this.Template = Mongo.Model.getCollection<ITemplateModel>(this.db, TEMPLATES_COLLECTION_NAME_SINGULAR, 
                TemplateSchema);
            let temp: IUserModel = new this.User({org: "hello"});
            temp.save();
        } catch (e) {
            console.log(e);
        }
    }

    async initializeDB() : Promise<void> {
        await mongoose.createConnection(this.connectionString, MONGO_CONFIG)
        .then(connection => {
            this.db = connection;
            this.setUpCollections();
        })
        .catch(error => {
            console.log(error)
        });
    }

    async connect() : Promise<void>{
        await this.initializeDB();
    }

    close() {
        this.db.close()
            .then(result => console.log(result))
            .catch(err => console.log(err));
    }

    constructor(connectionString: string) {
        super(connectionString)
    }
}


