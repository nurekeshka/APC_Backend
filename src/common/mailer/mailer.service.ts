import * as fs from 'fs';
import * as path from 'path';

import { Inject, Injectable, Logger } from '@nestjs/common';
import { compile } from 'handlebars';
import { Transporter } from 'nodemailer';

import {
  MailerTemplates,
  Template,
  TemplateParams,
  TransporterService,
} from './mailer.types';

@Injectable()
export class MailerService {
  @Inject(TransporterService) private readonly transporter: Transporter;
  private readonly logger = new Logger(MailerService.name);

  private readonly templates: MailerTemplates;

  constructor() {
    const templates = {};

    for (const template of Object.values(Template)) {
      const filename = `${template}.hbs`;
      const filepath = path.join(__dirname, 'templates', filename);
      const source = fs.readFileSync(filepath, 'utf-8');
      templates[template] = compile(source);
    }

    this.templates = templates as never;
  }

  async dispatch<T extends Template>(
    template: T,
    to: string,
    subject: string,
    args: TemplateParams<T>,
  ) {
    this.logger.log(`Posting ${to} with "${subject}" using "${template}"`);
    const builder = this.templates[template];
    await this.transporter.sendMail({
      to,
      subject,
      html: builder(args),
    });
  }
}
