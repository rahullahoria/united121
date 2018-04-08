import { Router, Request, Response } from "express";
import { User } from "../users.model";
import { resObj } from "../../common/resObj";
import { Inspection } from "../../inspections/inspections.model";
import { Role } from "../../roles/roles.model";
import bcrypt = require('bcryptjs');


export class AuthRouter {

    private router: Router = Router();
    // checkUserAuth(user, t, i,req) {
    //     return new Promise( function( resolve, reject ){
    //     bcrypt.compare(req.body.password, user.password, function(err, isMatch) {
    //         if (isMatch) {
    //             //console.log("users[i] ===>>>", user, t, i);
    //             resolve(user);
                
    //         } else if (t == i - 1 && !isMatch) {
    //             resolve("No Data")
    //         }else
    //         resolve(0);
    //     });
    // });
    // }

    getRouter(): Router {


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
        this.router.post("/:id/auth", async(req: Request, res: Response) => {

            
                try {
                console.log(req.params, req.headers);
                    if(req.query.type == "otp"){
                        
                        //console.log((req.params.userId+"").length);
                        
                        if((req.params.userId+"").length <= 10) 
                                    req.params.userId = '91' + req.params.userId;
                        console.log("otp>>>>",req.params,
        
                                    JSON.stringify({ 'mobileNumber': req.params.id*1, 'otp': req.body.otp*1 }));

                        var userObj = await User.getUserByMobileAndOtp(req.params.id,req.body.otp);
                        console.log(userObj);
                        if(userObj){
                                res.send(resObj(200, "OTP matched.", userObj));
                            

                        }
                        else{
                            res.send(resObj(204, "OTP not matched.", userObj));
                        }
                        
                    }
                } catch (e) {
                    e['code'] = 400;
                    res.status(400).json({status:e});
                }
            
        });

        return this.router;
    }
}