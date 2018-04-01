
// let inspections     = require(process.env.PWD + '/models/inspections');
// let vehicles        = require(process.env.PWD + '/models/vehicles');
// let users           = require(process.env.PWD + '/models/userInfo');
// let CompanyUser     = require(process.env.PWD + '/models/companyUser');
// let CompanyList     = require(process.env.PWD + '/models/companyList');
// const Request       = require('request');
// const Config        = require(process.env.PWD+ '/config.js')

// let mongoose        = require('mongoose');
// /**
// *   @param  {object}    core_data includes two key-value pairs
// *                           : b_id  [ Branch_id ]
// *                           : c_id  [ Company_id ]
// */
// function check_manual_inspection_status( core_data, notif_data ){
//     if(!notif_data.app || !core_data.b_id) {
//         throw new Error('Something is missing! Please check app_name and branch_id. These are necessary!');
//     }

//     CompanyList.findOne({ _id : core_data.b_id }, function( err, company ){
//         if( err ) throw new Error( err );
//         if( company.vcsManualInspection === 'true' ) {
//             core_data.permission = 'can-access-inspectionRequests'
//             core_data.featuresCollection = 'icpfeatures'
//             core_data.rolesCollection = 'userroles'
//         } else {
//             core_data.permission = 'can-search-inspectionList';
//             core_data.featuresCollection = 'features'
//             core_data.rolesCollection = 'manageroles'
//         }
//         // console.log( core_data );
//         users_to_notify( core_data )
//             .then( function( users ){
//                 users.length > 0 ? send_notifications( users, notif_data ) : true;
//             }, function( err ){
//                 throw new Error( err );
//             });
//     });
// }

// // It will fetch all users came under that branch who has feature and permission to access inspections
// function users_to_notify( params ) {
    
//     return new Promise( function( resolve, reject ) {
//         CompanyUser.aggregate([{
//             $match: {
//                 'companyId': mongoose.Types.ObjectId(params.b_id)
//             }
//         }
//         ,{
//             $lookup: {
//                 from: params.rolesCollection,
//                 localField: "roleId",
//                 foreignField: "_id",
//                 as: "roles"
//             }
//         }
//         , {
//             $unwind: "$roles"
//         }
//         , {
//             $unwind: "$roles.features"
//         }
//         ,{
//             $lookup: {
//                 from: params.featuresCollection,
//                 localField: "roles.features",
//                 foreignField: "_id",
//                 as: "features"
//             }
//         }, {
//             $unwind: "$features"
//         }
//         , {
//             $match : {
//                 'features.permission' : params.permission
//             }
//         }
//         , {
//             $project: {
//                 '_id': 1,
//                 'phone': "$phone"
//             }
//         }
//     ], function(err, data) {
//             if (err) reject( err );
            
//             resolve( data );
//         });

//     });
// }

// // Responsible to send POST requests to RAVEN in order two add notification for each user.
// function send_notifications( users, notif_data ) {
//     users.map( function( user ){
//         let obj = {
//             "title" : notif_data.title,
//             "body" : notif_data.body,
//             "img" : "https://www.google.com/logo.png",
//             "status" : notif_data.status,
//             "type" : [ "mobile", "web" ],
//             "urgent" : true
//         }
//         Request
//             .post( Config.__RAVEN_HOST__ + '/raven/' + user.phone + '/app/' + notif_data.app , {form: obj }, function(err,httpResponse,body){
//                 console.log( body );
//             })
//     });
// }

// module.exports = check_manual_inspection_status