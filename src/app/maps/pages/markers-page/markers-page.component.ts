import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { LngLat, Map, MapStyle, Marker, config } from '@maptiler/sdk';
import { environment } from 'src/environments/environment';

interface MarkerAndColor {
  color: string;
  marker: Marker;
}

interface PlainMarker {
  color: string;
  lngLat: number[];
}

@Component({
  templateUrl: './markers-page.component.html',
  styleUrls: ['./markers-page.component.css'],
})
export class MarkersPageComponent implements OnInit, AfterViewInit, OnDestroy {
  map?: Map;

  zoom: number = 15;

  markers: MarkerAndColor[] = [];

  currentLngLat: LngLat = new LngLat(-4.4203838700834694, 36.72071875943824);

  @ViewChild('map')
  divMap!: ElementRef<HTMLElement>;

  ngOnInit(): void {
    config.apiKey = environment.map_tilder_key;
  }

  ngAfterViewInit() {
    if (!this.divMap) throw Error('El elemento HTML no fue encontrado');

    this.map = new Map({
      container: this.divMap.nativeElement,
      style: MapStyle.STREETS,
      center: this.currentLngLat,
      zoom: this.zoom,
    });

    this.readFromLocalStorage();
  }

  ngOnDestroy() {
    this.map?.remove();
  }

  createMArker() {
    if (!this.map) return;
    const color = '#xxxxxx'.replace(/x/g, (y) =>
      ((Math.random() * 16) | 0).toString(16)
    );

    const lngLat = this.map?.getCenter();

    this.addMarker(lngLat, color);
  }

  addMarker(lngLat: LngLat, color: string) {
    if (!this.map) return;

    const marker = new Marker({
      color: color,
      draggable: true,
    })
      .setLngLat(lngLat)
      .addTo(this.map);

    this.markers.push({
      color,
      marker,
    });

    this.saveToLocalStorage();

    marker.on('dragend', () => this.saveToLocalStorage());
  }

  deleteMarker(index: number) {
    this.markers[index].marker.remove();
    this.markers.splice(index, 1);
  }

  flyTo(marker: Marker) {
    this.map?.flyTo({
      zoom: 14,
      center: marker.getLngLat(),
    });
  }

  saveToLocalStorage() {
    const plainMarker: PlainMarker[] = this.markers.map(({ color, marker }) => {
      return {
        color,
        lngLat: marker.getLngLat().toArray(),
      };
    });

    console.log({ plainMarker });

    localStorage.setItem('plainMarkers', JSON.stringify(plainMarker));
  }

  readFromLocalStorage() {
    const plainMarkerString = localStorage.getItem('plainMarkers') ?? '[]';

    const plainMarkers = JSON.parse(plainMarkerString);

    // console.log(plainMarkers);

    plainMarkers.forEach(({ color, lngLat }) => {
      const [lng, lat] = lngLat;
      const coords = new LngLat(lng, lat);

      this.addMarker(coords, color);
    });
  }
}
