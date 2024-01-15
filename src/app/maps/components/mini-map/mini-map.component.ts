import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Map, MapStyle, Marker, config } from '@maptiler/sdk';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'map-mini-map',
  templateUrl: './mini-map.component.html',
  styleUrls: ['./mini-map.component.css'],
})
export class MiniMapComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input()
  lngLat?: [number, number];

  @ViewChild('map')
  divMap!: ElementRef<HTMLElement>;

  map?: Map;

  ngOnInit(): void {
    config.apiKey = environment.map_tilder_key;
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

  ngOnDestroy(): void {
    this.map?.remove();
  }
}
