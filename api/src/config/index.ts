export const config = {
  cosmosDb: {
    endpoint: process.env.COSMOS_DB_ENDPOINT || '',
    key: process.env.COSMOS_DB_KEY || '',
    databaseId: 'mackprojekt',
    containers: {
      users: 'users',
      contacts: 'contacts',
      sessions: 'sessions'
    }
  },
  jwt: {
    secret: process.env.JWT_SECRET!,
    expiresIn: '7d'
  },
  email: {
    connectionString: process.env.COMMUNICATION_SERVICES_CONNECTION_STRING || '',
    senderAddress: process.env.SENDER_EMAIL || 'noreply@mackprojekt.com'
  },
  appInsights: {
    connectionString: process.env.APPLICATIONINSIGHTS_CONNECTION_STRING || ''
  }
};

// Validate required environment variables
if (!config.jwt.secret || config.jwt.secret === '') {
  throw new Error('JWT_SECRET environment variable is required');
}

if (!config.cosmosDb.endpoint || !config.cosmosDb.key) {
  throw new Error('COSMOS_DB_ENDPOINT and COSMOS_DB_KEY environment variables are required');
}
