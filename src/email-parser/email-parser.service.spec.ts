import { Test, TestingModule } from '@nestjs/testing';
import { EmailParserService } from './email-parser.service';
import { EmailParserRepository } from './email-parser.repository';
import { emailParserRepositoryMock } from '../../test-utils/mocks/email-parser.repository.mock';
import { EmailDataInput } from './email-parser.interface';

describe('EmailParserService', () => {
  let emailParserService: EmailParserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmailParserService, EmailParserRepository],
    })
      .overrideProvider(EmailParserRepository)
      .useValue(emailParserRepositoryMock)
      .compile();

    emailParserService = module.get<EmailParserService>(EmailParserService);
  });

  describe('saveEmailData', () => {
    it('should call saveEmailData method of EmailParserRepository with the provided input', async () => {
      await emailParserService.saveEmailData({} as EmailDataInput);

      expect(emailParserRepositoryMock.saveEmailData).toHaveBeenCalledWith({});
    });
  });
});
