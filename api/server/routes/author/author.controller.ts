import { Router, Request, Response } from "express";
import { Author } from "./author.model";

export class AuthorRouter {

    private router: Router = Router();

    getRouter(): Router {

        /**
         * @swagger
         * /api/author/:id:
         *   get:
         *     tags:
         *      - Author
         *     description:
         *      List of all authors registered in system.
         *     produces:
         *       - application/json
         *     responses:
         *       200:
         *         description: Authors
         *       400:
         *         description: Invalid request
         *       403:
         *         description: Forbidden
         */
        this.router.get("/author/:id", async(request: Request, response: Response) => {
            try{
          //  console.log("==>",request.params.id);
            const authors = await Author.findOne({_id:request.params.id}).exec();
          //  console.log("==>",authors,request.params.id);
            response.json(authors);
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
        this.router.post("/author", async(request: Request, response: Response) => {

            try{
            const author = await Author.create(request.body);

            response.status(200).json(author);
            }
            catch(e){
                e['code'] = 400;
                response.status(400).json({status:e});

            }
        });

        return this.router;
    }
}