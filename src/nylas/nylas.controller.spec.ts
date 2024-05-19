import { Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { NylasController } from './nylas.controller';
import { NylasService } from './nylas.service';
import { EmailParserService } from '../email-parser/email-parser.service';
import { nylasServiceMock } from '../../test-utils/mocks/nylas-service.mock';
import { Response } from 'express';
import { emailParserServiceMock } from '../../test-utils/mocks/email-parser.service.mock';
import { nylasWebhookPayload } from '../../test-utils/mocks/nylas-webhook-payload.mock';

describe('NylasController', () => {
  let nylasController: NylasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NylasController],
      providers: [NylasService, EmailParserService, Logger],
    })
      .overrideProvider(NylasService)
      .useValue(nylasServiceMock)
      .overrideProvider(EmailParserService)
      .useValue(emailParserServiceMock)
      .compile();

    nylasController = module.get<NylasController>(NylasController);
  });

  describe('nylasAuth', () => {
    it('should redirect to the auth URL returned by the Nylas service', async () => {
      const mockRes = {
        redirect: jest.fn(),
      };

      await nylasController.nylasAuth(mockRes as unknown as Response);

      expect(mockRes.redirect).toHaveBeenCalledWith(
        await nylasServiceMock.getUrlForOAuth2(),
      );
    });
  });

  describe('nylasOAuthExchange', () => {
    const code = '28a0ee08-c205-4250-b118-ea8e36d7d92e';

    it('should return the grant ID when code is provided in query params', async () => {
      const response = await nylasController.nylasOAuthExchange(code);

      const expectedResponse = {
        grantId: await nylasServiceMock.exchangeCodeForToken(code),
      };

      expect(response).toEqual(expectedResponse);
    });

    it('should throw a NotFoundException when code is not provided in query params', async () => {
      await expect(nylasController.nylasOAuthExchange('')).rejects.toThrow(
        'Code not found in query params',
      );
    });
  });

  describe('nylasWebhookChallenge', () => {
    it('should return the challenge string provided in the "challenge" query param', async () => {
      const challenge = 'challenge-string';
      const response = await nylasController.nylasWebhookChallenge(challenge);

      expect(response).toBe(challenge);
    });
  });

  describe('nylasWebhook', () => {
    it('should save email data', async () => {
      const payload = nylasWebhookPayload;

      await nylasController.nylasWebhook(payload);

      expect(emailParserServiceMock.saveEmailData).toHaveBeenCalledWith({
        type: payload.type,
        source: payload.source,
        emailBody: payload.data.object.body,
        folders: payload.data.object.folders,
        grant_id: payload.data.object.grant_id,
        from: payload.data.object.from,
        subject: payload.data.object.subject,
        thread_id: payload.data.object.thread_id,
        to: payload.data.object.to,
        unread: payload.data.object.unread,
      });
    });
  });
});
