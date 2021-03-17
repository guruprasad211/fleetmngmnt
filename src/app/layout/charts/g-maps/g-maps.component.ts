import { Component, OnInit, ViewChild } from '@angular/core';
import { AgmMap, MapsAPILoader } from '@agm/core';

import { map } from "rxjs/operators";
import { interval } from 'rxjs/internal/observable/interval';

@Component({
  selector: 'g-maps',
  templateUrl: './g-maps.component.html',
  styleUrls: ['./g-maps.component.css']
})
export class GMapsComponent implements OnInit {
  lat: any = 17.3850;
  lng: any = 78.4867;
  zoom: number = 10;
  mapClicked: boolean = false;
  clickedLat: number = null;
  clickedLng: number = null;
  @ViewChild(AgmMap, { static: true }) public agmMap: AgmMap;
  // initial center position for the map

  currentPos: any = {
    lat: 50.082730,
    lng: 14.431697
  };
  points: any[] = [];
  tmpPoints: any[] = [
    this.currentPos,
    {
      lat: 50.082911,
      lng: 14.431411
    },
    {
      lat: 50.083202,
      lng: 14.430994
    },
    {
      lat: 50.083352,
      lng: 14.430780
    },
    {
      lat: 50.083491,
      lng: 14.430569
    },
    {
      lat: 50.083644,
      lng: 14.430367
    }
  ];

  @ViewChild('gmap', { static: true }) gmapElement: any;
  map: google.maps.Map;
  isTracking = false;
  currentLat: any;
  currentLong: any;
  marker: google.maps.Marker;
  latitude: any;
  longitude: any;
  getAddress: any;

  constructor(private apiloader: MapsAPILoader) { }

  ngOnInit(): void {
    //  this.loadGoogleMap();
    this.loadAgmMap();
  }

  loadGoogleMap() {
    // 18.5793, 73.8143
    var mapProp = {
      center: new google.maps.LatLng(this.currentPos.lat, this.currentPos.lng),
      zoom: 16,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);

    // let i = 0;

    // const obs: any = interval(2000)
    //   .pipe(
    //     map(v => i < this.tmpPoints.length)
    //   )
    //   // .pipe(takeWhile((v) => i < this.tmpPoints.length))
    //   .subscribe(() => {
    //     const pos = this.tmpPoints[i];
    //     this.points.push(pos);
    //     this.currentPos = pos;
    //     i++;
    //     console.log(this.points);
    //   })

    let tmpPointsLen = this.tmpPoints.length;
    for (let i = 0; i < tmpPointsLen; i++) {
      setTimeout(() => {
        // if (i < tmpPointsLen) {
        const pos = this.tmpPoints[i];
        this.points.push(pos);
        this.currentPos = pos;
        // i++;
        // }
      }, 2000);
    }

  }

  findMe() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.showPosition(position);
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  showPosition(position) {
    this.currentLat = position.coords.latitude;
    this.currentLong = position.coords.longitude;

    let location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    this.map.panTo(location);

    if (!this.marker) {
      this.marker = new google.maps.Marker({
        position: location,
        map: this.map,
        title: 'Got you!'
      });
    }
    else {
      this.marker.setPosition(location);
    }
  }

  trackMe() {
    if (navigator.geolocation) {
      this.isTracking = true;
      navigator.geolocation.watchPosition((position) => {
        this.showTrackingPosition(position);
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  showTrackingPosition(position) {
    console.log(`tracking postion:  ${position.coords.latitude} - ${position.coords.longitude}`);
    this.currentLat = position.coords.latitude;
    this.currentLong = position.coords.longitude;

    let location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    this.map.panTo(location);

    if (!this.marker) {
      this.marker = new google.maps.Marker({
        position: location,
        map: this.map,
        title: 'Got you!'
      });
    }
    else {
      this.marker.setPosition(location);
    }
  }

  /**agm map events */

  loadAgmMap() {
    this.get()
    this.agmMap.triggerResize(true);
    this.zoom = 16;
  }

  onMapClick($event: any) {
    this.latitude = $event.coords.lat,
      this.longitude = $event.coords.lng
    this.apiloader.load().then(() => {
      let geocoder = new google.maps.Geocoder;
      let latlng = {
        lat: this.latitude,
        lng: this.longitude
      };
      geocoder.geocode({
        'location': latlng
      }, function (results) {
        if (results[0]) {
          this.currentLocation = results[0].formatted_address;
          console.log(this.currentLocation);
        } else {
          console.log('Not found');
        }
      });
    });
  }

  get() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: any) => {
        if (position) {
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
          this.getAddress = (this.lat, this.lng)
          console.log(position)
          this.apiloader.load().then(() => {
            let geocoder = new google.maps.Geocoder;
            let latlng = {
              lat: this.lat,
              lng: this.lng
            };
            geocoder.geocode({
              'location': latlng
            }, function (results) {
              if (results[0]) {
                this.currentLocation = results[0].formatted_address;
                console.log(this.assgin);
              } else {
                console.log('Not found');
              }
            });
          });
        }
      })
    }
  }

}
