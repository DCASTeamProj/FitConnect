import { Component} from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../services/user.service';
import { User } from '../Models/user.model'; 

@Component({
  selector: 'app-new-user-dialog',
  templateUrl: './new-user-dialog.component.html',
  styleUrls: ['./new-user-dialog.component.css']
})

export class NewUserDialogComponent {
  userForm: FormGroup;
  selectedFile: File | null = null;


  constructor(
    private fb: FormBuilder, 
    private dialogRef: MatDialogRef<NewUserDialogComponent>, 
    private userService: UserService) 
    {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      birthDate: [''],
      bio: [''],
      profile_picture: ['']
    });
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const formData = new FormData();
      formData.append('first_name', this.userForm.get('firstName')?.value);
      formData.append('last_name', this.userForm.get('lastName')?.value);
      formData.append('username', this.userForm.get('username')?.value);
      formData.append('birth_date', this.userForm.get('birthDate')?.value);
      formData.append('bio', this.userForm.get('bio')?.value);
      if (this.selectedFile) {
        formData.append('profile_picture', this.selectedFile, this.selectedFile.name);
      }
      this.userService.createUser(formData).subscribe({
        next: (response: User) => {
          console.log('User created successfully', response);
          this.dialogRef.close(); 
        },
        error: (error) => {
          console.error('Error creating user', error);
          alert('An error occurred while creating the user. Please try again.');
        }
    });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
