import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as L from 'leaflet'
import { MarkerService } from '../marker.service';
import { PopupService } from '../popup.service';
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";

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
    this.map.on("click", e => {
       this.markerService.makeCapitalMarkers(this.map,e);      
  });
  //var print =(L.Control as any).browserPrint().addTo(this.map);
 var geocoder =(L.Control as any).geocoder(
  {    
    markersPopup: function( result ) {
      this.popupService.makeCapitalPopup(this.data)
      return result.properties.label;
      }
}
 ).addTo(this.map)
 .addControl((L.Control as any).geocoderControl('mapbox.places', {
  autocomplete: true
}));
     geocoder.markGeocode = function(result) {
       
     };
//   var searchLayer = L.layerGroup().addTo(this.map);
// //... adding data in searchLayer ...
// this.map.addControl( new L.Control.Search({layer: searchLayer}) );
}}
