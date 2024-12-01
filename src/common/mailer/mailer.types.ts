import { TemplateDelegate } from 'handlebars';

export interface VerificationParams {
  template: Template.Verification;
  args: {
    name: string;
    link: string;
  };
}

export interface NotificationParams {
  template: Template.Notification;
  args: {
    name: string;
    document: string;
  };
}

export type TemplateParams<T extends Template> = T extends Template.Verification
  ? VerificationParams['args']
  : T extends Template.Notification
    ? NotificationParams['args']
    : never;

export type MailerTemplates = Record<Template, TemplateDelegate>;

export enum Template {
  Verification = 'verification',
  Notification = 'notification',
}

export const TransporterService = 'transporter';
