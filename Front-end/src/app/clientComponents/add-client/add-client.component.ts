import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientServiceService } from '../client-service.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
  constructor(private dialog: MatDialog, private router:Router, private fb: FormBuilder,
    private clientService: ClientServiceService, private route: ActivatedRoute) { }

  ngOnInit(): void {}

  registrationForm = this.fb.group({
    name: ['', Validators.required],
    phoneNumber: ['', Validators.required],
    email: ['', Validators.required],
    address: ['', Validators.required],
  })


  addClient(client:any){
    if(this.registrationForm.valid){
      this.clientService.addClient(client)
      .subscribe((res)=>{
        sessionStorage.clear()
        this.dialog.closeAll()
      })
    }

    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';

    this.router.navigate(['/clients'], {relativeTo: this.route})
  }

}
