import {Queries, Collections, StorageProvider, Interface} from './StorageProvider'
import fs from 'fs'
import path from 'path'

const dbFilePath = path.join(__dirname);
const MAX_TRY_COUNT = 5;  //  Maximum numebr of attempts in case of failure
const usersPath: string = path.join(dbFilePath, 'users.json');
const templatesPath: string = path.join(dbFilePath, 'templates.json');
const options = {
    encoding: 'utf8'
}; 
  
// uuidv4
function generateUniqueID() : string{
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
  }

export class InMemoryDBProvider {
    users: Map<string, Collections.User> = new Map();
    templates: Map<string, Collections.Template> = new Map();
    readTryCount: number = 0;
    writeTryCount: number = 0;
    
    constructor() {}

    insertTemplate(template: Collections.Template) {
        if(!template._id) {
            template._id = generateUniqueID();
        }
        this.templates.set(template._id, template);
    }

    insertUser(user: Collections.User) {
        if(!user._id) {
            user._id = generateUniqueID()
        }
        this.users.set(user._id, user);

    }

    getTemplateById(_id: string) : Collections.Template | undefined {
        if(this.templates.has(_id)) {
            return this.templates.get(_id);
        }
        throw(new ErrorEvent("No template with id " + _id + " exists"));
    }

    getTemplateByOwnerID(ownerID: string) : Collections.Template {
        this.templates.forEach((template: Collections.Template, key: string) => {
            if(template.owner === ownerID) {
                return template
            }
        })

        throw(new ErrorEvent("No template with ownerID " + ownerID + " exists"));

    }

    getUserByEmail(email: string) : Collections.User {
        this.users.forEach((user: Collections.User, key: string) => {
            if(user.email === email) {
                return user;
            }
        })

        throw(new ErrorEvent("No user with email " + email + " exists"));

    }

    getUserByID(_id: string) {
        if(this.users.has(_id)) {
            return this.users.get(_id);
        }
        throw(new ErrorEvent("No user with id " + _id + " exists"));
    }

    exportUsers() {
        let data: string = JSON.stringify(Array.from(this.users.values()));

        fs.writeFile(usersPath, data, options, (err) => {
            if(err) {
                if(this.readTryCount < MAX_TRY_COUNT){
                    this.readTryCount += 1;
                    setTimeout(this.importDB, 1000); //  let's try again 1s later
                }
                else {
                    throw(new ErrorEvent("Cannot write to DB."));  //  raise the error
                }
            }
            console.log("Successfully written  templates to DB.");
        }); 
    }

    exportTemplates() {
        let data: string = JSON.stringify(Array.from(this.templates.values()));

        fs.writeFile(templatesPath, data, options, (err) => {
            if(err) {
                if(this.readTryCount < MAX_TRY_COUNT){
                    this.readTryCount += 1;
                    setTimeout(this.importDB, 1000); //  let's try again 1s later
                }
                else {
                    throw(new ErrorEvent("Cannot write to DB."));  //  raise the error
                }
            }
            console.log("Successfully written Users to DB.");
        }); 
    }


    importUsers() {
        fs.readFile(usersPath, (err, data) => {
            if(err){
                if(this.readTryCount < MAX_TRY_COUNT){
                    this.readTryCount += 1;
                    setTimeout(this.importDB, 1000); //  let's try again 1s later
                }
                else {
                    throw(new ErrorEvent("Cannot import from json: Read failed"));  //  raise the error
                }
            }
            try{
                let j: Array<Collections.User> = JSON.parse(data.toString());
                j.forEach(value => {
                    if(value._id) {
                        this.users.set(value._id, value);
                    } else {
                        throw(new ErrorEvent(
                            "Cannot import user because it doesn't have an id: " + value)
                        );
                    }
                });
                console.log(this.users);


            }
            catch(e){
                throw e;  //  bad data?
            }

        });
        console.log("here");
    }

    importTemplates() {
        fs.readFile(templatesPath, (err, data) => {
            if(err){
                if(this.readTryCount < MAX_TRY_COUNT){
                    this.readTryCount += 1;
                    setTimeout(this.importDB, 1000); //  let's try again 1s later
                }
                else {
                    throw(new ErrorEvent("Cannot import from json: Read failed"));  //  raise the error
                }
            }
            try{
                let j: Array<Collections.Template> = JSON.parse(data.toString());
                j.forEach(value => {
                    if(value._id) {
                        console.log(value._id);
                        this.templates.set(value._id, value);
                    } else {
                        throw(new ErrorEvent(
                            "Cannot import user because it doesn't have an id: " + value)
                        );
                    }
                })

            }
            catch(e){
                throw e;  //  bad data?
            }

        });
    }

    importDB() {
        this.importUsers();
        this.importTemplates();
        console.log("helo");
      
    }

    exportDB() {
        this.exportUsers();
        this.exportTemplates();

    }
}