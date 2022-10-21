import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ClientServiceService {
  url: string=environment.APIURL;
  constructor(private http: HttpClient) {}

  getClient(owner:any){
    // console.log(owner)
    return this.http.get(this.url+`/getClient/${owner}`);
  }

  getClients(){
    return this.http.get(this.url+'/getClients');
  }

  addClient(body:any){
    console.log('body: ', body);
    return this.http.post(this.url+'/addClient' , body);
  }

  updateClient(body:any){
    console.log('body:  ', body)
    return this.http.put(this.url+'/updateClient',body);
  }

  deleteClient(clientID:any){
    console.log({clientID})
    return this.http.put(this.url+`/deleteClient`, {clientID});
  }
}
