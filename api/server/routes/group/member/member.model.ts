import { mongoose } from "../../../config/database";
import { Document, Model, Schema } from "mongoose";

export interface IGroupMember extends Document {

    userId: mongoose.Schema.Types.ObjectId;
    inviteId: mongoose.Schema.Types.ObjectId;
    groupId: mongoose.Schema.Types.ObjectId;
    ip: string;
    location: {};
}

export interface IGroupMemberModel extends Model<IGroupMember> {
    //getByUserId(id: string): Promise<{}>
}

const schema = new Schema({
    
    userId: { type: mongoose.Schema.Types.ObjectId },
    inviteId: { type: mongoose.Schema.Types.ObjectId },
    groupId: { type: mongoose.Schema.Types.ObjectId },
    ip: String,
    location: {},

}, { timestamps: true });

// schema.static("getByUserId", (id:string) => {

//     return Group
//     .aggregate([
//         {
//             $match:{
//                 userId: mongoose.Types.ObjectId(id)
//             }
//         }, {
//             $lookup: {
//                 from: "groups",
//                 localField: "groupId",
//                 foreignField: "_id",
//                 as: "group"
//             }
//         }, {
//             $unwind: "$group"
//         }
        
// ])
//         .exec();
// });



export const GroupMember = mongoose.model<IGroupMember>("group-member", schema) as IGroupMemberModel;
