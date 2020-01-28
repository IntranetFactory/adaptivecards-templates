import mongoose from 'mongoose'
import { Collections, Queries, StorageProvider } from './StorageProvider'



class MongoDBProvider extends StorageProvider {
    getTemplate(query: Queries.TemplateQuery): Collections.Template {
        throw new Error("Method not implemented.")
    }
    getUser(query: Queries.UserQuery): Collections.User {
        throw new Error("Method not implemented.")
    }
    getFolder(query: Queries.FolderQuery): Collections.Folder {
        throw new Error("Method not implemented.")
    }
    

    constructor(connectionString: string) {
        super(connectionString)
    }
    

    
}

let db: MongoDBProvider = new MongoDBProvider("connection string")
let user: Collections.User = db.getUser({userID: "123"})
