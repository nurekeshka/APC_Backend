import * as fs from 'fs';
import * as path from 'path';

import { Inject, Injectable } from '@nestjs/common';
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

  private readonly templates: MailerTemplates;

  constructor() {
    for (const template of Object.keys(Template)) {
      const filepath = path.join(__dirname, 'templates', template);
      const source = fs.readFileSync(filepath, 'utf-8');
      this.templates[template] = compile(source);
    }
  }

  async dispatch<T extends Template>(
    template: T,
    to: string,
    subject: string,
    args: TemplateParams<T>,
  ) {
    const builder = this.templates[template];
    await this.transporter.sendMail({
      to,
      subject,
      html: builder(args),
    });
  }
}
