import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';
import { PopupService } from './popup.service';
import { popup } from 'leaflet';

@Injectable({
  providedIn: 'root'
})

export class MarkerService {
  capitals: string = '/assets/data/usa-capitals.geojson';

  constructor(
    private http:HttpClient,
    private popupService:PopupService
    ) { }

//loop through the data and add a marker to the map 

    makeCapitalMarkers(map:L.Map,e):void { 
      const marker = L.marker([e.latlng.lng,e.latlng.lat]);
      fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + e.latlng.lat + '&lon=' + e.latlng.lng + '&appid=2e7774eae64d640eafb5606f4062b3b0')
      .then(r => r.json())
      .then(data => { 
          // Change this line to show exactly the info you need          
          console.log(data);
          marker.bindPopup(
          this.popupService.makeCapitalPopup(data));
          marker.addTo(map);
      });
       } 
}
