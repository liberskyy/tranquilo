import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { NylasModule } from './nylas/nylas.module';
import { EmailParserModule } from './email-parser/email-parser.module';

@Module({
  imports: [ConfigModule.forRoot(), NylasModule, EmailParserModule],
})
export class AppModule {}
