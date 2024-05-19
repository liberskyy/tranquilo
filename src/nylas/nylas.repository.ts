import { Injectable } from '@nestjs/common';
import { PrismaClientService } from '../prisma-client/prisma-client.service';
import { Grant } from './nylas.interface';
import { IdRecord } from '../shared/db-record.interface';

@Injectable()
export class NylasRepository {
  constructor(private readonly prisma: PrismaClientService) {}

  async saveGrant(grant: Grant): Promise<IdRecord & Grant> {
    return this.prisma.grants.create({
      data: {
        email: grant.email,
        accessToken: grant.accessToken,
        grantId: grant.grantId,
        expiresIn: grant.expiresIn,
        scope: grant.scope,
      },
    });
  }
}
