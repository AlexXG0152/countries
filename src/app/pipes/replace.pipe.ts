import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replace',
})
export class ReplacePipe implements PipeTransform {
  transform(input: string): any {
    try {
      return input?.replace(/\[(.+?)\]/g, '');
    } catch (error) {
      console.error(error);
    }
  }
}
