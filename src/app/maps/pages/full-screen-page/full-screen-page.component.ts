import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Map, MapStyle, Marker, config } from '@maptiler/sdk';
import { environment } from 'src/environments/environment';

// import '@maptiler/sdk/dist/maptiler-sdk.css';

@Component({
  templateUrl: './full-screen-page.component.html',
  styleUrls: ['./full-screen-page.component.css'],
})
export class FullScreenPageComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  map: Map | undefined;

  @ViewChild('map')
  divMap!: ElementRef<HTMLElement>;

  ngOnInit(): void {
    config.apiKey = environment.map_tilder_key;
  }

  ngAfterViewInit() {
    const initialState = { lng: 139.753, lat: 35.6844, zoom: 14 };

    if (!this.divMap) throw Error('El elemento HTML no fue encontrado');

    this.map = new Map({
      container: this.divMap.nativeElement,
      style: MapStyle.STREETS,
      center: [initialState.lng, initialState.lat],
      zoom: initialState.zoom,
    });
  }

  ngOnDestroy() {
    this.map?.remove();
  }
}
