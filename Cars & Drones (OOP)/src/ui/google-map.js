import {BaseElement} from "./base-element.js";

export class GoogleMap extends BaseElement { //Allows the class to be imported and re-used

    //Initializes components with centerOfMap and data
    constructor(centerOfMap, data) {
        super();
        this.centerOfMap = centerOfMap;
        this.data = data;
    }

    createElement() {
        super.createElement();

        //Initializes a google map with centering and zoom levels set
        setTimeout(() => { //Delays execution to ensure the DOM map element is fully loaded
            var map = new window.google.maps.Map(document.getElementById('map'), {
                zoom: 13,
                center: this.centerOfMap
            });

            //Iterates over a list of vehicle data and places a corresponding marker on a map for each's location
            for (let vehicle of this.data) {
                let [lat, long] = vehicle.latLong.split(' '); //Splits the string with lat and long coordinates into an array of two elements
                let myLatLng = new window.google.maps.LatLng(lat, long); //Creates Google-Maps LatLng object representing the geographical location using extracted lat/long values

                var marker = new window.google.maps.Marker({ //Creates a new Google-Maps marker object and sets the location on the map
                    position: myLatLng,
                    map: map
                });

                marker.setMap(map); //Adds the created marker to the map instance
            }

        }, 0);
    }

    getElementString() { //Sets height and width of displayed map
        return `<div style="width: 800px; height: 400px;" id="map"></div>`;
    }
}
