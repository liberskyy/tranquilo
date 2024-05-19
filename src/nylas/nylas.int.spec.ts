import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { NylasModule } from './nylas.module';
import { NylasClientSymbol } from './nylas.client';
import { TestModule } from '../../test-utils/test.module';
import { clearAllTables, makeRequest } from '../../test-utils/test.utils';
import { PrismaClientService } from '../prisma-client/prisma-client.service';
import { nylasClientMock } from '../../test-utils/mocks/nylas-client.mock';
import { nylasWebhookPayload } from '../../test-utils/mocks/nylas-webhook-payload.mock';

describe('/nylas', () => {
  let app: INestApplication;
  let prismaClient: PrismaClientService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [TestModule, NylasModule],
    })
      .overrideProvider(NylasClientSymbol)
      .useValue(nylasClientMock)
      .compile();

    app = moduleRef.createNestApplication();
    prismaClient = moduleRef.get<PrismaClientService>(PrismaClientService);
    await app.init();
  });

  afterEach(async () => {
    await clearAllTables(prismaClient);
  });

  describe('GET /auth', () => {
    it('should redirect to the auth URL returned by the Nylas client', async () => {
      const authUrl =
        'https://api.eu.nylas.com/v3/connect/auth?client_id=1cae92a0-60f3-41a6-9b1c-33074cafa5f6&redirect_uri=http://localhost:3000/nylas/oauth/exchange&access_type=online&response_type=code&scope=event.created';
      nylasClientMock.auth.urlForOAuth2.mockResolvedValueOnce(authUrl);

      const response = await makeRequest(app).get('/nylas/auth');

      expect(response.status).toBe(302);
      expect(response.header.location).toBe(authUrl);
    });
  });

  describe('GET /oauth/exchange', () => {
    const code = '28a0ee08-c205-4250-b118-ea8e36d7d92e';
    it('should return 404 when code is not provided in query params', async () => {
      const response = await makeRequest(app).get('/nylas/oauth/exchange');

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Code not found in query params');
    });

    it('should exchange the code for an access token', async () => {
      const response = await makeRequest(app).get(
        `/nylas/oauth/exchange?code=${code}`,
      );
      const mockAuthResponse =
        await nylasClientMock.auth.exchangeCodeForToken();

      expect(response.status).toBe(200);

      const dbRecord = await prismaClient.grants.findFirst({
        where: { grantId: mockAuthResponse.grantId },
      });
      expect(dbRecord).toMatchObject({
        email: mockAuthResponse.email,
        accessToken: mockAuthResponse.accessToken,
        grantId: mockAuthResponse.grantId,
        expiresIn: mockAuthResponse.expiresIn,
        scope: mockAuthResponse.scope,
      });
    });
  });

  describe('GET /webhook', () => {
    it("should return the challenge string provided in the 'challenge' query param", async () => {
      const challenge = 'challenge-string';
      const response = await makeRequest(app).get(
        `/nylas/webhook?challenge=${challenge}`,
      );

      expect(response.status).toBe(200);
      expect(response.text).toBe(challenge);
    });
  });

  describe('POST /webhook', () => {
    it('should save email data to the database', async () => {
      const response = await makeRequest(app)
        .post('/nylas/webhook')
        .send(nylasWebhookPayload);

      expect(response.status).toBe(HttpStatus.OK);

      const dbRecord = await prismaClient.emails.findFirst({
        where: { grantId: nylasWebhookPayload.data.object.grant_id },
      });
      expect(dbRecord).toMatchObject({
        source: nylasWebhookPayload.source,
        emailBody: nylasWebhookPayload.data.object.body,
        type: nylasWebhookPayload.type,
        folders: nylasWebhookPayload.data.object.folders.join(','),
        grantId: nylasWebhookPayload.data.object.grant_id,
        from: `${nylasWebhookPayload.data.object.from[0].email}:${nylasWebhookPayload.data.object.from[0].name}`,
        to: `${nylasWebhookPayload.data.object.to[0].email}:null`,
        subject: nylasWebhookPayload.data.object.subject,
        threadId: nylasWebhookPayload.data.object.thread_id,
        unread: nylasWebhookPayload.data.object.unread,
      });
    });
  });
});
