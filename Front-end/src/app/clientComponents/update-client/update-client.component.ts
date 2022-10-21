import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ClientServiceService } from '../client-service.service';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'updateClient',
  templateUrl: './update-client.component.html',
  styleUrls: ['./update-client.component.css']
})
export class UpdateClientComponent implements OnInit {
    constructor(private dialog: MatDialog, private router:Router, private fb: FormBuilder,
      private clientServiceService: ClientServiceService, private route: ActivatedRoute,
      private cookieService: CookieService) { }

  ngOnInit(): void {
    console.log(this.cookieService.get('clientInfos'))
    this.cookieService.delete('clientInfos')
  }

  registrationForm = this.fb.group({
    name: [this.cookieService.get('clientInfos').split('/')[0], Validators.required],
    phone: [this.cookieService.get('clientInfos').split('/')[1], Validators.required],
    email: [this.cookieService.get('clientInfos').split('/')[3], Validators.required],
    address: [this.cookieService.get('clientInfos').split('/')[2], Validators.required],
  })


  updateClient(client:any){
    if(this.registrationForm.valid) {
      client.id = Number(this.cookieService.get('clientID'))
      this.cookieService.get('clientID');
      this.dialog.closeAll()

      this.clientServiceService.updateClient(client)
      .subscribe((result)=>{
        console.log(result)
        this.dialog.closeAll()
      })
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';

      this.router.navigate(['/clients'], {relativeTo: this.route})
    }
  }
}
