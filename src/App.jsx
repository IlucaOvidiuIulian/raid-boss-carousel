import Carousel from "./components/Carousel";
import { bosses } from "./data/bosses";

export default function App() {
  return (
    <div className="app">
      <Carousel bosses={bosses} />
    </div>
  );
}
