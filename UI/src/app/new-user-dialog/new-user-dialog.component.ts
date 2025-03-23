import { Component} from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-user-dialog',
  templateUrl: './new-user-dialog.component.html',
  styleUrls: ['./new-user-dialog.component.css']
})

export class NewUserDialogComponent {
  userForm: FormGroup;
  selectedFile: File | null = null;


  constructor(private fb: FormBuilder, private router: Router) {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      birthDate: ['', Validators.required],
      city: ['']
    });
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      console.log("Form Submitted:", this.userForm.value);
      if (this.selectedFile) {
        console.log("Selected File:", this.selectedFile.name);
      }
      this.router.navigate(['/']);
      // add logic to call service and save user
    }
  }

  onCancel(): void {
    this.router.navigate(['/']);
  }
}
