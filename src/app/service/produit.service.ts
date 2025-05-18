import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Produit } from '../produit';


@Injectable({
  providedIn: 'root'
})
export class ProduitService {
  private baseUrl = 'http://localhost:8181/api/produits';

  constructor(private http: HttpClient) { }

  // Récupérer tous les produits
  getProduits(): Observable<Produit[]> {
    return this.http.get<Produit[]>(this.baseUrl);
  }

  // Récupérer un produit par id
  getProduitById(id: number): Observable<Produit> {
    return this.http.get<Produit>(`${this.baseUrl}/${id}`);
  }

  // Créer un produit avec image (en une seule opération)
  createProduit(produit: Produit, image: File): Observable<Produit> {
    const formData = new FormData();
    formData.append('nom', produit.nom);
    formData.append('prix', produit.prix.toString());
    formData.append('quantite', produit.quantite.toString());

    if (produit.description) {
      formData.append('description', produit.description);
    }

    if (image) {
      formData.append('image', image);
    }

    return this.http.post<Produit>(this.baseUrl, formData);
  }

  // Mettre à jour un produit avec image
  updateProduit(id: number, produit: Produit, image?: File): Observable<Produit> {
    const formData = new FormData();
    formData.append('nom', produit.nom);
    formData.append('prix', produit.prix.toString());
    formData.append('quantite', produit.quantite.toString());

    if (produit.description) {
      formData.append('description', produit.description);
    }

    if (image) {
      formData.append('image', image);
    }

    return this.http.put<Produit>(`${this.baseUrl}/${id}`, formData);
  }

  // Supprimer un produit
  deleteProduit(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  // Obtenir l'URL complète d'une image
  getImageUrl(imagePath: string): string {
    return `http://localhost:8181/uploads/${imagePath}`;
  }
}
