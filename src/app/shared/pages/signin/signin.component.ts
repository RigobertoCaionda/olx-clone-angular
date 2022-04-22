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
    this.authService.signIn({ email: this.email, password: this.password }).subscribe({
      next: (json) => {
        this.disabled = false;
        this.authService.doLogin(json.token); // Nem precisa verificar se deu certo pq se chega aqui é pq acertou o user e senha
        window.location.href = '/';
        
      },
      error: (error) => {
        switch (error.error.errors[0].message) {
          case 'E_INVALID_AUTH_UID: User not found' || 'E_INVALID_AUTH_PASSWORD: Password mis-match':
            this.error = 'Usuário e/ou senha errado!';
            this.disabled = false;
          break;

          default:
            this.error = 'Alguma coisa deu errado!';
            this.disabled = false;
        }
      }
    }); // O subscribe recebe um objeto com o next que diz o que acontecera caso der tudo certo e o error que diz o que acontecera caso der erro.
  }
}
