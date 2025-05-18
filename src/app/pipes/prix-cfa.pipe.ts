import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'prixCfa'
})
export class PrixCfaPipe implements PipeTransform {
  transform(value: number | null | undefined): string {
    if (value == null) return '';
    // Format français avec espace insécable (optionnel)
    return value.toLocaleString('fr-FR') + ' F CFA';
  }

}
