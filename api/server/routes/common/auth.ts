const UserInfo = require('../models/userInfo.js');

// RANDOM STRING GENERATOR
let randomString = function(len) {
	var text = "";
	var charset = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
	for (var i = 0; i < len; i++)
	  text += charset.charAt(Math.floor(Math.random() * charset.length));
	return text;
}

// Validate Header Values
let validate_header_inputs 	= function( params ) {
	return new Promise( function( resolve, reject ) {
		// Not validating them right now
		let isValid = true;
		isValid ? resolve() : reject();
	});
}

let check_user = function( params ) {

	if( params.req_type === 'mobile' ) {
		
	if ((params.id + "").length <= 10) params.id = "91" +  params.id;
        
		var query = { mobileNumber : params.id }
	} else if( params.req_type === 'email' ) {
		var query = { email : params.id }
	}

	function logging_new_user() {
		let newAppKey = {
			hash : randomString(26),
			expiry : new Date()
		}
		// Update User( params.mobile, newAppKey );
		return true
	}

	return new Promise( function( resolve, reject ) {
		UserInfo.findOne( query , function( err, user ){
			if( user === null ) {
				reject( 'User not found!' );
			} else {
				if( !user.appKey ) {
					logging_new_user() ? resolve( 'success' ) : reject( 'failed' );
				} else {
					user.appKey.hash === params.appKey ? resolve('loggedin') : logging_new_user() ? resolve('success') : reject('failure');
				}
			}
		});
	});
}

let unauthorized_user = function(req, res, response) {
	let default_message = response || 'The authentication credentials are missing, or if supplied are not valid or not sufficient to access the resource.';
	// Unauthorized access
	res.status( 401 ).send({
		status : {
			code : 401,
			message : default_message
		},
		data : []
	})
}

let __main = function( req, res, next ) {

	let params = {
		appKey : req.headers['app-key'],	
	}

	/** Filtering Request Type
	* 	If there is @mobile present in the header, then we will search for mobile into DB
	*	Else we will search for @email
	*/
	if( req.headers.mobile ) {
		params.req_type = 'mobile',
		params.id = req.headers.mobile
	} else if( req.headers.email ){
		params.req_type = 'email',
		params.id = req.headers.email
	}

	if( params.id && params.appKey ) {

		// Validate Header Inputs
		validate_header_inputs( params )
			.then( function(resolve){
				return check_user( params );
			})
			.then( function( response ) {
				// This function will only call when the request if verified, but still for double check
				// Opening gates for the request
				if( response === 'success' ){
					console.log('AIP-KEY Renewed');
					next();
				} else if( response === 'loggedin' ) {
					console.log('Already logged In')
					next();
				}
			}).catch( function( e ) { unauthorized_user( req, res, e ); }); // Handle all type of Rejected Promises
			
	} else { unauthorized_user( req, res ); }
}

module.exports = {
	validate : __main
}