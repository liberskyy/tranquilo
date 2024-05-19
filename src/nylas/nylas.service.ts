import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import Nylas from 'nylas';
import { NylasClientSymbol } from './nylas.client';
import { ConfigService } from '@nestjs/config';
import { NylasRepository } from './nylas.repository';

@Injectable()
export class NylasService {
  constructor(
    @Inject(NylasClientSymbol)
    private readonly nylasClient: Nylas,
    private readonly configService: ConfigService,
    private readonly nylasRepository: NylasRepository,
  ) {}

  async getUrlForOAuth2(): Promise<string> {
    const redirectUri = this.configService.get<string>('NYLAS_REDIRECT_URI');
    return this.nylasClient.auth.urlForOAuth2({
      clientId: this.configService.get<string>('NYLAS_CLIENT_ID'),
      redirectUri: redirectUri,
      scope: ['event.created'],
    });
  }

  async exchangeCodeForToken(code: string): Promise<void> {
    const codeExchangePayload = {
      clientSecret: this.configService.get<string>('NYLAS_API_KEY'),
      clientId: this.configService.get<string>('NYLAS_CLIENT_ID'),
      redirectUri: this.configService.get<string>('NYLAS_REDIRECT_URI'),
      code,
    };

    const response =
      await this.nylasClient.auth.exchangeCodeForToken(codeExchangePayload);

    if (!response || !response.grantId) {
      throw new InternalServerErrorException(
        'Failed to exchange code for token',
      );
    }

    await this.nylasRepository.saveGrant({
      email: response.email,
      accessToken: response.accessToken,
      grantId: response.grantId,
      expiresIn: response.expiresIn,
      scope: response.scope,
    });
  }
}
