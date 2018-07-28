import { Router, Request, Response } from "express";
import { User } from "./users.model";

import { resObj } from "../common/resObj";
import { AuthRouter } from "./auth/auth.controller";
import { sendSMS, stringGen } from "../common/sendSMS";
import { getFaceId } from "../common/getFaceId";
var reqOut = require('request');

export class UsersRouter {

    private router: Router = Router();

    getRouter(): Router {

        this.router.use('/users', new AuthRouter().getRouter());
        /**
         * @swagger
         * /api/users/:id:
         *   get:
         *     tags:
         *      - Users
         *     description:
         *      List of all users registered in system.
         *     produces:
         *       - application/json
         *     responses:
         *       200:
         *         description: Users
         *       400:
         *         description: Invalid request
         *       403:
         *         description: Forbidden
         */
        this.router.get("/users/:id", async (request: Request, response: Response) => {

            try {
                //  console.log("==>",request.params.id);
                if(request.query.faceId){

                    let u = await User.findOne({ faceId: request.query.faceId }).exec();
                    if(u){
                        return response.send(resObj(200, "successfully found", u));
                    }
                    else{
                        return response.send(resObj(200, "not found", {}));
                    }

                }
                const userObj = await User.findOne({ _id: request.params.id }).exec();
                //  console.log("==>",authors,request.params.id);
                response.send(resObj(200, "OTP matched.", userObj));
            }
            catch (e) {
                e['code'] = 400;
                response.status(400).json({ status: e });

            }
        });

        /**
         * @swagger
         * /api/author:
         *   post:
         *     tags:
         *      - Author
         *     description:
         *      Create new author.
         *     produces:
         *       - application/json
         *     parameters:
         *       - name: author
         *         in: body
         *         description: The author to create.
         *         schema:
         *          required:
         *              - name
         *          properties:
         *              name:
         *                  type: string
         *              age:
         *                  type: string
         *              description:
         *                  type: string
         *       - in: header
         *         name: app-type
         *         type: string
         *         required: true
         *          
         *     responses:
         *       200:
         *         description: Author
         *       400:
         *         description: Invalid request
         *       403:
         *         description: Forbidden
         */
        this.router.post("/users", async (request: Request, response: Response) => {

            try {
                if (request.body.user.faceUrl) {
                    // var res = await getFaceId(request.body.user.faceUrl);
                    // console.log("==>",request.body.user,res);

                    reqOut('http://jessica.livechek.com/api/find_face/?faceUrl='+encodeURIComponent(request.body.user.faceUrl), async function (error, respOut, body) {
    
                    
                        request.body.user.faceId = JSON.parse(body)['faceId'];
                        console.log("==>",request.body.user,body);
                        
                        const userObj = await User.findOne({ faceId: request.body.user.faceId }).exec();
                        if(userObj){
                            response.send(resObj(200, "OTP matched.", userObj));
                            User.update(
                                "_id",
                                userObj._id,
                                { $addToSet: { profilePic: request.body.user.profilePic } }
                              );
                        }
                        else{
    
                            if(request.body.user.mobileNumber){
                                const userObj = await User.findOneAndUpdate({ "mobileNumber": request.body.user.mobileNumber }, { $set: request.body.user }, { upsert: true });
                                //console.log("user",userObj);
                                if (userObj) {
                                  //  var msg = encodeURI('Hey! ' + request.body.user.otp + ' is your OTP for this session\nBy United121');
                                    //sendSMS(request.body.user.mobileNumber, msg);
            
                                    response.send(resObj(200, "successfully Created", userObj));
            
                                } else 
                                    response.status(400).json({ status: { code: 400 } });
                                
                            }else 
                            response.status(400).json({ status: { code: 400 } });
                        
    
                        }
                    });
                  
                    

                }
                else {
                    request.body.user.otp = parseInt(stringGen(6));
                    if ((request.body.user.mobileNumber + "").length <= 10)
                        request.body.user.mobileNumber = '91' + request.body.user.mobileNumber;
                    const userObj = await User.findOneAndUpdate({ "mobileNumber": request.body.user.mobileNumber }, { $set: request.body.user }, { upsert: true });
                    //console.log("user",userObj);
                    if (userObj) {
                        var msg = encodeURI('Hey! ' + request.body.user.otp + ' is your OTP for this session\nBy United121');
                        sendSMS(request.body.user.mobileNumber, msg);

                        response.send(resObj(200, "successfully Created", userObj));

                    } else {
                        response.status(400).json({ status: { code: 400 } });
                    }
                }
            }
            catch (e) {
                e['code'] = 400;
                response.status(400).json({ status: e });

            }

        });

        return this.router;
    }
}