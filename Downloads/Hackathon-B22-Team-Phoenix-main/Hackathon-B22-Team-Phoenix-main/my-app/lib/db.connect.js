import mongoose from "mongoose";
mongoose.set('strictQuery', true);
const MONGO_URL = "mongodb+srv://salemes:salemes@cluster0.8hhyd86.mongodb.net/SchoolApps?retryWrites=true&w=majority";
console.log(MONGO_URL);
if (!MONGO_URL) {
    throw new Error(
      "Please define the MONGODB_URI environment variable inside .env.local"
    );
  }
    
  let cashed = global.mongoose;
  if (!cashed) {
    cashed = global.mongoose = { conn: null, promise: null };
  }
  async function dbConnect() {
    if (cashed.conn) {
      return cashed.conn;
    }
    if (!cashed.conn) {
      const opts = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      };
      cashed.promise = mongoose.connect(MONGO_URL, opts).then((mongoose) => {
        return mongoose;
      });
    }
    cashed.conn = await cashed.promise;
    return cashed.conn;
  }
  export default dbConnect;