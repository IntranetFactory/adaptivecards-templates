import { MongoDBProvider } from './db/providers/MongoDBProvider'
import mongoose from 'mongoose'
// import { useCollection, IUser } from './models/mongo/UserModel'


// let db: MongoDBProvider = new MongoDBProvider("mongodb://127.0.0.1:27017/local?compressors=disabled&gssapiServiceName=mongodb");
let db: MongoDBProvider = new MongoDBProvider("mongodb://127.0.0.1:27017/local");
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
db.findUser();