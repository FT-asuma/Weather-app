import { DailyWeather } from "@/interface";

export const getRangeWeather = async (
  city: string,
  days: number,
  setError: (message: string) => void
): Promise<DailyWeather[]> => {
  try {
    const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

    // Fetch city coordinates (latitude and longitude)
    const cityResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    if (!cityResponse.ok) {
      throw new Error("Город не найден.");
    }

    const cityData = await cityResponse.json();
    const { lat, lon } = cityData.coord;

    // Use the correct endpoint (onecall) for a multi-day forecast
    const forecastResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&appid=${apiKey}&units=metric&lang=ru`
    );

    if (!forecastResponse.ok) {
      throw new Error("Ошибка при получении прогноза погоды.");
    }

    const forecastData = await forecastResponse.json();

    // Check the response and log it
    console.log(forecastData);  // Make sure this logs data

    const daily = forecastData.daily.slice(0, days).map((entry: any) => ({
      date: new Date(entry.dt * 1000).toLocaleDateString("ru-RU", {
        weekday: "short",
        day: "numeric",
        month: "long",
      }),
      temperature: {
        min: entry.temp.min,
        max: entry.temp.max,
      },
      feelsLike: entry.feels_like.day,
      pressure: entry.pressure,
      windSpeed: entry.wind_speed,
      precipitation: entry.pop || 0,
      weather: entry.weather[0].description,
      icon: determineWeatherIcon(entry.weather[0].main),
    }));

    setError("");
    return daily;
  } catch (error: any) {
    setError(error.message || "Не удалось загрузить данные о погоде. Попробуйте снова позже.");
    return [];
  }
};

const determineWeatherIcon = (weatherMain: string) => {
  switch (weatherMain.toLowerCase()) {
    case "rain":
      return "rain";
    case "drizzle":
      return "smallrain";
    case "clear":
      return "sun";
    case "clouds":
      return "cloud";
    case "snow":
      return "snow";
    default:
      return "mixed";
  }
};
