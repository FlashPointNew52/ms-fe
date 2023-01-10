import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'call'
})
export class CallPipe implements PipeTransform {

  transform(func: any, ...args: any[]): any {
    return func instanceof Function ? func(...args) : func;
  }
}
