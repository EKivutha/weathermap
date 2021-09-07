import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PopupService {
  static setContent: any;
   setContent(w: any) {
    return `` +
    `<div>Capital: ${ w.cityname }</div>` +
    `<div>State: ${ w.state }</div>` +
    `<div>Population: ${ w.population }</div>`
  }
  constructor() { }
  makeCapitalPopup(data: any): string{     
    return `` +
      `<div>Capital: ${ data.name }</div>` +
      `<div>State: ${ data.state }</div>` +
      `<div>Population: ${ data.population }</div>`
  }}

