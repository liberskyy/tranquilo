import { EmailUser } from '../shared/email-user.interface';

export interface EmailDataInput {
  type: 'message.created' | 'message.updated';
  source: string;
  emailBody: string;
  folders?: string[];
  grant_id: string;
  from: EmailUser[];
  subject: string;
  thread_id: string;
  to: EmailUser[];
  unread: boolean;
}
