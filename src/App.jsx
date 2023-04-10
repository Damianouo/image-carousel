import './App.css';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import Carousel from './Carousel';
import pic from './data';

function App() {
  return (
    <div className="App">
      <Carousel>
        {pic.map((picture) => (
          <img src={picture.url} alt={picture.alt} key={uuidv4()} />
        ))}
      </Carousel>
    </div>
  );
}

export default App;
