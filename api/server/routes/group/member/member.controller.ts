import { Router, Request, Response } from "express";
import { User } from "../../users/users.model";

import { resObj } from "../../common/resObj";
//import { AuthRouter } from "./auth/auth.controller";
import { sendSMS, stringGen } from "../../common/sendSMS";
import { Group } from "../group.model";
import { GroupMember } from "./member.model";


export class GroupMemberRouter {

    private router: Router = Router();

    getRouter(): Router {

        // this.router.use('/:userId/auth', new AuthRouter().getRouter());
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
        // this.router.get("/group", async (request: Request, response: Response) => {

        //     try {
        //         //  console.log("==>",request.params.id);
        //         if (request.header['user-id']) {
        //             const groupObj = await Group.getByUserId(request.header['user-id']);
        //             //  console.log("==>",authors,request.params.id);
        //             response.send(resObj(200, "success", groupObj));
        //         }
        //         else
        //             response.send(resObj(300, "No Group Found", null));
        //     }
        //     catch (e) {
        //         e['code'] = 400;
        //         response.status(400).json({ status: e });

        //     }
        // });

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
        this.router.post("/:groupId/group_member", async (request: Request, response: Response) => {

            try {
                var user = await User.findOne({mobileNumber:request.body.groupMember.mobileNumber}).exec();
                if(!user) {
                    user = await User.create({mobileNumber:request.body.groupMember.mobileNumber});
                    //console.log("user",userObj);
                    var msg = encodeURI('Hi!\nYou got invided by ' + request.body.groupMember.name + ' to join your interest group '+ request.body.groupMember.groupName + "\nhttp://goo.gl/asdfsaf") ;
                    sendSMS(request.body.groupMember.mobileNumber,msg);
                }
                request.body.groupMember['ip'] = request.headers['x-real-ip'];
                request.body.groupMember['userId'] = user._id;
                const groupObj = await GroupMember.create(request.body.groupMember);

                response.send(resObj(200, "successfully Created", groupObj));
            }
            catch (e) {
                e['code'] = 400;
                response.status(400).json({ status: e });

            }
        });

        return this.router;
    }
}