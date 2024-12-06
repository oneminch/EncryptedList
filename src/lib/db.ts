import { Client, createClient } from "@libsql/client";

let client: Client | null = null;

export function getDBClient() {
  if (!client) {
    client = createClient({
      url: process.env.TURSO_DATABASE_URL!,
      authToken: process.env.TURSO_AUTH_TOKEN!
    });
  }
  return client;
}
