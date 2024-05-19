import { Logger, Module } from '@nestjs/common';
import { NylasController } from './nylas.controller';
import { NylasService } from './nylas.service';
import { NylasClientProvider } from './nylas.client';
import { ConfigModule } from '@nestjs/config';
import { NylasRepository } from './nylas.repository';
import { PrismaClientService } from '../prisma-client/prisma-client.service';
import { EmailParserModule } from '../email-parser/email-parser.module';

@Module({
  imports: [ConfigModule, EmailParserModule],
  controllers: [NylasController],
  providers: [
    NylasService,
    NylasClientProvider,
    NylasRepository,
    PrismaClientService,
    Logger,
  ],
})
export class NylasModule {}
