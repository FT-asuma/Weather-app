import { IWeather } from "@/interface";

export const getWeather = async (
  city: string,
  setError: (message: string) => void,
  previousData?: IWeather
): Promise<IWeather | null> => {
  try {
    const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

    const cityResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=6f65ac8c443c1aa7d4ecd0f4a642b89f&units=metric&lang=ru`,
      { cache: "force-cache" }
    );

    if (!cityResponse.ok) {
      throw new Error("Город не найден.");
    }

    const cityData = await cityResponse.json();
    const { lat, lon } = cityData.coord;

    const forecastResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=6f65ac8c443c1aa7d4ecd0f4a642b89f&units=metric`,
      { cache: "force-cache" }
    );

    if (!forecastResponse.ok) {
      throw new Error("Ошибка при получении прогноза погоды.");
    }

    const forecastData = await forecastResponse.json();
    console.log(forecastData)
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
    };

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
