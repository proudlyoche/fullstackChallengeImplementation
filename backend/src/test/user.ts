process.env["NODE_ENV"] = "test";

import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import config from "../config";
chai.use(chaiHttp);
require("dotenv").config();

describe("Users API Test Cases", () => {
  it("GET /api/users --> array of users", async () => {
    const res = await chai
      .request(`http://127.0.0.1:${config.port}`)
      .get("/api/users");
    expect(res.status).to.equal(200);

    const users = res.body.users;
    expect(Array.isArray(users));

    const user = users[0];
    expect(user).to.have.property("_id");
    expect(user).to.have.property("name");
    expect(user).to.have.property("email");
    expect(user).to.have.property("role");
  });

  it("POST /api/users --> validates email already exits for create user", async () => {
    const params = {
      name: "Test User",
      email: "test@test.com",
      role: "Admin",
    };

    const res = await chai
      .request(`http://127.0.0.1:${config.port}`)
      .post("/api/users")
      .send(params);

    expect(res.status).to.equal(409);
    expect(res.body).to.have.property("statusCode");
    expect(res.body).to.have.property("error");
    expect(res.body).to.have.property("message");
  });

   it("PUT /api/users --> check if email already exist when user wants to update", async () => {
    const params = {
      name: "Test User",
      email: "test2@test.com",
      role: "Admin",
      userID: "60fd93e306ba5b97079dffd8",
    };

    const res = await chai
      .request(`http://127.0.0.1:${config.port}`)
      .put("/api/users")
      .send(params);

    expect(res.status).to.equal(409);
    expect(res.body).to.have.property("statusCode");
    expect(res.body).to.have.property("error");
    expect(res.body).to.have.property("message");
  });

  it("POST /api/users --> creates a new user", async () => {
    const params = {
      name: "Test User",
      email: `${Math.random().toString(36).substring(7)}@mail.com`,
      role: "Admin",
    };

    const res = await chai
      .request(`http://127.0.0.1:${config.port}`)
      .post("/api/users")
      .send(params);

    expect(res.status).to.equal(200);

    const user = res.body.user;
    expect(user).to.have.property("_id");
    expect(user).to.have.property("name");
    expect(user).to.have.property("email");
    expect(user).to.have.property("role");
    expect(user).to.have.property("createdAt");
    expect(user).to.have.property("lastModified");
  });

  it("PUT /users --> updates a specific user", async () => {
    const params = {
      userID: "60fd93e306ba5b97079dffd8",
      name: "Test User",
      role: "Admin",
    };

    const res = await chai
      .request(`http://127.0.0.1:${config.port}`)
      .put("/api/users")
      .send(params);

    expect(res.status).to.equal(200);

    const user = res.body;
    expect(user).to.have.property("message");
    expect(user).to.have.property("user");
  });

  it("PUT /api/users --> check if id is wrong on update", async () => {
    const params = {
      userID: "60fd630c19736bb782605ee3",
      name: "Test User",
      email: `${Math.random().toString(36).substring(7)}@mail.com`,
      role: "Admin",
    };

    const res = await chai
      .request(`http://127.0.0.1:${config.port}`)
      .put("/api/users")
      .send(params);

    expect(res.status).to.equal(404);

    const user = res.body;
    expect(user).to.have.property("statusCode");
    expect(user).to.have.property("error");
    expect(user).to.have.property("message");
  });

  // it("DELETE /users/ --> deletes a specific user", async () => {
  //   const res = await chai
  //     .request(`http://127.0.0.1:${config.port}`)
  //     .delete("/api/user?useriD=60fd93e306ba5b97079dffd8")
  //     .send();

  //   expect(res.status).to.equal(200);

  //   const user = res.body;
  //   expect(user).to.have.property("message");
  // });
});
