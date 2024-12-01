import { TemplateDelegate } from 'handlebars';

export interface VerificationParams {
  template?: Template.Verification;
  name: string;
  link: string;
}

export interface AnotherParams {
  template?: Template.Another;
  someArgs: string[];
}

export type TemplateParams = VerificationParams | AnotherParams;

export type MailerTemplates = Record<Template, TemplateDelegate>;

export enum Template {
  Verification = 'verification',
  Another = 'another',
}

export const TransporterService = 'transporter';
