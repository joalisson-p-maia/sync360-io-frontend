import { Component, OnInit } from '@angular/core';
import { OptimizedHeaderComponent } from '../../shared/optimized-header/optimized-header.component';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-user',
  imports: [
    OptimizedHeaderComponent,
    FormsModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss']
})
export class ViewUserComponent implements OnInit{
  /**User */
  userId: string = "";
  profile: string | null = "";
  fullName: string = "";
  age: number = 0;
  street: string = "";
  neighborhood: string = "";
  state: string = "";
  biography: string = "";
  biographyLength: number = 0;

  /**Modal */
  showModal: boolean = false;
  selectedUserId: string | null = null;

  constructor(
    private readonly router: ActivatedRoute,
    private readonly userService: UserService
  ){
    this.countLengthBiography();
  }

  ngOnInit(): void {
    this.getUserByIdApi();
  }

  countLengthBiography(){
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

  openModal(userId: string) {
    this.selectedUserId = userId;
    this.showModal = true;
  }

  confirmRemove() {
    if (this.selectedUserId) {
      this.userService.deleteUser(this.selectedUserId).subscribe({
        next: () => {
          this.getUserByIdApi();
          this.closeModal();
          window.location.href = 'home';
        },
        error: (err) => {
          console.log(err);
          this.closeModal();
        }
      });
    }
  }

  cancelRemove() {
    this.closeModal();
  }

  closeModal() {
    this.selectedUserId = null;
    this.showModal = false;
  }
}
