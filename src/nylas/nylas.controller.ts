import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  NotFoundException,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { NylasService } from './nylas.service';
import { EmailParserService } from '../email-parser/email-parser.service';
import { WebhookPayload } from './nylas.interface';

@Controller('nylas')
export class NylasController {
  constructor(
    private readonly nylasService: NylasService,
    private readonly emailParserService: EmailParserService,
    private readonly logger: Logger,
  ) {}

  @Get('/auth')
  async nylasAuth(@Res() res: Response) {
    const authUrl = await this.nylasService.getUrlForOAuth2();

    res.redirect(authUrl);
  }

  @Get('/oauth/exchange')
  async nylasOAuthExchange(@Query('code') code: string) {
    if (!code) {
      throw new NotFoundException(`Code not found in query params`);
    }

    const grantId = await this.nylasService.exchangeCodeForToken(code);

    return { grantId };
  }

  @Get('/webhook')
  async nylasWebhookChallenge(@Query('challenge') challenge: string) {
    return challenge;
  }

  @Post('/webhook')
  @HttpCode(HttpStatus.OK)
  async nylasWebhook(@Body() payload: WebhookPayload) {
    this.logger.log(
      `Webhook received. Grant ID: ${payload.data.object.grant_id}`,
    );

    await this.emailParserService.saveEmailData({
      type: payload.type,
      source: payload.source,
      emailBody: payload.data.object.body,
      folders: payload.data.object.folders,
      grant_id: payload.data.object.grant_id,
      from: payload.data.object.from,
      subject: payload.data.object.subject,
      thread_id: payload.data.object.thread_id,
      to: payload.data.object.to,
      unread: payload.data.object.unread,
    });

    this.logger.log(
      `Saved email data for grant ID: ${payload.data.object.grant_id}`,
    );
    return;
  }
}
