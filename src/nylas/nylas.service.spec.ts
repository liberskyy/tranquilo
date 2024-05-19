import { Test } from '@nestjs/testing';
import { NylasService } from './nylas.service';
import { ConfigService } from '@nestjs/config';
import { mockConfigService } from '../../test-utils/mocks/config.service.mock';
import { NylasClientProvider, NylasClientSymbol } from './nylas.client';
import { NylasRepository } from './nylas.repository';
import { nylasRepositoryMock } from '../../test-utils/mocks/nylas.repository.mock';
import { nylasClientMock } from '../../test-utils/mocks/nylas-client.mock';

describe('NylasService', () => {
  let nylasService: NylasService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        NylasService,
        NylasClientProvider,
        NylasRepository,
        ConfigService,
      ],
    })
      .overrideProvider(ConfigService)
      .useValue(mockConfigService)
      .overrideProvider(NylasClientSymbol)
      .useValue(nylasClientMock)
      .overrideProvider(NylasRepository)
      .useValue(nylasRepositoryMock)
      .compile();

    nylasService = moduleRef.get<NylasService>(NylasService);
  });
  describe('getUrlForOAuth2', () => {
    it('should return the URL for OAuth2', async () => {
      const url = await nylasService.getUrlForOAuth2();

      const expectedUrl = await nylasClientMock.auth.urlForOAuth2();
      expect(url).toBe(expectedUrl);
    });
  });

  describe('exchangeCodeForToken', () => {
    it("should throw an error when nylas api doesn't return a grantId", async () => {
      nylasClientMock.auth.exchangeCodeForToken.mockResolvedValueOnce({});

      await expect(nylasService.exchangeCodeForToken('code')).rejects.toThrow(
        'Failed to exchange code for token',
      );
    });

    it('should grantId of saved db record', async () => {
      nylasRepositoryMock.saveGrant.mockResolvedValueOnce({
        grantId: 'grantId',
      });

      await nylasService.exchangeCodeForToken('code');

      expect(nylasRepositoryMock.saveGrant).toHaveBeenCalledWith({
        ...(await nylasClientMock.auth.exchangeCodeForToken()),
      });
    });
  });
});
