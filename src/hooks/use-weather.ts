import { useQuery } from "@tanstack/react-query";
import { weatherAPI } from "@/api/weather";
import type { Coordinates } from "@/api/types";

export const WEATHER_KEYS = {
  weather: (coords: Coordinates) => ["weather", coords] as const,
  forecast: (coords: Coordinates) => ["forecast", coords] as const,
  location: (coords: Coordinates) => ["location", coords] as const,
  search: (query: string) => ["location-search", query] as const,
} as const;

// export function useWeatherQuery(coordinates: Coordinates | null) {
//   return useQuery({
//     queryKey: WEATHER_KEYS.weather(coordinates ?? { lat: 0, lon: 0 }),
//     queryFn: () =>
//       coordinates ? weatherAPI.getCurrentWeather(coordinates) : null,
//     enabled: !!coordinates,
//   }); 
// }
// useWeatherQuery = (coordinates) => {
//   return useQuery({
//     queryKey: ['weather', coordinates],
//     queryFn: () => fetchWeather(coordinates),
//     enabled: !!coordinates?.latitude && !!coordinates?.longitude, // 👈 important
//   });
// };
export function useWeatherQuery(coordinates: Coordinates | null) {
  return useQuery({
    queryKey: WEATHER_KEYS.weather(coordinates ?? { lat: 41.44, lon: 200.44 }),
    queryFn: async () => {
      if (!coordinates?.lat || !coordinates?.lon) {
        throw new Error("Invalid coordinates");
      }
      return weatherAPI.getCurrentWeather(coordinates);
    },
    enabled: !!coordinates?.lat && !!coordinates?.lon,
    retry: 1, // optional: avoid infinite retries on bad requests
  });
}

export function useForecastQuery(coordinates: Coordinates | null) {
  return useQuery({
    queryKey: WEATHER_KEYS.forecast(coordinates ?? { lat: 0, lon: 0 }),
    queryFn: () => (coordinates ? weatherAPI.getForecast(coordinates) : null),
    enabled: !!coordinates,
  });
}

export function useReverseGeocodeQuery(coordinates: Coordinates | null) {
  return useQuery({
    queryKey: WEATHER_KEYS.location(coordinates ?? { lat: 0, lon: 0 }),
    queryFn: () =>
      coordinates ? weatherAPI.reverseGeocode(coordinates) : null,
    enabled: !!coordinates,
  });
}


export function useLocationSearch(query: string) {
  return useQuery({
    queryKey: WEATHER_KEYS.search(query),
    queryFn: () => weatherAPI.searchLocations(query),
    enabled: query.length >= 3,
  });
}
