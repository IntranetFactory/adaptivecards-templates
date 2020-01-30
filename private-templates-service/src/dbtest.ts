import { MongoDBProvider } from './db/providers/MongoDBProvider'
import { Collections, Interface } from './db/providers/StorageProvider'
import { InMemoryDBProvider } from './db/providers/InMemoryDBProvider'
import mongoose from 'mongoose'
import fs from 'fs'
import path from 'path'
let dbFilePath:string = path.join(__dirname, "db.json");
// import { useCollection, IUser } from './models/mongo/UserModel'


// async function connectAndAddUser() {
//     db.connect()
//     .then(result => {
//         let user: Collections.User = new Collections.User("hello", "hello", "hello");
//         db.addUser(user).then(result => console.log("added"));
//     });
// }
// let db: MongoDBProvider = new MongoDBProvider("mongodb://127.0.0.1:27017/local?compressors=disabled&gssapiServiceName=mongodb");
// let db: MongoDBProvider = new MongoDBProvider("mongodb://127.0.0.1:27017/local");
// connectAndAddUser();

let db: InMemoryDBProvider = new InMemoryDBProvider();
db.importDB();
// console.log(db.users);
// console.log(db.templates);
// let user: Collections.User = new Collections.User("adaptivecards", "microsoft", "test@microsoft.com");
// db.insertUser(user);
// let user1: Collections.User = new Collections.User("adaptivecards", "microsoft", "test@microsoft.com");
// db.insertUser(user1);


// let template: Collections.Template = new Collections.Template([], [],
//                      user._id!, new Date(Date.now()), new Date(Date.now()), true);
// let template1: Collections.Template = new Collections.Template([], [], user1._id!, new Date(Date.now()), new Date(Date.now()), true);

// db.insertTemplate(template);
// db.insertTemplate(template1);

// db.exportDB();



                     

            
// let myJSON = JSON.parse("[{\"hello\": \"123\"},{\"nono\": \"1235\"}]");
// console.log(JSON.stringify(myJSON));
// console.log(myJSON[0]['hello']);

// console.log(myJSON.stringify());
// for (let key in myJSON) {
//     console.log(key, myJSON[0]);
// }
// console.log(Object.entries(myJSON));
    
// });

// console.log(user._id);
// console.log(db.users);
// if(user._id) {
//     console.log(db.getUserByID(user._id)); 
// }


// let user: Collections.User = new Collections.User("hello", "hello", "hello");
// console.log(JSON.stringify(user));

// db.addUser(user);
// db.addUser({email: "nono@microsoft.com"});
// db.getUser({email: "nono@microsoft.com", name: ""})
// db.addTemplate({})
// console.log("JOHN HELLO");
// db.addUser({teamID: ["11"], orgID: ["12"], email: "nonono@gmail.com"});
// db.addTemplate({isPublished: false, owner: "25", });
// let user: U
// let db: mongoose.Connection = mongoose.createConnection("mongodb://127.0.0.1:27017/local")
// mongoose.connect("mongodb://127.0.0.1:27017/local");
// let user: IUser = new User ({
//     _id: new mongoose.Types.ObjectId(),
//     teamID: [new mongoose.Types.ObjectId()],
//     orgID: [new mongoose.Types.ObjectId()],
//     email: "seva@microsoft.com"
// });
// user.save().then(result => {
//     console.log(result);
//     mongoose.disconnect();
// });
// console.log("hello");
// db.findUser();