import { Routes } from '@angular/router';
import { ProduitsComponent } from './compnents/produits/produits.component';
import { AddProduitComponent } from './compnents/add-produit/add-produit.component';

export const routes: Routes = [
  {path: 'produits' ,component: ProduitsComponent },
  {path: 'add-produit' ,component: AddProduitComponent },
  {path: 'add-produit/:id/edit' ,component: AddProduitComponent },
  {path: "", redirectTo: "produits", pathMatch: "full"}
];
