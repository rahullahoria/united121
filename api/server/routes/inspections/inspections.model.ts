import { mongoose } from "../../config/database";
import { Document, Model, Schema } from "mongoose";

export interface IInspection extends Document {
 // Before inspection

 userType: String;
 vehicleId: mongoose.Schema.Types.ObjectId;
 agentId: mongoose.Schema.Types.ObjectId;

 // After inspection

 sgssData: any;
 inspectionLocation: {};
 walkDirection:{};
 inspectionNumber: String;
 inspectorSummary: String;
 hmId: String;
 agentData: {};

 reportTS: {};
 active: Boolean;
 verified: Boolean;
 companyId: mongoose.Schema.Types.ObjectId;
 branchId: mongoose.Schema.Types.ObjectId;
 [reportStatusFlow:number]: any;
 reportStatusFlowDetials: any;
 
 reportStatus: String;
 hidden: {};
 hiddenAudio: {};
 deviceInformation: {};
 signature: {};
 video: any;
 vehicleImages: any;
 documentImages: any;
 impactImgs:any;
 reInspections:{};
 microProcess : any;
 formData       : {};
}

export interface IInspectionModel extends Model<IInspection> {
	getInspectionByMobile(mobileNumber: number): Promise<{  }>
}

const schema = new Schema({	
	 // Before inspection

	 userType: String,
	 vehicleId: {type: mongoose.Schema.Types.ObjectId},
	 agentId: {type: mongoose.Schema.Types.ObjectId},

	 // After inspection

	 sgssData: [],
	 inspectionLocation: {
			 // type: [Number], // [<longitude>, <latitude>]
			 // index: '2dsphere'
	 },
	 walkDirection:{},
	 inspectionNumber: String,
	 inspectorSummary: String,
	 hmId: String,
	 agentData: {},

	 reportTS: {},
	 active: Boolean,
	 verified: Boolean,
	 companyId: {type: mongoose.Schema.Types.ObjectId},
	 branchId: {type: mongoose.Schema.Types.ObjectId},
	 reportStatusFlow: [],
	 reportStatusFlowDetials: [],
	 
	 reportStatus: String,
	 hidden: {},
	 hiddenAudio: {},
	 deviceInformation: {},
	 signature: {},
	 video: [],
	 vehicleImages: [],
	 documentImages: [],
	 impactImgs:[],
	 reInspections:{},
	 microProcess : [],
	 formData       : {}
	
}, { timestamps: true });

schema.static("getInspectionByMobile", (mobileNumber: number) => {

    return Inspection
		.aggregate([{
			$lookup: {
					from: "vehicles",
					localField: "vehicleId",
					foreignField: "_id",
					as: "vehicle"
			}
	}, {
			$unwind: "$vehicle"
	},
	{
			$lookup: {
					from: "userinfos",
					localField: "vehicle.userId",
					foreignField: "_id",
					as: "vehicle.user"
			}
	}, {
			$unwind: "$vehicle.user",
	}
	 , {
			$match: {
					'vehicle.user.mobileNumber' : mobileNumber
			}
	}
	])
      .exec();
  });


export const Inspection = mongoose.model<IInspection>("Inspection", schema) as IInspectionModel;
