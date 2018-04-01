import * as express from "express";
import { json, urlencoded } from "body-parser";
import * as http from "http";
import * as path from "path";
import * as cors from "cors";

import { PostRouter } from "./routes/post/post.controller";
import { APIDocsRouter } from "./routes/swagger";
import { AuthorRouter } from "./routes/author/author.controller";
import { UsersRouter } from "./routes/users/users.controller";
import { GroupRouter } from "./routes/group/group.controller";

const app = express();

// //options for cors midddleware
// const options:cors.CorsOptions = {
//   allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
//   credentials: true,
//   methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
//   origin: 'api.united121.shatkonlabs.com',
//   preflightContinue: false
// };

// //use cors middleware
// app.use(cors(options));

// //add your routes

// //enable pre-flight
// app.options("*", cors(options));

app.use( function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
  next();
});

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
