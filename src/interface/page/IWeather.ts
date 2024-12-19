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
  daily: any
}

export interface DailyWeather {
  date: string; 
  temperature: {
    min: number;
    max: number;
  };
  feelsLike: number;
  pressure: number; 
  windSpeed: number;
  precipitation: number;
  weather: string;
}
