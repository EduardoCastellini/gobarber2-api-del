import IParserMailTemplateTDO from '@shared/container/providers/MailTemplateProvider/dtos/IParserMailTemplateTDO';

interface IMailContact {
  name: string;
  email: string;
}

export default interface ISendMailDTO {
  to: IMailContact;
  from?: IMailContact;
  subject: string;
  templateData: IParserMailTemplateTDO;
}
