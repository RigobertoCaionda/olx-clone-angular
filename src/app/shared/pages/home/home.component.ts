import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/core/services/product.service';
import { Category } from '../../types/category.model';
import { State } from '../../types/state.models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  page: number = 1;
  categories: Category[] = [];
  states: State[] = [];
  ads: any = [];
  searchedTitle = '';
  perPage = 4; // Itens por página
  constructor(private productService: ProductService) { 

  }

  ngOnInit(): void {
    this.productService.getCategories().subscribe(categories => {
      this.categories = categories;
    });

    this.productService.getStates().subscribe(states => {
      this.states = states;
    });

    this.productService.getAds({ sort: 'desc', limit: this.perPage, page: 1 }).subscribe(ads => {
        this.ads = ads;
    });
  }

  pageChanged (e: any) {
    this.page = e;
    this.productService.getAds({ sort: 'desc', limit: this.perPage, page: this.page }).subscribe(ads => {
      this.ads = ads;
  });
  }
  
  timeout = setTimeout(() => {}, 1000); // So para nao dizer que estou a usar essa variavel sem inicializa-la
  handleInputChange (title: string) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.productService.search(title).subscribe(ads => {
        console.log(ads);
      });
    }, 2000);
  }
}
