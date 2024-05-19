import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Nylas from 'nylas';

export const NylasClientSymbol = Symbol('NylasClient');

export const NylasClientProvider: Provider = {
  provide: NylasClientSymbol,

  useFactory: (configService: ConfigService) => {
    return new Nylas({
      apiKey: configService.get<string>('NYLAS_API_KEY'),
      apiUri: configService.get<string>('NYLAS_API_URI'),
    });
  },
  inject: [ConfigService],
};
