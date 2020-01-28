// Base class for all the StorageProviders.
export module Queries {

    export interface TemplateQuery {
        templateID?: string,
        ownerID? : string,
        folderID? : string,
        isPublished? : boolean,
        // permissions? : [enum]
    }

    export interface UserQuery {
        userID? : string,
        teamID? : [string],
        orgID? : [string],
        email?: string
    }

    export interface FolderQuery {
        folderID? : string,
        folderName? : string,
        parentID? : string,
        childTemplatesID?: [string],
        childFoldersID?: [string],
        // permissions? : [enum]

    }
}


export module Collections {
    export class User {
        userID: string;
        teamID: string;
        orgID: string;
        email: string;
        constructor(userID: string, teamID: string, orgID: string, email:string) {
            this.userID = userID;
            this.teamID = teamID;
            this.orgID = orgID;
            this.email = email;
        }
    }
    
    export class Template {
        templateID: string;
        json: JSON;
        ownerID: string;
        folderID: string;
        // permission: []
        isPublished: boolean;
        constructor(templateID: string, json: JSON, ownerID: string,
                                     folderID: string, isPublished: boolean) {
            this.templateID = templateID;
            this.json = json;
            this.ownerID = ownerID;
            this.folderID = folderID;
            this.isPublished = isPublished;
        }
    }

    export class Folder {

    }

}

export abstract class StorageProvider {
    protected connectionString: string;
    constructor(connectionString: string) {
        this.connectionString = connectionString;
    }

    // Template Retrieval
    abstract getTemplate(query: Queries.TemplateQuery) : [Collections.Template];
    // User Retrieval
    abstract getUser(query: Queries.UserQuery) : [Collections.User];
    // Folder Retrieval
    abstract getFolder(query: Queries.FolderQuery) : [Collections.Folder];

    abstract encodeTemplate(template: string) : string;

}



