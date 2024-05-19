export const nylasClientMock = {
  auth: {
    urlForOAuth2: jest.fn().mockResolvedValue('http://example.com'),
    exchangeCodeForToken: jest.fn().mockResolvedValue({
      email: 'heyup@example.com',
      accessToken:
        'eD5xtpVe91pgBa23Od9drZlJPuTTI7Q-Zll-SlkNYEObKZv2xA-2EZ_oDLaGUZ2fhZdOvsgD7ti3h5xmn65slJwYLa9IhVXL8f1K_0MgWImf6sjfY0KC41489iPAD0LWKxpjNDGsB1DN0MkXrV5CWV2bqbRi2KcBMYS9ByyBl_I',
      grantId: '28a0ee08-c205-4250-b118-ea8e36d7d92e',
      scope:
        'openid https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/gmail.modify https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/contacts',
      expiresIn: 3600,
    }),
  },
};
