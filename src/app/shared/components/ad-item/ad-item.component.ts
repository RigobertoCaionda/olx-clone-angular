import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ad-item',
  templateUrl: './ad-item.component.html',
  styleUrls: ['./ad-item.component.css']
})
export class AdItemComponent implements OnInit {
  @Input('ads') adsList: any = ''; // O nome dentro de string é o nome verdadeiro e o adsList é como sera acessado
  constructor() { }

  ngOnInit(): void {
  }

}
