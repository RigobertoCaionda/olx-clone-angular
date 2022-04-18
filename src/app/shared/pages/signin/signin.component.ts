import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  email: string = '';
  password: string = '';
  error: string = '';
  disabled = false;

  constructor(private authService: AuthService) { 

  }

  ngOnInit(): void {
  }

  onSubmit (e: SubmitEvent) {
    e.preventDefault();
    this.error = '';
    this.disabled = true;
    this.authService.signIn({ email: this.email, password: this.password }).subscribe(json => {
        this.disabled = false;
        if (json.error) { // Nem precisa disso pq se chegou até aqui quer dizer que tudo deu certo, nao houve erros pois em nenhum momento no back eu retorno erro, é tudo gerenciado pelo adonisjs.
          this.error = json.error;
        } else {
          this.authService.doLogin(json.token);
          window.location.href = '/';
        }
      });
  }
}
