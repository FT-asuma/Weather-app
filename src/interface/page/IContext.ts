export interface IContext {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
  city: string;
  setCity: React.Dispatch<React.SetStateAction<string>>;
  getWeatherFn: Function
}
