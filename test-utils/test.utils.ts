import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { PrismaClientService } from '../src/prisma-client/prisma-client.service';

export function makeRequest(app: INestApplication) {
  return request(app.getHttpServer());
}

const TABLES = ['Emails', 'Grants'];

export const clearAllTables = async (prismaClient: PrismaClientService) => {
  for (const table of TABLES) {
    await prismaClient[table].deleteMany({});
  }
};
