import IMailTemplateProvider from '../models/IMailTemplateProvider';
import IParserMailTemplateDTO from '../dtos/IParserMailTemplateTDO';

class FakeMailTemplateProvider implements IMailTemplateProvider {
  public async parse({ template }: IParserMailTemplateDTO): Promise<string> {
    return template;
  }
}

export default FakeMailTemplateProvider;
