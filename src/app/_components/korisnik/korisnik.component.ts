import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Korisnik } from 'src/app/_models/korisnik';
import { KorisnikService } from 'src/app/_services/korisnik.service';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/_services/authentication.service';

@Component({
  selector: 'app-korisnik',
  templateUrl: './korisnik.component.html'
})
export class KorisnikComponent implements OnInit {
  korisnik: Korisnik;
  userForm: FormGroup;
  message: string = "";
  enabled: boolean;
  isEnabled: boolean;

  constructor(private korisnikService: KorisnikService, private router: Router, 
    private authService: AuthenticationService, private toastr: ToastrService) { }

  ngOnInit() {

    this.korisnikService.getAll(this.authService.currentUserValue.email).subscribe(data => {
      this.userDTO = data
    });

    this.userForm = new FormGroup({
      email: new FormControl(null, Validators.email)
    });
  }

  onSubmit() {
    this.korisnikService.updateUserEmail(this.userDTO.userId, this.userDTO.email).subscribe(
      data => {
        this.toastr.success(data, 'User profile');
        this.authService.logout();
        this.router.navigate(['/']);
      }, message => {
        if (message.status != 200)
        this.toastr.error( "This email already exist!", 'User profile');
      }
    );
  }

  emailChange(event: { target: HTMLInputElement; }) {
    if (this.enabled) this.isEnabled = true;
    this.enabled = true;
  }

  onSelectFile(event: { target: HTMLInputElement; }) {
    if (event.target.files && event.target.files[0]) {
      var mimeType = event.target.files[0].type;

      if (mimeType.match(/image\/*/) == null) {
        this.message = "Only images are supported.";
        return;
      }

      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      let formdata: FormData = new FormData();
      formdata.append('file', event.target.files[0]);

      this.userService.addImage(formdata).subscribe(imageFile => {
        if (imageFile) {
          this.userDTO.pathImage = this.baseurl + '/file?imagePath=' + imageFile.image;
          this.userService.updateUserImage(this.userDTO.userId, this.userDTO.pathImage).subscribe(
            data => {
              this.toastr.success(data, 'User profile');
            }, message => {
              if (message.status != 200) 
                 this.toastr.error( "Error!", 'User profile');
            }
          );
        }
      });
    }
  }
}