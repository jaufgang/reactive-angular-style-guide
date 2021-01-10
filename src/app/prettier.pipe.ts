import { Pipe, PipeTransform } from '@angular/core';
import * as prettier from 'prettier';
import * as parserBabel from 'prettier/parser-babel';
import * as parserAngular from 'prettier/parser-angular';
import * as parserTypescript from 'prettier/parser-typescript';
import * as parserHtml from 'prettier/parser-html';

@Pipe({
  name: 'prettier',
})
export class PrettierPipe implements PipeTransform {
  transform(value: string, filename: string): string {
    try {
      return prettier.format(value, {
        filepath: filename,
        plugins: [parserAngular, parserTypescript, parserBabel, parserHtml],
      });
    } catch (err) {
      console.error(filename, value, err);
      return value;
    }
  }
}
