import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as L from 'leaflet'
import { MarkerService } from '../marker.service';

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
  marker: any;

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

    tiles.addTo(this.map);
    this.marker.on("click", e => {
      console.log(e.latlng); // get the coordinates
      if (this.marker) { // check
        //this.map.removeLayer(this.myMarker); // remove
    } this.marker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(this.map); // add the marker onclick
    });

  }
  constructor(private markerService: MarkerService) {}
  
  ngAfterViewInit():void{
    this.initMap();
    this.markerService.makeCapitalMarkers(this.map)
  }

}
