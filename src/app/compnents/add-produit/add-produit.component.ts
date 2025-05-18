import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Produit } from '../../produit';
import { ActivatedRoute, Router } from '@angular/router';
import { ProduitService } from '../../service/produit.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-produit',
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './add-produit.component.html',
  styleUrl: './add-produit.component.css'
})
export class AddProduitComponent implements OnInit {
  produitForm: FormGroup;
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  isEditMode = false;
  produitId: number | null = null;
  categories: string[] = [
    'Électronique',
    'Mode',
    'Maison',
    'Jardin',
    'Sport',
    'Beauté',
    'Alimentation'
  ];

  promotionTypes: string[] = [
    'Nouveau',
    '-5%',
    '-10%',
    '-15%',
    '-20%',
    '-30%',
    '-50%',
    'Soldes'
  ];

  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private produitService: ProduitService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.produitForm = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      prix: [500, [Validators.required, Validators.min(0)]],
      quantite: [1, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.produitId = +params['id'];
        this.loadProduit(this.produitId);
      }
    });
  }
  loadProduit(id: number): void {
    this.produitService.getProduitById(id).subscribe(produit => {
      this.produitForm.patchValue({
        nom: produit.nom,
        prix: produit.prix,
        quantite: produit.quantite,
        description: produit.description
      });

      if (produit.imagePath) {
        this.imagePreview = this.produitService.getImageUrl(produit.imagePath);
      }
    });
  }

  // Validateur personnalisé pour s'assurer que l'ancien prix est supérieur au prix actuel
  prixValidator(form: FormGroup) {
    const prix = form.get('prix')?.value;
    const ancienPrix = form.get('ancien_prix')?.value;

    if (prix && ancienPrix && prix >= ancienPrix) {
      return { prixInvalide: true };
    }
    return null;
  }

  onFileChange(event: Event) {
    const fileInput = event.target as HTMLInputElement;

    if (fileInput.files && fileInput.files.length) {
      const file = fileInput.files[0];
      this.selectedFile = file; // <= Manquait

      this.produitForm.patchValue({ image: file });
      this.produitForm.get('image')?.updateValueAndValidity();

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }


  // onSubmit() {
  //   if (this.produitForm.invalid) {
  //     // Marquer tous les champs comme touchés pour montrer les validations
  //     Object.keys(this.produitForm.controls).forEach(key => {
  //       const control = this.produitForm.get(key);
  //       control?.markAsTouched();
  //     });
  //     return;
  //   }

  //   this.isSubmitting = true;

  //   // Construction de l'objet produit à partir du formulaire
  //   const formValues = this.produitForm.value;

  //   const nouveauProduit: Produit = {
  //     id: Math.floor(Math.random() * 1000), // Temporaire, à remplacer par l'ID généré côté serveur
  //     nom: formValues.nom,
  //     description: formValues.description,
  //     prix: formValues.prix,
  //     quantite: formValues.quantite,
  //     image: this.imagePreview ? this.imagePreview.toString() : '../assets/images/placeholder.png',
  //     categorie: formValues.categorie
  //   };

  //   if (formValues.ancien_prix) {
  //     nouveauProduit.ancien_prix = formValues.ancien_prix;
  //   }

  //   if (formValues.promotion) {
  //     nouveauProduit.promotion = formValues.promotion;
  //   }

  //   // Simulation d'un appel API
  //   setTimeout(() => {
  //     console.log('Produit ajouté:', nouveauProduit);
  //     this.isSubmitting = false;

  //     // Redirection vers la liste des produits
  //     this.router.navigate(['/produits']);
  //   }, 1000);
  // }
  onSubmit(): void {

    if (this.produitForm.valid) {
      const produit: Produit = this.produitForm.value;

      if (this.isEditMode && this.produitId) {
        // Mode édition
        this.produitService.updateProduit(this.produitId, produit, this.selectedFile || undefined)
          .subscribe({
            next: () => {
              Swal.fire({
                icon: 'success',
                title: 'Succès',
                text: 'Produit modifié avec succès !',
                confirmButtonText: 'OK'
              }).then(() => {
                this.router.navigate(['/produits']); // redirection après confirmation
              });
            },

            error: (err) => {
              console.error('Erreur lors de la création :', err);
              Swal.fire({
                icon: 'error',
                title: 'Erreur',
                text: 'Une erreur est survenue lors de la modification du produit.'
              });
            }

      });
      } else {
        // Mode création
        this.produitService.createProduit(produit, this.selectedFile as File)
          .subscribe({
            next: () => {
              Swal.fire({
                icon: 'success',
                title: 'Succès',
                text: 'Produit créé avec succès !',
                confirmButtonText: 'OK'
              }).then(() => {
                this.router.navigate(['/produits']); // redirection après confirmation
              });
            },


            error: (err) => {
              console.error('Erreur lors de la création :', err);
              Swal.fire({
                icon: 'error',
                title: 'Erreur',
                text: 'Une erreur est survenue lors de la création du produit.'
              });
            }


          });
      }
    }
  }

  annuler() {
    this.router.navigate(['/produits']);
  }
}
