import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProfileService} from "../../../service/profile.service";
import {FileSelectEvent, FileUploadEvent} from "primeng/fileupload";
import {environment} from "../../../../environments/environment";
import {MessageService} from "primeng/api";
import {ImageCropperComponent} from "../../common/image-cropper/image-cropper.component";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";

@Component({
  providers: [DialogService],
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent {
  profileForm: FormGroup;
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  api = `${environment.webserviceurl}/profil/uploadFile`;
  file: string = '';
  ref: DynamicDialogRef | undefined;

  constructor(private fb: FormBuilder, private profileService: ProfileService, private messageService: MessageService, private dialogService: DialogService) {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSelect(event: FileSelectEvent) {
    const file = event.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = e => this.imagePreview = reader.result;
      reader.readAsDataURL(file);

      const _file = URL.createObjectURL(file);
      this.file = _file;
      this.resetInput();

      this.openAvatarEditor(_file);
    }
    this.messageService.add({severity: 'success', summary: 'Success', detail: 'Das Profilbild wurde geändert!'});
  }

  onUpload(event: FileUploadEvent) {
    const file = event.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = e => this.imagePreview = reader.result;
      reader.readAsDataURL(file);
    }
    this.messageService.add({severity: 'success', summary: 'Success', detail: 'Das Profilbild wurde geändert!'});
  }

  onFileChange(event: any) {
    const files = event.target.files as FileList;

    if (files.length > 0) {
      const _file = URL.createObjectURL(files[0]);
      this.file = _file;
      this.resetInput();

      this.openAvatarEditor(_file);
    }
  }

  openAvatarEditor(image: string): void {
    this.ref = this.dialogService.open(ImageCropperComponent, {
      width: '80vw',
      height: '80vh',
      data: image,
    });

    this.ref.onClose.subscribe((image: any) => {
      if (image) {
        this.messageService.add({ severity: 'info', summary: 'Image Selected', detail: image });
      }
    });
  }

  resetInput() {
    const input = document.getElementById('avatar-input-file') as HTMLInputElement;
    if (input) {
      input.value = "";
    }
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
