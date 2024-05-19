import { Injectable } from '@nestjs/common';
import { EmailDataInput } from './email-parser.interface';
import { PrismaClientService } from '../prisma-client/prisma-client.service';
import { EmailUser } from '../shared/email-user.interface';

@Injectable()
export class EmailParserRepository {
  constructor(private readonly prisma: PrismaClientService) {}

  async saveEmailData(input: EmailDataInput) {
    await this.prisma.emails.create({
      data: {
        source: input.source,
        emailBody: input.emailBody,
        type: input.type,
        folders: input.folders?.join(','),
        grantId: input.grant_id,
        from: this.convertEmailUserArrayToString(input.from),
        to: this.convertEmailUserArrayToString(input.to),
        subject: input.subject,
        threadId: input.thread_id,
        unread: input.unread,
      },
    });
  }

  private convertEmailUserArrayToString(emailUserArray: EmailUser[]): string {
    return emailUserArray
      .map((cc) => `${cc.email}:${cc.name || null}`)
      .join(',');
  }
}
