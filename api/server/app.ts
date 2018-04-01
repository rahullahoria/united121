import * as express from "express";
import { json, urlencoded } from "body-parser";
import * as http from "http";
import * as path from "path";

import { PostRouter } from "./routes/post/post.controller";
import { APIDocsRouter } from "./routes/swagger";
import { AuthorRouter } from "./routes/author/author.controller";
import { UsersRouter } from "./routes/users/users.controller";
import { GroupRouter } from "./routes/group/group.controller";

const app = express();

app.use(json());
app.use(urlencoded({
  extended: true
}));

app.get("/", (request: express.Request, response: express.Response) => {

  response.json({
    name: "Express application"
  })
});

app.use((err: Error & { status: number }, request: express.Request, response: express.Response, next: express.NextFunction): void => {

  response.status(err.status || 500);
  response.json({
    error: "Server error"
  })
});

app.use("/api", new PostRouter().getRouter());
app.use("/api", new AuthorRouter().getRouter());
app.use("/api", new UsersRouter().getRouter());
app.use("/api", new GroupRouter().getRouter());
app.use("/api", new PostRouter().getRouter());

app.use("/api/swagger", new APIDocsRouter().getRouter());
app.use("/docs", express.static(path.join(__dirname, './assets/swagger')));

const server: http.Server = app.listen(process.env.PORT || 3000);

export { server };
