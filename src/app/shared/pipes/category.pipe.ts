import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'category'
})
export class CategoryPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    switch(value){
      case'front': return 'code';
      case 'back': return 'computer';
    }
    return 'code';
  }

}
