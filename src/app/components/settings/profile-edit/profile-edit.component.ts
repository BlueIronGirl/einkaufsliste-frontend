import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProfileService} from "../../../service/profile.service";
import {MessageService} from "primeng/api";
import {DialogService} from "primeng/dynamicdialog";

@Component({
  providers: [DialogService],
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent {
  profileForm: FormGroup;
  file: string = '';

  constructor(private fb: FormBuilder, private profileService: ProfileService, private messageService: MessageService) {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      avatar: ''
    });
  }

  onSubmit() {
    if (this.profileForm.valid && this.file) {
      const formData = new FormData();
      formData.append('file', this.file);

      // this.profileService.uploadFile(formData);

      // Handle form submission
      console.log('Form Submitted', this.profileForm.value);
    }
  }


}
