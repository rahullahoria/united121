import { mongoose } from "../../config/database";
import { Document, Model, Schema } from "mongoose";

export interface IPost extends Document {

    userId: mongoose.Schema.Types.ObjectId;
    parentId: mongoose.Schema.Types.ObjectId;
    groupId: mongoose.Schema.Types.ObjectId;
    sayAbuseUsersId:any;
    sayGreatUsersId: any;
    sayOkUsersId: any;
    title: string;
    text: string;
    ip: string;
    location: {};
    img: mongoose.Schema.Types.ObjectId;

}

export interface IPostModel extends Model<IPost> {
    getByGroupId(id: string): Promise<IPost[]>
}

const schema = new Schema({
    
    userId: {type: mongoose.Schema.Types.ObjectId},
    groupId: {type: mongoose.Schema.Types.ObjectId},
    parentId: {type:mongoose.Schema.Types.ObjectId},
    sayAbuseUsersId: {type:mongoose.Schema.Types.ObjectId},
    sayGreatUsersId:{type:mongoose.Schema.Types.ObjectId},
    sayOkUsersId:{type: mongoose.Schema.Types.ObjectId},
    title: String,
    text: String,
    ip: String,
    location: {},
    img: {type:mongoose.Schema.Types.ObjectId}

}, { timestamps: true });

schema.static("getByGroupId", (id:string) => {
    console.log(id,id.split(','))
    var groupIds = id.split(',');
    var t = [];
    for(var i =0;i<groupIds.length;i++)
        t.push(mongoose.Types.ObjectId(groupIds[i]));

    return Post
    .aggregate([
        {
            $match:{
               groupId:{ $in: t }
            }
        },
        { "$sort": {'updatedAt': -1} },
        {"$skip":0}
        ,
        
        // Optionally limit results
        { "$limit":50 }

        
])
        .exec();
});



export const Post = mongoose.model<IPost>("Post", schema) as IPostModel;
