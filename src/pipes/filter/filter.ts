import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the FilterPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(items: any[], field : string, value : string): any[] {
    if (!items) return [];
    if (!value || value.length == 0) return items;
    return items.filter(it =>{
      console.log('Filter: ', value)
      console.log('Value: ', field)
      return it[field] == (value) 
    });
  }
}
