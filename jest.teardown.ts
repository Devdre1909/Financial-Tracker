import mongoose from "mongoose";

module.exports = async () => {
  console.log("I'll be called first before any test cases run");
  //add in what you need to do here

  let connection: typeof mongoose;

  beforeAll(async () => {
    connection = await mongoose.connect("mongodb://localhost:27017/test", {});
  });

  afterAll(async () => {
    await connection.disconnect();
  });

  afterEach(async () => {
    await connection.connection.dropDatabase();
  });
};
