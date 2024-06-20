import {Component, OnInit} from '@angular/core';
import {ControlValueAccessor, FormBuilder, NG_VALUE_ACCESSOR} from "@angular/forms";
import {FileSelectEvent} from "primeng/fileupload";
import {ImageCropperComponent} from "../../../common/image-cropper/image-cropper.component";
import {ProfileService} from "../../../../service/profile.service";
import {MessageService} from "primeng/api";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {environment} from "../../../../../environments/environment";

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: AvatarComponent
    }
  ]
})
export class AvatarComponent implements OnInit, ControlValueAccessor {
  api = `${environment.webserviceurl}/profil/uploadFile`;
  file: string = '';
  ref: DynamicDialogRef | undefined;

  onChange = (fileUrl: string) => {
  };
  onTouched = () => {
  };

  disabled: boolean = false;

  constructor(private fb: FormBuilder, private profileService: ProfileService, private messageService: MessageService, private dialogService: DialogService) {

  }

  ngOnInit(): void {
  }

  writeValue(_file: string): void {
    this.file = _file;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onSelect(event: FileSelectEvent) {
    const file = event.files[0];
    if (file) {
      const _file = URL.createObjectURL(file);
      this.file = _file;
      this.resetInput();

      this.openAvatarEditor(_file);
    }
    this.messageService.add({severity: 'success', summary: 'Success', detail: 'Das Profilbild wurde geändert!'});
  }

  openAvatarEditor(image: string): void {
    this.ref = this.dialogService.open(ImageCropperComponent, {
      width: '80vw',
      height: '80vh',
      data: image,
    });

    this.ref.onClose.subscribe((result: any) => {
      if (result) {
        this.file = result;
        this.onChange(this.file);
        this.messageService.add({ severity: 'info', summary: 'Image Selected', detail: result });
      }
    });
  }

  resetInput() {
    const input = document.getElementById('avatar-input-file') as HTMLInputElement;
    if (input) {
      input.value = "";
    }
  }
}
