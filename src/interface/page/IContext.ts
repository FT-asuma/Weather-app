import { IWeather } from "./IWeather";

export interface IContext {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
  city: string;
  setCity: React.Dispatch<React.SetStateAction<string>>;
  respond: IWeather
  isLoading: boolean,
  setError: React.Dispatch<React.SetStateAction<string>>
  error: string
}
