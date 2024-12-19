export interface IWeather {
  city: string; 
  country: string;
  coord: {
    lon: number, lat:number
  }
  current: {
    temperature: number; 
    feelsLike: number; 
    pressure: number; 
    windSpeed: {
      speed: number,
      deg: number
    };
    precipitation: number;
    weather: string; 
  };
  daily: DailyWeather[]
}

export interface DailyWeather {
  date: string;
  day: string; 
  forecastType: string;
  temperature: {
    max: number; 
    min: number; 
  };
  weather: string; 
}
