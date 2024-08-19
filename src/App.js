import logo from './logo.svg';
import './App.css';
import ImageUpload from './components/ImageUpload';
import ImageState from "./context/ImageState";

function App() {
  return (
    <div className="App">
      <ImageState>
     <ImageUpload/>
     </ImageState>
    </div>
  );
}

export default App;
