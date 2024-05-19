import { Injectable } from '@nestjs/common';
import { EmailDataInput } from './email-parser.interface';
import { EmailParserRepository } from './email-parser.repository';

@Injectable()
export class EmailParserService {
  constructor(private readonly emailParserRepo: EmailParserRepository) {}
  async saveEmailData(input: EmailDataInput) {
    await this.emailParserRepo.saveEmailData(input);
  }
}
