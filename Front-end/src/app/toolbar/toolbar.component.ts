import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  logoPath:string = "../../assets/images/logo.png"
  constructor() { }

  ngOnInit(): void {
  }

}
