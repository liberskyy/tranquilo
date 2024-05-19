import { Module } from '@nestjs/common';
import { EmailParserService } from './email-parser.service';
import { EmailParserRepository } from './email-parser.repository';
import { PrismaClientService } from '../prisma-client/prisma-client.service';

@Module({
  providers: [EmailParserService, EmailParserRepository, PrismaClientService],
  exports: [EmailParserService],
})
export class EmailParserModule {}
