import { mongoose } from "../../config/database";
import { Document, Model, Schema } from "mongoose";
import { GroupMember } from "./member/member.model";

export interface IGroup extends Document {

    userId: mongoose.Schema.Types.ObjectId;
    ip: string;
    name: string;
    location: {};
    img: mongoose.Schema.Types.ObjectId;

}

export interface IGroupModel extends Model<IGroup> {
    getByUserId(id: string): Promise<IGroup[]>
}

const schema = new Schema({
    
    userId: { type: mongoose.Schema.Types.ObjectId },
    ip: String,
    name: String,
    location: {},
    img: { type: mongoose.Schema.Types.ObjectId }

}, { timestamps: true });

schema.static("getByUserId", (id:string) => {
    console.log("group by id",id);
    return GroupMember
    .aggregate([
        {
            $match:{
                userId: mongoose.Types.ObjectId(id)
            }
        }, {
            $lookup: {
                from: "groups",
                localField: "groupId",
                foreignField: "_id",
                as: "group"
            }
        }, {
            $unwind: "$group"
        }
        
])
        .exec();
});



export const Group = mongoose.model<IGroup>("Group", schema) as IGroupModel;
