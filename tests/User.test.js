import mongoose from "mongoose";
import User from "../models/user.model.js";
require("dotenv").config();

describe("User Model", () => {
  beforeAll(async () => {
    // Mongo DB Connesction
    mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoIndex: true, //make this also true
      dbName: process.env.DB_NAME,
    });
  });

  afterAll(async () => {
    // Close connection after the automatic test
    await mongoose.connection.close();
  });

  it("should save a new user", async () => {
    // Create new user
    const newUser = new User({
      userName: "CrisEsp1",
      isBlocked: false,
      email: "cris_esp1@gmail.com",
      password: "Cris1234.",
      ptrRol: "6451f22a0e8703af7a4a87b7",
      tryNum: "",
    });

    // Save user in the database
    const savedUser = await newUser.save();

    // Verify that the data you put as the test values are the same
    expect(savedUser._id).toBeDefined();
    expect(savedUser.userName).toBe("CrisEsp1");
    expect(savedUser.isBlocked).toBe(false);
    expect(savedUser.email).toBe("cris_esp1@gmail.com");
    expect(savedUser.password).not.toBe("Cris1234.");
  });

  it("should not save a user with an invalid email address", async () => {
    // Create user with an invalid email
    const newUser = new User({
      userName: "testuser",
      isBlocked: false,
      email: "invalidemail",
      password: "Test1234!",
    });

    // Save the user in the database
    let savedUser;
    try {
      savedUser = await newUser.save();
    } catch (error) {
      // Verify that this submission returns an error
      expect(error).toBeDefined();
    }

    // Verify that the user isn't in the database
    expect(savedUser).toBeUndefined();
  });
});
