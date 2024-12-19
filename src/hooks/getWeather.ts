import { IWeather } from "@/interface";

export const getWeather = async (
  city: string,
  setError: (message: string) => void,
  previousData?: IWeather
): Promise<IWeather | null> => {
  try {
    const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

    const cityResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=ru`,
      { cache: "force-cache" }
    );

    if (!cityResponse.ok) {
      throw new Error("Город не найден.");
    }

    const cityData = await cityResponse.json();
    const { lat, lon } = cityData.coord;

    const forecastResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=ru`,
      { cache: "force-cache" }
    );

    if (!forecastResponse.ok) {
      throw new Error("Ошибка при получении прогноза погоды.");
    }

    const forecastData = await forecastResponse.json();

    const result: IWeather = {
      city: cityData.name,
      country: cityData.sys.country,
      coord: cityData.coord,
      current: {
        temperature: forecastData.list[0].main.temp,
        feelsLike: forecastData.list[0].main.feels_like,
        pressure: forecastData.list[0].main.pressure,
        windSpeed: forecastData.list[0].wind,
        precipitation: forecastData.list[0].pop || 0,
        weather: forecastData.list[0].weather[0].description,
      },
      daily: [],
    };

    let currentDay: string | null = null;
    let dayCount = 0;

    forecastData.list.forEach((entry: any) => {
      const date = new Date(entry.dt * 1000);
      const day = date.toLocaleDateString("ru-RU", { weekday: "short" });
      const fullDate = date.toLocaleDateString("ru-RU", { day: "numeric", month: "short" });

      if (currentDay !== fullDate && dayCount < 8) {
        const forecastType = determineForecastType(entry.weather[0].main);

        result.daily.push({
          date: fullDate,
          day: day,
          forecastType: forecastType,
          temperature: {
            max: entry.main.temp_max,
            min: entry.main.temp_min,
          },
          weather: entry.weather[0].description,
        });
        currentDay = fullDate;
        dayCount++;
      }

      if (dayCount >= 8) {
        return;
      }
    });

    setError("");
    return result;
  } catch (error: any) {
    const errorMessage =
      error.message === "Город не найден."
        ? "Указанный город не найден. Проверьте правильность названия."
        : "Не удалось загрузить данные о погоде. Попробуйте снова позже.";
    setError(errorMessage);

    if (previousData) {
      return previousData;
    }

    return null;
  }
};

// 
const determineForecastType = (main: string): string => {
  switch (main.toLowerCase()) {
    case "rain":
      return "Дождь";
    case "light rain":
      return "Небольшой дождь";
    case "snow":
      return "Снег";
    case "clouds":
      return "Облачно";
    case "clear":
      return "Ясно";
    case "thunderstorm":
      return "Гроза";
    case "drizzle":
      return "Морось";
    default:
      return "Неизвестно";
  }
};
