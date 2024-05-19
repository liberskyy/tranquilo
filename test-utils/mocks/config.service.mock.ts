export const mockConfigService = {
  get: (key: string) => {
    switch (key) {
      case 'NYLAS_REDIRECT_URI':
        return 'http://localhost:3000/nylas/callback';
      case 'NYLAS_CLIENT_ID':
        return 'nylas-client-id';
      case 'NYLAS_API_KEY':
        return 'nylas-api-key';
      default:
        throw new Error(`Config key ${key} not found`);
    }
  },
};
