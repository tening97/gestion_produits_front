import { CommonModule } from '@angular/common';
import { OnInit, Component } from '@angular/core';
import { Produit } from '../../produit';
import { RouterLink } from '@angular/router';
import { ProduitService } from '../../service/produit.service';
import Swal from 'sweetalert2';
import { PrixCfaPipe } from '../../pipes/prix-cfa.pipe';

@Component({
  selector: 'app-produits',
  imports: [CommonModule, RouterLink,PrixCfaPipe],
  templateUrl: './produits.component.html',
  styleUrl: './produits.component.css'
})
export class ProduitsComponent implements OnInit {

  currentPage: number = 1;
  itemsPerPage: number = 8;
  totalItems: number = 0;
  totalPages: number = 0;
  pages: number[] = [];

  // Liste des produits
  produits: Produit[] = [];
  ngOnInit(): void {

    this.chargerProduits();

    // Configuration de la pagination
    this.calculerPagination();
  }

  constructor(private produitService: ProduitService) { }

  chargerProduits(): void {
    // Exemple de données (à remplacer par votre appel API réel)
    this.produitService.getProduits().subscribe(produits => {
      this.produits = produits;
      this.totalItems = this.produits.length;
    });



  }

   calculerPagination(): void {
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);


  }

  changerPage(page: number): void {
    this.currentPage = page;
    // Ici vous devriez recharger les produits pour la page sélectionnée
    // Si vous utilisez une API avec pagination côté serveur
  }

  pagePrecedente(): void {
    if (this.currentPage > 1) {
      this.changerPage(this.currentPage - 1);
    }
  }

  getImageUrl(imagePath: string | undefined): string {
    if (!imagePath) {
      return '../../../../public/assets/images/p1.jpeg'; // Image par défaut
    }


    return this.produitService.getImageUrl(imagePath);
  }

  pageSuivante(): void {
    if (this.currentPage < this.totalPages) {
      this.changerPage(this.currentPage + 1);
    }
  }




  supprimerProduit(id: number | undefined): void {
    if (!id) return;

    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: 'Cette action est irréversible.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer !',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.produitService.deleteProduit(id).subscribe(() => {
          this.chargerProduits(); // recharge la liste
          Swal.fire(
            'Supprimé !',
            'Le produit a été supprimé avec succès.',
            'success'
          );
        }, error => {
          Swal.fire(
            'Erreur !',
            'Impossible de supprimer ce produit.',
            'error'
          );
        });
      }
    });
  }

}
