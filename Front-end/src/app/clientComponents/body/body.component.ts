import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AddClientComponent } from '../add-client/add-client.component';
import { ClientServiceService } from '../client-service.service';
import { UpdateClientComponent } from '../update-client/update-client.component';

const ELEMENT_DATA: any[] = [
  {clientID: 5, clientName: 'Ilyes', phoneNumber: 24400758, email: 'dada@gmail.com', createdOn: new Date(), address: "La Marsa"},
  {clientID: 6, clientName: 'Mohamed', phoneNumber: 24400758, email: 'dada@gmail.com', createdOn: new Date(), address: "La Marsa"},
  {clientID: 12, clientName: 'Aziz', phoneNumber: 24400758, email: 'dada@gmail.com', createdOn: new Date(), address: "La Marsa"},
];


@Component({
  selector: 'body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})

export class BodyComponent implements OnInit {
  displayedColumns: string[] = ['ClientID', 'clientName','phoneNumber','email','createdOn','address','options'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatSort) sort:any;
  @ViewChild(MatPaginator) paginator:any;
  constructor(private dialog: MatDialog, private clientService: ClientServiceService, private router: Router,
    private route: ActivatedRoute, private cookieService: CookieService) {}

  ngOnInit(): void {
    this.clientService.getClients()
    .subscribe((res:any) => {
      this.dataSource = new MatTableDataSource(res.Output);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(clientID:number, operation:string){
    if(operation == 'UPDATE'){
      console.log(clientID)
      this.clientService.getClient(clientID)
      .subscribe((clientInfos)=>{
        this.cookieService.set('clientInfos', String(clientInfos))
        this.cookieService.set('clientID', String(clientID))
        this.dialog.open(UpdateClientComponent)
      })
    }
    if(operation == 'DELETE')
    this.clientService.deleteClient(clientID)
    .subscribe(res=>{

    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';

    this.router.navigate(['/clients'], {relativeTo: this.route})
    })
  }

  addClient(){
    this.dialog.open(AddClientComponent)
  }

}
