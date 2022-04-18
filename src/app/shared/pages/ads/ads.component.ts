import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-ads',
  templateUrl: './ads.component.html',
  styleUrls: ['./ads.component.css']
})
export class AdsComponent implements OnInit {
  // Esse componente esta interminado, mas tem a funcao replaceState que e importante
  cat = '';
  search = '';
  state = '';
  ads: any = []; 
  constructor(private route: ActivatedRoute, private productService: ProductService, 
    private location: Location) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.cat = params['cats'];
      this.search = params['q'];
      this.state = params['state'];
  });
  let queryString = [];

      if (this.search) {
        queryString.push(`q=${this.search}`);
      }

      if (this.cat) {
        queryString.push(`cats=${this.cat}`);
      }

      if (this.state) {
        queryString.push(`state=${this.state}`);
      }

      this.location.replaceState(`?${queryString.join('&')}`);
      this.productService.getAds({sort: 'desc', limit: 8}).subscribe(ads => {
      this.ads = ads;
  });
  }

}
