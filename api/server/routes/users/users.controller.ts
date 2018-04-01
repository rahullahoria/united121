import { Router, Request, Response } from "express";
import { User } from "./users.model";

import { resObj } from "../common/resObj";
import { AuthRouter } from "./auth/auth.controller";
import { sendSMS,stringGen } from "../common/sendSMS";

export class UsersRouter {

    private router: Router = Router();

    getRouter(): Router {

        this.router.use('/users', new AuthRouter().getRouter());
        /**
         * @swagger
         * /api/users:
         *   get:
         *     tags:
         *      - Author
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
        this.router.get("/users/:id", async(request: Request, response: Response) => {

            try{
                //  console.log("==>",request.params.id);
                  const userObj = await User.findOne({_id:request.params.id}).exec();
                //  console.log("==>",authors,request.params.id);
                  response.send(resObj(200, "OTP matched.",userObj));
              }
              catch(e){
                  e['code'] = 400;
                  response.status(400).json({status:e});
      
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
        this.router.post("/users", async(request: Request, response: Response) => {

            try{
                request.body.user.otp = parseInt(stringGen(6));
            const userObj = await User.create(request.body.user);
            //console.log("user",userObj);
            var msg = encodeURI('Hey! ' + request.body.user.otp  + ' is your OTP for this session\nBy United121' ) ;
            sendSMS(request.body.user.mobileNumber,msg);
            
            response.send(resObj(200, "successfully Created",userObj));
            }
            catch(e){
                e['code'] = 400;
                response.status(400).json({status:e});

            }
        });

        return this.router;
    }
}