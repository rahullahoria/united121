process.env.NODE_ENV = "testing";

import * as chai from "chai";

import { server } from "../../app";
import chaiHttp = require("chai-http");

const expect = chai.expect;
chai.use(chaiHttp);

describe("Api Author", function (): void {
  var resPost = null;
  it("should be able to create user", (done: Function): void => {
    chai.request(server)
      .post("/api/author")
      .set("content-type", "application/json")
      .send({
        name: "Someone",
        description: "..."
      })
      .end((err: Error, res: any): void => {
        resPost = res.body; 
        expect(res.statusCode).to.be.equal(200);
        expect(res.body.name).to.be.equal("Someone");
        done();
      });
  });

  it("should be able to get users", (done: Function): void => {
    chai.request(server)
      .get("/api/author/"+resPost._id)
      .end((err: Error, res: any): void => {
        console.log("/api/author/"+resPost._id);
        expect(res.statusCode).to.be.equal(200);
        expect(res.body.name).to.be.equal("Someone");
        done();
      });
  });
});
