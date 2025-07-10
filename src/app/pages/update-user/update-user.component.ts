import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { OptimizedHeaderComponent } from '../../shared/optimized-header/optimized-header.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-update-user',
  imports: [
    FormsModule,
    RouterModule,
    OptimizedHeaderComponent
  ],
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.scss'
})
export class UpdateUserComponent {
  userId: string = "";
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
    private readonly router: ActivatedRoute,
    private readonly userService: UserService
  ){
    this.countBiographyLength();
  }

  ngOnInit(): void {
    this.getUserByIdApi();
  }

  countBiographyLength(){
    this.biographyLength = this.biography.length;
  }

  getUserByIdApi(){
    this.userId = this.router.snapshot.params['id'];

    this.userService.getUserById(this.userId).subscribe({
      next: (res) => {
        this.profile = res.users.profile;
        this.fullName = res.users.full_name;
        this.age = res.users.age;
        this.street = res.users.address.street;
        this.neighborhood = res.users.address.neighborhood;
        this.state = res.users.address.state;
        this.biography = res.users.biography;
      },
      error: (err) => {
        console.log(err);
      }
    });
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

  updateUserById(){
    if (
      !this.fullName?.trim() ||
      !this.age ||
      !this.street?.trim() ||
      !this.neighborhood?.trim() ||
      !this.state?.trim() ||
      !this.biography?.trim()
    ) {
      alert('Preencha todos os campos obrigatórios.');
      return;
    }

    const formData = new FormData();
    if (this.selectedFile) {
      formData.append('profile', this.selectedFile);
    }

    formData.append('full_name', this.fullName.trim());
    formData.append('age', this.age.toString());
    formData.append('street', this.street.trim());
    formData.append('neighborhood', this.neighborhood.trim());
    formData.append('state', this.state.trim().toUpperCase());
    formData.append('biography', this.biography.trim());

    this.userService.updateUser(this.userId,formData).subscribe({
      next: (res) => {
        window.location.href = 'home';
      },
      error: (err) => console.error(err.message, err),
    });
  }

}
