import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaClientService } from '../src/prisma-client/prisma-client.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.integration-tests.env',
    }),
  ],
  providers: [PrismaClientService],
})
export class TestModule {}
