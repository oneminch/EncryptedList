import { type Client, createClient } from "@libsql/client";

let client: Client | null = null;

const getDBClient = () => {
  if (!client) {
    client = createClient({
      url: process.env.TURSO_DATABASE_URL!,
      authToken: process.env.TURSO_AUTH_TOKEN!
    });
  }
  return client;
};

export default getDBClient;
