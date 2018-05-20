import { mongoose } from "../../config/database";
import { Document, Model, Schema } from "mongoose";

export interface IUser extends Document {

    mobileNumber?			: number;
    faceId?			: number;
	password 				: string;
	name                    : string;
	username				: string;
	email                   : string;
	address                 : string; 
	otp						: number;
	location 				: {};
	profilePic 			    : [{ type: mongoose.Schema.Types.ObjectId }] ;
 
}

export interface IUserModel extends Model<IUser> {
    getUserByMobileAndOtp(mobileNumber: number, otp: number): Promise<{IUser}>
    getUserByEmailAndPassword(email: string, password: string): Promise<{}>
    getUserByMobileUserType(mobileNumber: number,  userType: string): Promise<{}>
    
    
//   updateUser(id: {}, description: string): Promise<{ nModified: number }>
//   updateByAge(ageLimit: number, text: string): Promise<{ ok: number, nModified: number, n: number }>
}

const schema = new Schema({	
	mobileNumber			: Number,
	faceId			: Number,
	password 				: String,
	name                    : String,
	username				: String,
	email                   : String,
	address                 : String, 
	otp						: Number,
	location 				: {},
	profilePic 			    : [{ type: mongoose.Schema.Types.ObjectId }]
	
}, { timestamps: true });

schema.static("getUserByMobileAndOtp", (mobileNumber: number, otp: number) => {

	console.log("at model",mobileNumber,otp,);

    return User
      .findOne({ 'mobileNumber': mobileNumber, 'otp': otp })
      .exec();
  });

  schema.static("getUserByEmailAndPassword", (email: string, password: string) => {

    return User
      .findOne({ 'email': email, 'password': password })
      .exec();
  });

  schema.static("getUserByMobileUserType", (mobileNumber: number, userType: string) => {

    return User
      .findOne({ 'mobileNumber': mobileNumber, 'userType': userType })
      .exec();
  });

schema.static("updateUser", (user: {}, description: string) => {

  return User
    .update({
      "_id": user
    }, {
      "$set": {
        "description": description
      }
    })
    .exec();
});

schema.static("updateByAge", (ageLimit: number, text: string) => {

  return User
    .where("age")
    .gte(ageLimit)
    .update({
      "$set": {
        description: text
      }
    })
    .exec();
});

export const User = mongoose.model<IUser>("User", schema) as IUserModel;
