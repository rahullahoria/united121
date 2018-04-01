import { mongoose } from "../../config/database";
import { Document, Model, Schema } from "mongoose";

export interface IRole extends Document {

    role: String;
    [features: number] :mongoose.Schema.Types.ObjectId;
    companyId: mongoose.Schema.Types.ObjectId ;
    branchId: mongoose.Schema.Types.ObjectId ;
}

export interface IRoleModel extends Model<IRole> {
    getById(id: mongoose.Schema.Types.ObjectId): Promise<{}>
  updateUser(id: {}, description: string): Promise<{ nModified: number }>
  updateByAge(ageLimit: number, text: string): Promise<{ ok: number, nModified: number, n: number }>
}

const schema = new Schema({	
	
	role:{
		type:String
	},
	features : [ mongoose.Schema.Types.ObjectId ],
	companyId:{
		type : mongoose.Schema.Types.ObjectId
	},
	branchId:{
		type : mongoose.Schema.Types.ObjectId
	}
	
}, { timestamps: true });

schema.static("getById", (id: mongoose.Schema.Types.ObjectId) => {

    return Role
    .aggregate([
        {
            $match:{
                "_id" : id    
            }
        }
        ,{
            $unwind:"$role"
        }
        ,
        {
            $unwind: {
                path: '$features',
                preserveNullAndEmptyArrays: true
            }
        }
        ,{
            $lookup : {
                from : "features",
                localField : "features",
                foreignField: "_id",
                // foreignField: "code",
                as : "feature"
            }
        }
        ,
        {
            $unwind: {
                path: '$feature',
                preserveNullAndEmptyArrays: true
            }
        }
        ,{
            $group: {
                _id:null,
                featureObjects: {
                    $push: '$feature'
                }
            }
        }
    ])
      .exec();
  });



export const Role = mongoose.model<IRole>("Role", schema) as IRoleModel;
