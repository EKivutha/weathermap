import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as L from 'leaflet'
import { MarkerService } from '../marker.service';
import { PopupService } from '../popup.service';

const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements AfterViewInit{
  private map;
  private initMap():void{
    this.map = L.map('map', {
      center:[0.1769, 37.9083],
      zoom: 3
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
    tiles.addTo(this.map)
  }
  constructor(private markerService: MarkerService) {}
  
  ngAfterViewInit():void{
    this.initMap();
    this.markerService.makeCapitalMarkers(this.map);
    this.map.on("click", e => {
      console.log(e.latlng); // get the coordinates
      L.marker([e.latlng.lat, e.latlng.lng]).addTo(this.map); // add the marker onclick
      fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + e.latlng.lat + '&lon=' + e.latlng.lng + '&appid=' + yourApiKey)
      .then(r => r.json()) 
      .then(data => { 
          // Change this line to show exactly the info you need
          PopupService.setContent(data.weather.map(w => w.description).join(", "))
      })
    });  
    
  }

}
