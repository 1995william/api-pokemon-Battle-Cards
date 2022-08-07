import mongoose from "mongoose";

export const dbConnect = async () => {
  const dbUser = process.env.MONGO_USER;
  const dbPassword = process.env.MONGO_PASSWORD;
  const dbCluster = process.env.MONGO_CLUSTER;
  const dbCollection = process.env.MONGO_COLLECTION;
  const mongoUrl = `mongodb+srv://${dbUser}:${dbPassword}@${dbCluster}/${dbCollection}`;

  try {
    await mongoose.connect(mongoUrl);
    console.log("connected with the database");
  } catch (error) {
    console.error("error connecting to database", error);
  }
};
