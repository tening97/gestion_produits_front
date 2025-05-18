export interface Produit {
  id: number;
  nom: string;
  description: string;
  prix: number;
  ancien_prix?: number;
  imagePath: string;
  quantite: number;
  promotion?: string;
  categorie?: string;

}
