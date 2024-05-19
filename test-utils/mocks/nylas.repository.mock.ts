export const nylasRepositoryMock = {
  saveGrant: jest.fn().mockResolvedValue({
    email: 'email@email.com',
    accessToken: 'accessToken',
    grantId: 'grantId',
    expiresIn: 3600,
    scope: 'scope',
  }),
};
