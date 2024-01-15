import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Map, MapStyle, Marker, config } from '@maptiler/sdk';

@Component({
  selector: 'map-mini-map',
  templateUrl: './mini-map.component.html',
  styleUrls: ['./mini-map.component.css'],
})
export class MiniMapComponent implements OnInit, AfterViewInit {
  @Input()
  lngLat?: [number, number];

  @ViewChild('map')
  divMap!: ElementRef<HTMLElement>;

  map?: Map;

  ngOnInit(): void {
    config.apiKey = '4ZhCRwabcTcu8HiFySp0';
  }

  ngAfterViewInit(): void {
    if (!this.divMap.nativeElement)
      throw Error('El elemento HTML no fue encontrado');
    if (!this.lngLat) throw Error('lngLat NO puede ser null');

    this.map = new Map({
      container: this.divMap.nativeElement,
      style: MapStyle.STREETS,
      center: this.lngLat,
      zoom: 15,
      interactive: false,
    });

    new Marker().setLngLat(this.lngLat).addTo(this.map);
  }
}
