import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  email: string = '';
  password: string = '';
  error: string = '';
  confirmPassword: string = '';
  name: string = '';
  states: any;
  disabled = false;

  constructor(private authService: AuthService, private productService: ProductService) { 

  }

  ngOnInit(): void {
    this.productService.getStates().subscribe(states => {
      this.states = states;
      console.log(states)
    });
  }

  onSubmit (e: SubmitEvent) {
    e.preventDefault();
    this.error = '';
    this.disabled = true;

    if (this.confirmPassword !== this.password) {
       this.error = 'Senhas não batem'; // Nao pode retornar direto isso, o return deve vir por baixo.
       this.disabled = false;
       return;
    }
    this.authService.signUp({ email: this.email, password: this.password, 
      name: this.name, stateId: this.states.id }).subscribe(json => {
        this.disabled = false;
        if (json.error) {
          this.error = json.error;
        } else {
          this.authService.doLogin(json.token, true); // Esse true vai sair
          window.location.href = '/';
          console.log(json.token);
        }
      });
  }

  handleChange (e: any) {
    this.states.id = e.target.value;
  }

}
