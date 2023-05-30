import { connect, connection } from 'mongoose';

const conn = {
  isConnected: false
};

export async function dbConnect() {
  if (conn.isConnected) return;

  if (!process.env.MONGODB_URI) {
    throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
  }
  const db = await connect(process.env.MONGODB_URI)

  conn.isConnected = db.connections[0].readyState;
}

connection.on("connected", () => {
  console.log("Mongo DB is Connected")
})

connection.on("error", (error) => {
  console.log("MongoDB Error:", error)
})