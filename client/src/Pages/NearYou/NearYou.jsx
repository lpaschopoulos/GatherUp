import React, { useContext, useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import axios from 'axios';
import { EventContext } from '../../Context/context';
import Select from 'react-select';
import { useLocation } from 'react-router-dom';

import './NearYou.css';

const NearYou = () => {
  const location = useLocation();
  const events = useContext(EventContext);

  const [enhancedEvents, setEnhancedEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedEventOption, setSelectedEventOption] = useState(null);
  const [selectedCityOption, setSelectedCityOption] = useState(null);
  const [selectedCityCoordinates, setSelectedCityCoordinates] = useState(null);
  const focusedEventId = location.state?.focusedEventId;
  const defaultCenter = { lat: 40.302, lng: 21.788 };

  const eventOptions = events.map((event, index) => ({ value: index, label: event.title }));
  const cityOptions = [...new Set(events
    .filter(event => event.city !== 'Online') // Exclude 'Online' city
    .map(event => event.city))]
    .map(city => ({ value: city, label: city }));

  const coordinateCache = {};

  const fetchCoordinates = async (city, location) => {
    const detailedLocationIdentifier = `${location}, ${city}`;
    const cityIdentifier = city;
  
    if (coordinateCache[detailedLocationIdentifier]) {
      return coordinateCache[detailedLocationIdentifier];
    }
  
    if (coordinateCache[cityIdentifier]) {
      return coordinateCache[cityIdentifier];
    }
  
    try {
      let response = await axios.get(`https://nominatim.openstreetmap.org/search`, {
        params: {
          q: detailedLocationIdentifier,
          format: 'json'
        },
        headers: {
          'User-Agent': 'Gather'
        }
      });
  
      if (!response.data[0]) {
        console.warn(`No results found for detailed location: ${detailedLocationIdentifier}. Falling back to city.`);
  
        // Fallback to just the city
        response = await axios.get(`https://nominatim.openstreetmap.org/search`, {
          params: {
            q: cityIdentifier,
            format: 'json'
          },
          headers: {
            'User-Agent': 'Gather'
          }
        });
  
        if (!response.data[0]) {
          console.error(`No results found even for city: ${cityIdentifier}`);
          return [null, null];
        }
      }
  
      const locationData = response.data[0];
      const coordinates = [parseFloat(locationData.lat), parseFloat(locationData.lon)];
  
      coordinateCache[detailedLocationIdentifier] = coordinates;
      coordinateCache[cityIdentifier] = coordinates;
  
      return coordinates;
    } catch (error) {
      console.error("Failed to fetch coordinates: ", error);
      return [null, null];
    }
  };


  useEffect(() => {
    let isMounted = true;

    const fetchEventCoordinates = async () => {
      const eventsToFetch = events.filter(event => {
        if (selectedEventOption && selectedCityOption) {
          return event.title === selectedEventOption.label && event.city === selectedCityOption.label;
        }
        if (selectedEventOption) {
          return event.title === selectedEventOption.label;
        }
        if (selectedCityOption) {
          return event.city === selectedCityOption.label;
        }
        return false;
      });

      const updatedEvents = await Promise.all(eventsToFetch.map(async (event) => {
        const [latitude, longitude] = await fetchCoordinates(event.city, event.location);
        return isMounted ? { ...event, latitude, longitude } : null;
      }));

      if (isMounted) {
        setEnhancedEvents(updatedEvents.filter(e => e !== null));
      }
    };

    fetchEventCoordinates();

    return () => {
      isMounted = false;
    };
  }, [events, selectedEventOption, selectedCityOption]);

  useEffect(() => {
    if (focusedEventId) {
      const focusedEvent = events.find(event => event._id === focusedEventId);
      if (focusedEvent) {
        const focusedEventIndex = events.indexOf(focusedEvent);
        setSelectedEventOption({ value: focusedEventIndex, label: focusedEvent.title });
      }
    }
  }, [focusedEventId, events]);

  // Define filteredEvents based on the selected options
  const filteredEvents = enhancedEvents.filter(event => {
    if (selectedEventOption && selectedCityOption) {
      return event.title === selectedEventOption.label && event.city === selectedCityOption.label;
    }
    if (selectedEventOption) {
      return event.title === selectedEventOption.label;
    }
    if (selectedCityOption) {
      return event.city === selectedCityOption.label;
    }
    return false;
  });
  const selectedCoordinates = selectedEvent 
    ? { lat: selectedEvent.latitude, lng: selectedEvent.longitude }
    : selectedCityCoordinates 
      ? selectedCityCoordinates 
      : defaultCenter; 
  return (
    <div className="map-container">
      <div className="dropdown-container-map">
        {/* <Select 
          className="event-select"
          options={eventOptions} 
          placeholder="Select an Event" 
          onChange={(option) => setSelectedEventOption(option)}
        /> */}
        <Select 
          className="city-select"
          options={cityOptions} 
          placeholder="Select a City" 
          onChange={(option) => setSelectedCityOption(option)}
        />
      </div>
      
        <GoogleMap 
          mapContainerStyle={{ height: "700px", width: "700px" }} 
          zoom={7} 
          center={selectedCoordinates || defaultCenter}
        >
          {filteredEvents.map((event, index) => {
            if (event.latitude && event.longitude) {
              return (
                <Marker
                  key={index}
                  position={{ lat: event.latitude, lng: event.longitude }}
                  onClick={() => setSelectedEvent(event)}
                />
              );
            }
            return null;
          })}

          {selectedEvent && (
            <InfoWindow
              position={{ lat: selectedEvent.latitude, lng: selectedEvent.longitude }}
              onCloseClick={() => setSelectedEvent(null)}
            >
              <div>
                <h4>{selectedEvent.title}</h4>
                <p>Location: {selectedEvent.location}</p>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
    </div>
  );
};

export default NearYou;