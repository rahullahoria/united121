process.env.NODE_ENV = "testing";

import * as chai from "chai";

import { server } from "../../app";
import chaiHttp = require("chai-http");

const expect = chai.expect;
chai.use(chaiHttp);

describe("Api Users", function (): void {
  var user = {
      user:{
          //_id:"",
          mobileNumber: 919599075955,
          name:"rahul lahoria",
          password: "redhat",
          userType: "vcs"
      }
  };
  it("should be able to create user", (done: Function): void => {
    chai.request(server)
      .post("/api/users")
      .set("content-type", "application/json")
      .send(user)
      .end((err: Error, res: any): void => {
         // console.log(res.body.data);
        
        expect(res.statusCode).to.be.equal(200);
        expect(res.body.data.name).to.be.equal(user.user.name);
        user.user = res.body.data; 
        done();
      });
  });

  it("should be able to get users", (done: Function): void => {
    chai.request(server)
      .get("/api/users/"+user.user['_id'])
      .end((err: Error, res: any): void => {
        expect(res.statusCode).to.be.equal(200);
        expect(res.body.data.name).to.be.equal(user.user.name);
        done();
      });
  });
});
