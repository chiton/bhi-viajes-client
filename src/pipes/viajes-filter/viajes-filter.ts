import { Pipe, PipeTransform } from '@angular/core';
import { Viaje } from '../../models/viaje';

@Pipe({
  name: 'viajesFilter',
})
export class ViajesFilterPipe implements PipeTransform {

  transform(items: Viaje[], searchText: string) : Viaje[] {
    if(!items || !searchText) {
      return items;
    }
    
    return items.filter(item => item.name.toLowerCase().startsWith(searchText.toLowerCase()));
  }
}
