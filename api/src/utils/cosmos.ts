import { CosmosClient, Database, Container } from '@azure/cosmos';
import { config } from '../config';

let client: CosmosClient | null = null;
let database: Database | null = null;

export const getCosmosClient = (): CosmosClient => {
  if (!client) {
    client = new CosmosClient({
      endpoint: config.cosmosDb.endpoint,
      key: config.cosmosDb.key
    });
  }
  return client;
};

export const getDatabase = async (): Promise<Database> => {
  if (!database) {
    const client = getCosmosClient();
    const { database: db } = await client.databases.createIfNotExists({
      id: config.cosmosDb.databaseId
    });
    database = db;
  }
  return database;
};

export const getContainer = async (containerId: string): Promise<Container> => {
  const db = await getDatabase();
  const { container } = await db.containers.createIfNotExists({
    id: containerId,
    partitionKey: { paths: ['/id'] }
  });
  return container;
};
