import { Router, Request, Response } from "express";
import { User } from "../users/users.model";

import { resObj } from "../common/resObj";
//import { AuthRouter } from "./auth/auth.controller";
import { sendSMS, stringGen } from "../common/sendSMS";
import { Group } from "./group.model";
import { GroupMember } from "./member/member.model";
import { GroupMemberRouter } from "./member/member.controller";


export class GroupRouter {

    private router: Router = Router();

    getRouter(): Router {

        this.router.use('/group', new GroupMemberRouter().getRouter());
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
        this.router.get("/group", async (request: Request, response: Response) => {

            try {
                 console.log("==>",request.header('user-id'));
                if (request.header('user-id')) {
                    const groupObj = await Group.getByUserId(request.header('user-id').toString());
                    //  console.log("==>",authors,request.params.id);
                    response.send(resObj(200, "success", groupObj));
                }
                else
                    response.send(resObj(300, "No Group Found", null));
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
        this.router.post("/group", async (request: Request, response: Response) => {

            try {
                request.body.group['ip'] = request.headers['x-real-ip'];
                const groupObj = await Group.create(request.body.group);
                request.body.group.groupId = groupObj._id;
                request.body.group.inviteId = groupObj.userId;
                groupObj['groupMember']  = await GroupMember.create(request.body.group);
                
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