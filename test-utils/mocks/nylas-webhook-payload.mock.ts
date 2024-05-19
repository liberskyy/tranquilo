import { WebhookPayload } from '../../src/nylas/nylas.interface';

export const nylasWebhookPayload: WebhookPayload = {
  specversion: '1.0',
  type: 'message.created',
  source: '/google/emails/incremental',
  id: 'E2RMiCk6G2fePyMXBrns6U6884',
  time: 1716026884,
  webhook_delivery_attempt: 1,
  data: {
    application_id: '1cae92a0-60f3-41a6-9b1c-33074cafa5f6',
    object: {
      body: '<div dir="ltr">Squeeze<br></div>\r\n',
      created_at: 1716026790,
      date: 1716026790,
      folders: ['UNREAD', 'CATEGORY_PERSONAL', 'INBOX'],
      from: [
        {
          email: 'bear@gmail.com',
          name: 'Bear',
        },
      ],
      grant_id: '28a0ee08-c205-4250-b118-ea8e36d7d92e',
      id: '18f8b2affbd5c79d',
      object: 'message',
      snippet: 'Squeeze',
      starred: false,
      subject: 'Squeeze',
      thread_id: '18f8b2affbd5c79d',
      to: [
        {
          email: 'example@gmail.com',
        },
      ],
      unread: true,
    },
  },
};
