export const nylasServiceMock = {
  getUrlForOAuth2: jest
    .fn()
    .mockResolvedValue(
      'https://api.eu.nylas.com/v3/connect/auth?client_id=1cae92a0-60f3-41a6-9b1c-33074cafa5f6&redirect_uri=http://localhost:3000/nylas/oauth/exchange&access_type=online&response_type=code&scope=event.created',
    ),
  exchangeCodeForToken: jest
    .fn()
    .mockResolvedValue('28a0ee08-c205-4250-b118-ea8e36d7d92e'),
};
