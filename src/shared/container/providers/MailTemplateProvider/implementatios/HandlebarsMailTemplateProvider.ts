import handlebars from 'handlebars';
import fs from 'fs';

import IMailTemplateProvider from '../models/IMailTemplateProvider';
import IParserMailTemplateDTO from '../dtos/IParserMailTemplateTDO';

class HandlebarsMailTemplateProvider implements IMailTemplateProvider {
  public async parse({
    file,
    variables,
  }: IParserMailTemplateDTO): Promise<string> {
    const TemplatefileContent = await fs.promises.readFile(file, {
      encoding: 'utf-8',
    });
    const parseTemplate = handlebars.compile(TemplatefileContent);
    return parseTemplate(variables);
  }
}

export default HandlebarsMailTemplateProvider;
