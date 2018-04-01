import { Router, Request, Response } from "express";
import { User } from "../users/users.model";

import { resObj } from "../common/resObj";
//import { AuthRouter } from "./auth/auth.controller";
import { sendSMS, stringGen } from "../common/sendSMS";
import { Group } from "../group/group.model";
import { Post } from "./post.model";


export class PostRouter {

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
        this.router.get("/post", async (request: Request, response: Response) => {

            try {
                 console.log("==>",request.query.groups);
                if (request.query.groups) {
                    const posts = await Post.getByGroupId(request.query.groups);
                    //  console.log("==>",authors,request.params.id);
                    response.send(resObj(200, "success", posts));
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
        this.router.post("/post", async (request: Request, response: Response) => {

            try {
                request.body.post['ip'] = request.headers['x-real-ip'];
                const postObj = await Post.create(request.body.post);

                response.send(resObj(200, "successfully Created", postObj));
            }
            catch (e) {
                e['code'] = 400;
                response.status(400).json({ status: e });

            }
        });

        this.router.put("/post", async (request: Request, response: Response) => {

            try {
                request.body.post['ip'] = request.headers['x-real-ip'];
                const postObj = await Post.create(request.body.post);

                response.send(resObj(200, "successfully Created", postObj));
            }
            catch (e) {
                e['code'] = 400;
                response.status(400).json({ status: e });

            }
        });

        return this.router;
    }
}