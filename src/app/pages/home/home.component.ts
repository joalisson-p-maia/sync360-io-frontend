import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [
    HeaderComponent,
    CommonModule,
    RouterModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  /**User */
  userId: string = "";
  profile: string = "";
  fullName: string = "";
  age: string = "";
  street: string = "";
  neighborhood: string = "";
  state: string = "";
  biography: string = "";
  dataApiUser: any = [];

  /**Modal */
  showModal: boolean = false;
  selectedUserId: string | null = null;

  constructor(
    private readonly userService: UserService
  ){}
  
  ngOnInit(): void {
    this.listAllUsersApi();
  }

  listAllUsersApi(){
    this.userService.listAllUsers().subscribe({
      next: (res) => {
        this.dataApiUser = res.users;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  removeUser(userId: string | null){
    this.userService.deleteUser(userId).subscribe({
      next: (res) => {
        this.listAllUsersApi();
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  openModal(userId: string) {
    this.selectedUserId = userId;
    this.showModal = true;
  }

  confirmRemove() {
    if (this.selectedUserId) {
      this.userService.deleteUser(this.selectedUserId).subscribe({
        next: () => {
          this.listAllUsersApi();
          this.closeModal();
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
