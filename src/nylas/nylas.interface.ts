import { EmailUser } from '../shared/email-user.interface';

export interface Grant {
  email: string;
  accessToken: string;
  grantId: string;
  expiresIn: number;
  scope: string;
}

export interface WebhookPayload {
  specversion: string;
  type: 'message.created' | 'message.updated';
  source: string;
  id: string;
  time: number;
  webhook_delivery_attempt: number;
  data: WebhookData;
}

export interface WebhookData {
  application_id: string;
  object: WebhookDataObject;
}

export interface WebhookDataObject {
  body: string;
  created_at: number;
  date: number;
  folders?: string[];
  from: EmailUser[];
  grant_id: string;
  id: string;
  object: string;
  snippet?: string;
  starred: boolean;
  subject: string;
  thread_id: string;
  to: EmailUser[];
  unread: boolean;
}
