import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewContainerRef,
  ViewChild,
  TemplateRef,
  ChangeDetectorRef,
  ElementRef,
  OnChanges,
  SimpleChanges,
  SimpleChange,
} from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from '@interfaces/user.interface';

@Component({
  selector: 'user-image-change',
  templateUrl: './user-image-change.component.html',
  styleUrls: ['./user-image-change.component.scss'],
})
export class UserImageChangeComponent implements OnInit, OnChanges {
  @Input() user: User;
  @Output() changeUserImage: EventEmitter<File> = new EventEmitter();
  @ViewChild('imageContainer', { read: ViewContainerRef, static: false }) imageContainer: ViewContainerRef;
  @ViewChild('fileInput', { static: false }) fileInputRef: ElementRef;
  imageControl: FormControl;
  imageUrl = '';
  modified: boolean;
  image: File;

  constructor(private fb: FormBuilder, private changeDetector: ChangeDetectorRef, private toastr: ToastrService) {}

  ngOnInit() {
    this.initForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.setImageUrl(changes.user);
  }

  private setImageUrl(change: SimpleChange) {
    const user: User = change.currentValue;
    if (!user) return;
    this.imageUrl = user.imageUrl;
  }

  private initForm() {
    this.imageControl = this.fb.control(null, Validators.required);
  }

  showControl(event: Event, template: TemplateRef<any>) {
    const button = event.target as HTMLButtonElement;
    if (button.innerText === 'изменить') {
      button.innerText = 'отмена';
      this.modified = true;
      this.imageContainer.createEmbeddedView(template);
    } else {
      button.innerText = 'изменить';
      this.modified = false;
      this.imageContainer.clear();
      this.resetInputs();
    }
  }

  private resetInputs() {
    this.imageControl.reset();
    this.fileInputRef.nativeElement.value = null;
    this.imageUrl = this.user.imageUrl || '';
  }

  onFileChange() {
    const input = this.fileInputRef.nativeElement as HTMLInputElement;
    const reader: FileReader = new FileReader();

    if (input.files && input.files.length) {
      const file: File = input.files[0];

      if (
        file.size <= 1024 * 1024 * 2 &&
        (file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/gif')
      ) {
        this.image = file;
        reader.readAsDataURL(file);

        reader.onload = () => {
          this.imageUrl = reader.result as string;
          this.imageControl.patchValue({
            file: reader.result,
          });
          this.changeDetector.markForCheck();
        };
      } else {
        this.resetInputs();
        this.toastr.warning('Неаерный тип или размер файла');
      }
    }
  }

  triggerInputClick() {
    this.fileInputRef.nativeElement.click();
  }

  onSubmit() {
    if (this.imageControl.invalid) return;

    this.changeUserImage.emit(this.image);
    this.resetInputs();
  }
}
