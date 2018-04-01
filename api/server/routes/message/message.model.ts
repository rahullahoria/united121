import { mongoose } from "../../config/database";
import { Document, Model, Schema } from "mongoose";

export interface IMessage extends Document {

    senderId: mongoose.Schema.Types.ObjectId;
    reciverId: mongoose.Schema.Types.ObjectId;
    message: string;
    ip: string;
    location: {};
    fileId: mongoose.Schema.Types.ObjectId;

}

export interface IMessageModel extends Model<IMessage> {
    getByGroupId(id: string): Promise<{}>
}

const schema = new Schema({
    
    senderId: {type:mongoose.Schema.Types.ObjectId},
    reciverId:{type: mongoose.Schema.Types.ObjectId},
    message: String,
    ip: String,
    location: {},
    fileId: {type:mongoose.Schema.Types.ObjectId}

}, { timestamps: true });

schema.static("getByGroupId", (id:string) => {

    return Message
    .aggregate([
        {
            $match:{
               groupId:{ $in: id.split(',') }
            }
        }
        
])
        .exec();
});



export const Message = mongoose.model<IMessage>("Message", schema) as IMessageModel;
