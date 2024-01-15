import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { LngLat, Map, MapStyle, config } from '@maptiler/sdk';

@Component({
  templateUrl: './zoom-range-page.component.html',
  styleUrls: ['./zoom-range-page.component.css'],
})
export class ZoomRangePageComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  map?: Map;

  zoom: number = 10;

  currentLngLat: LngLat = new LngLat(-4.349520654470098, 36.580532292001394);

  @ViewChild('map')
  divMap!: ElementRef<HTMLElement>;

  ngOnInit(): void {
    config.apiKey = '4ZhCRwabcTcu8HiFySp0';
  }

  ngAfterViewInit() {
    if (!this.divMap) throw Error('El elemento HTML no fue encontrado');

    this.map = new Map({
      container: this.divMap.nativeElement,
      style: MapStyle.STREETS,
      center: this.currentLngLat,
      zoom: this.zoom,
    });

    this.mapListeners();
  }

  ngOnDestroy() {
    this.map?.remove();
  }

  mapListeners() {
    if (!this.map) throw Error('Mapa no inicializado');

    this.map.on('zoom', (ev) => {
      // console.log(ev);
      this.zoom = this.map!.getZoom();
    });

    this.map.on('zoomend', (ev) => {
      if (this.map!.getZoom() < 18) return;
      // console.log(ev);
      this.map?.zoomTo(18);
    });

    this.map.on('move', (ev) => {
      this.currentLngLat = this.map!.getCenter();
      // console.log(this.currentLngLat);
    });
  }

  zoomIn() {
    this.map?.zoomIn();
  }
  zoomOut() {
    this.map?.zoomOut();
  }

  zoomChanged(value: string) {
    this.zoom = Number(value);
    this.map?.zoomTo(this.zoom);
  }
}
