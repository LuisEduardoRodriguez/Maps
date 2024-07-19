import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

const MapComponent = () => {
  const [response, setResponse] = useState(null);
  const mapRef = useRef(null);

  useEffect(() => {
    const loader = new Loader({
      apiKey: 'AIzaSyACS3Avh31nwwPlkUDvuDSnadAbdDW7HZ0',
      version: 'weekly',
      libraries: ['places'],
    });

    loader.load().then(() => {
      const map = new google.maps.Map(mapRef.current, {
        center: { lat: 41.3851, lng: 2.1734 },
        zoom: 13,
      });

      const directionsService = new google.maps.DirectionsService();
      const directionsRenderer = new google.maps.DirectionsRenderer();
      directionsRenderer.setMap(map);

      const request = {
        origin: { lat: 4.5908748, lng: -74.220593 },  // Punto A
        destination: { lat: 4.5754654, lng: -74.172995 },  // Punto B
        travelMode: 'DRIVING',
      };

      directionsService.route(request, (result, status) => {
        if (status === 'OK') {
          setResponse(result);
          directionsRenderer.setDirections(result);
        } else {
          console.log('La solicitud de indicaciones falló debido a ' + status);
        }
      });
    });
  }, []);

  return <div id="map" ref={mapRef} style={{ height: "100vh", width: "100%" }} />;
}

export default MapComponent;
