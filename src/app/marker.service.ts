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

      this.http.get('api.openweathermap.org/data/2.5/weather?lat=' + e.latlng.lat + '&lon=' + e.latlng.lng + '&appid= 33c3730c5f8b5b42fc6f67a3dd4746d2').subscribe((res: any)=> {
        for (const c of res){
          const lon = c.coord.lon;
          const lat = c.coord.lat;
          const marker = L.marker([lat, lon]);

          marker.bindPopup(
            // this.popupService.makeCapitalPopup(c.properties)
            "You clicked the map at -<br>" + 
            "<b>lon:</b> " +c.main.temp+"<br>" + 
            "<b>lat:</b> " +c.weather.description+"<br>" 
            );              
            marker.on('mouseover',function(ev) {
              ev.target.openPopup();               
            });      
            marker.on('mouseout', function (e) {
              marker.closePopup();
          });       
            marker.addTo(map);
          }
        });
       } 
}
