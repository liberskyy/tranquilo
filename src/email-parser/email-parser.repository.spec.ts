import { Test } from '@nestjs/testing';
import { EmailParserRepository } from './email-parser.repository';
import { PrismaClientService } from '../prisma-client/prisma-client.service';
import { prismaClientMock } from '../../test-utils/mocks/prisma-client.mock';
import { EmailDataInput } from './email-parser.interface';

describe('EmailParserRepository', () => {
  let emailParserRepo: EmailParserRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [EmailParserRepository, PrismaClientService],
    })
      .overrideProvider(PrismaClientService)
      .useValue(prismaClientMock)
      .compile();

    emailParserRepo = moduleRef.get<EmailParserRepository>(
      EmailParserRepository,
    );
  });

  describe('saveEmailData', () => {
    it('should save email data in correct format', async () => {
      const input: EmailDataInput = {
        source: 'source',
        emailBody: 'emailBody',
        type: 'message.created',
        folders: ['folder1', 'folder2'],
        grant_id: 'grant_id',
        from: [{ email: 'email@email.com', name: 'name' }],
        to: [{ email: 'hello@gmail.com' }],
        subject: 'subject',
        thread_id: 'thread_id',
        unread: false,
      };

      await emailParserRepo.saveEmailData(input);

      expect(prismaClientMock.emails.create).toBeCalledWith({
        data: {
          source: input.source,
          emailBody: input.emailBody,
          type: input.type,
          folders: 'folder1,folder2',
          grantId: input.grant_id,
          from: 'email@email.com:name',
          to: 'hello@gmail.com:null',
          subject: input.subject,
          threadId: input.thread_id,
          unread: input.unread,
        },
      });
    });
  });
});
