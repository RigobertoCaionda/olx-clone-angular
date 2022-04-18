import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/core/services/product.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-editpage',
  templateUrl: './editpage.component.html',
  styleUrls: ['./editpage.component.css']
})
export class EditpageComponent implements OnInit {
  email: string = '';
  password: string = '';
  error: string = '';
  success: string = '';
  confirmPassword: string = '';
  name: string = '';
  states: any;
  st!: number;
  disabled = false;
  id!: number;

  constructor(private userService: UserService, private route: ActivatedRoute, 
      private productService: ProductService) {
      this.route.params.subscribe(params => this.id = params['id']);
   }

  ngOnInit(): void {
    this.productService.getStates().subscribe(states => {
      this.states = states;
    });

    this.userService.getUser(this.id).subscribe(user => {
      this.name = user.name;
      this.email = user.email;
    });
  }

  onSubmit (e: SubmitEvent) {
    e.preventDefault();
    this.error = '';
    this.success = '';
    this.disabled = true;

    if (this.confirmPassword !== this.password) {
        this.error = 'Senhas não batem'; // Nao pode retornar direto isso, o return deve vir por baixo.
        this.disabled = false;
        return;
    }
    let obj:any = {};
    if (this.name) {
      obj.name = this.name;
    }
    if (this.email) {
      obj.email = this.email;
    }
    if (this.password) {
      obj.password = this.password;
    }
    if (this.st) {
      obj.stateId = this.st;
    }
    this.userService.updateUser(obj).subscribe(user => {
      if (user.error) {
        this.success = '';
        this.error = user.error;
      } else {
        this.error = '';
        this.success = 'Usuário atualizado com sucesso!';
      }
    });
    this.disabled = false;
  }

  handleChange (e: any) {
    this.st = e.target.value;
  }

}
