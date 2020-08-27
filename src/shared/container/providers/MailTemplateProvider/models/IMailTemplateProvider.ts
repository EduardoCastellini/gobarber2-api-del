import IParserMailTemplateDTO from '../dtos/IParserMailTemplateTDO';

export default interface IMailTemplateProvider {
  parse(data: IParserMailTemplateDTO): Promise<string>;
}
