// Base class for all the StorageProviders.
module Interface {
    export interface IUser {
        _id?: string,
        team: string[],
        org: string[],
        email: string
    }

    export interface ITemplateInstance {
        json: string,
        version: string
    }

    export interface ITemplate {
        _id?: string,
        instances: ITemplateInstance[],
        tags: string[],
        owner: string,
        createdAt: Date,
        updatedAt: Date,
        isPublished: boolean
    }
}

module Queries {

    export interface TemplateQuery {
        templateID?: string,
        version?: number,
        tags?: string[],
        isPublished? : boolean,
        owner?: string
        //sort
        // permissions? : [enum]
    }

    export interface UserQuery {
        userID? : string,
        teamID? : string[],
        orgID? : string[],
        email?: string
    }

    export interface FolderQuery {
        folderID? : string,
        folderName? : string,
        parentID? : string,
        childTemplatesID?: string[],
        childFoldersID?: string[],
        // permissions? : [enum]

    }
}


module Collections {
    export class User implements Interface.IUser {
        _id?: string;
        team: string[] = new Array();
        org: string[] = new Array();
        email: string;

        
        constructor(team: string, org: string, email:string, _id?: string,) {
            this.team.push(team);
            this.org.push(org);
            this.email = email;
            if(_id) {
                this._id = _id;
            }
        }
    }
    
    export class Template implements Interface.ITemplate {
        _id?: string;
        instances: Interface.ITemplateInstance[] = new Array()
        tags: string[] = new Array();
        owner: string;
        createdAt: Date;
        updatedAt: Date;
        isPublished: boolean;
        
        
        // permission: []
        constructor(instances: Interface.ITemplateInstance[], tags: string[],
                                 owner: string, createdAt: Date, 
                                 updatedAt: Date, isPublished: boolean, _id?: string) {
            this.instances.concat(instances);
            this.tags.concat(tags);
            this.owner = owner;
            this.createdAt = createdAt;
            this.updatedAt = updatedAt;
            this.isPublished = isPublished;
            if(_id) {
                this._id = _id;
            }
        }
    }
}

abstract class StorageProvider {
    protected connectionString: string;
    constructor(connectionString: string) {
        this.connectionString = connectionString;
    }

    // Template Retrieval
    abstract getTemplate(query: Queries.TemplateQuery) : [Collections.Template];
    // User Retrieval
    abstract getUser(query: Queries.UserQuery) : [Collections.User];

    abstract addUser(user: Collections.User) : void;
    abstract addTemplate(user: Collections.User) : void;

}

export {Collections, Interface, Queries, StorageProvider};


