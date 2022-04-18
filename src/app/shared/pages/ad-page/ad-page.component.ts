import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-ad-page',
  templateUrl: './ad-page.component.html',
  styleUrls: ['./ad-page.component.css']
})
export class AdPageComponent implements OnInit {
  id: string = '';
  ad: any = {};
  constructor(private productService: ProductService, private route: ActivatedRoute, private router: Router) { 
    this.route.params.subscribe(params => this.id = params['id']);
  }

  ngOnInit(): void {
    this.productService.getAd(this.id, false).subscribe(ad => {
      this.ad = ad;
    });
  }

  handleDeleteClick (id: number) {
    this.productService.deleteAd(id).subscribe(() => {
      this.router.navigate(['/']);
    });
  }

  dateFormat (date: Date) {
    let d = new Date(date); // Preciso fazer isso pq date vem como string da bd, nao vem como date, entao preciso antes converte-lo.
    let day = d.getDate();
    let month = d.getMonth() + 1;
    let year = d.getFullYear();
    return `${day < 10 ? `0${day}` : day}/${month < 10 ? `0${month}` : month}/${year}`;
  }

}
