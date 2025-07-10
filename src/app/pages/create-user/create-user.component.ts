import { Component } from '@angular/core';
import { OptimizedHeaderComponent } from '../../shared/optimized-header/optimized-header.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-create-user',
  imports: [
    OptimizedHeaderComponent,
    FormsModule,
    RouterModule
  ],
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent {
  profile: string | null = "";
  fullName: string = "";
  age: number = 0;
  street: string = "";
  neighborhood: string = "";
  state: string = "";
  biography: string = "";
  biographyLength: number = 0;
  selectedFile: File | null = null;
  
  constructor(
    private readonly userService:UserService
  ){}

  countBiographyLength(){
    this.biographyLength = this.biography.length;
  }

  onProfileImageChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (file) {
      this.selectedFile = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.profile = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  removeFilePreview(){
    this.profile = null;
  }

  saveUser() {
    if (!this.fullName || !this.age || !this.street || !this.neighborhood || !this.state || !this.biography) {
      alert('Preencha todos os campos obrigatórios.');
      return;
    }

    const formData = new FormData();
    if (this.selectedFile) {
      formData.append('profile', this.selectedFile);
    }

    formData.append('full_name', this.fullName);
    formData.append('age', this.age.toString());
    formData.append('street', this.street);
    formData.append('neighborhood', this.neighborhood);
    formData.append('state', this.state.toUpperCase());
    formData.append('biography', this.biography);

    this.userService.createUser(formData).subscribe({
      next: (res) => {
        window.location.href = 'home';
      },
      error: (err) => console.error('Erro ao criar usuário', err),
    });
  }
}
