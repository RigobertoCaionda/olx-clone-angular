import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { ProductService } from 'src/app/core/services/product.service';
import { Category } from '../../types/category.model';
import { State } from '../../types/state.models';

@Component({
  selector: 'app-add-ad',
  templateUrl: './add-ad.component.html',
  styleUrls: ['./add-ad.component.css']
})
export class AddAdComponent implements OnInit {
  title: string = '';
  price: string = '';
  priceNegotiable: boolean = false;
  desc: string = '';
  fileInput!: FileList;
  categories: Category[] = [];
  states: State[] = [];
  cat: string = '';
  st: string = '';
  error: string = '';
  disabled = false;
  json: any;

  constructor(private productService: ProductService, 
      private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.productService.getCategories().subscribe(categories => {
      this.categories = categories;
    });

    this.productService.getStates().subscribe(states => {
      this.states = states;
    });
  }

  handleChange (e: any) {
    this.cat = e.target.value;
  }

  handleChangeStates (e: any) {
    this.st = e.target.value;
  }

  inputFileChange (e: any) {
   if(e.target.files) {
    this.fileInput = e.target.files;
   }
  }

  onSubmit (e: SubmitEvent) {
    e.preventDefault();
    this.disabled = true;
    this.error = '';
    let errors = [];
    if(!this.title.trim()) {
			errors.push('Sem título');
		}
		if(!this.categories) {
			errors.push('Sem categoria');
		}

    if (errors.length === 0) {
      const fData = new FormData();
      fData.append('title', this.title);
			fData.append('price', this.price);
			fData.append('priceNeg',  this.priceNegotiable as any);//Nao estava aceitando tipo boolean
			fData.append('description', this.desc);
			fData.append('categoryId', this.cat);
      fData.append('stateId', this.st);

      if (this.fileInput) {
        for (let i = 0; i < this.fileInput.length; i++) {
					fData.append('imgs',this.fileInput[i]);
				}
      }
      this.productService.addAd(fData).subscribe({
        next: (json) => {
          if(json.id) {
            this.router.navigate([`/ad/${json.id}`]);
            return;
           } else {
             if (json[0].fieldName == 'imgs') { // Se o erro for de imagem, a resposta vem em json[0].fieldName
               this.error = 'Selecione uma imagem válida';
             } else{
               this.error = json.error;
             }
           }
        },
        error: (error) => {
          console.log('Alguma coisa falhou!');
        }
      });
    }else {
			this.error = (errors.join("\n"));
		}
		this.disabled = false;
  }
}
