import { useEffect, useState } from 'react'
import './App.css'

let truck = 1
function App() {
  const [aboutMessage, setAboutMessage] = useState('');
  const [latitude, setLatitude] = useState(52.25)
  const [longitude, setLogitude] = useState(13.37)
  const [fleet, setFleet] =useState([])

  useEffect(() => {
    // recordCordinate()
    fetch('/about') // Relative path to your API route
      .then(response => response.json())
      .then(data => {
        setAboutMessage(data.about)
        console.log(data.about)
      })
      .catch(error => console.error('Error fetching about page:', error));
  }, []);

  

  const recordCordinate = () => {
    truck +=1
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const latitude = position.coords.latitude+5;
            const longitude = position.coords.longitude+10;
            console.log(latitude)
            fetch('/track', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 'latitude': latitude, 'longitude': longitude, 'truck':'truck'+truck })
            })
                .then(response => response.json())
                .then(data => {
                    setFleet(data.points)
                    console.log(data.points)
                })
                .catch(error => console.error('Error fetching about page:', error));
        });
    } else {
        console.error('Geolocation is not supported by this browser.');
    }
}

 
return (
  <div>
    <h1>Clifa</h1>
    <p className="read-the-docs">{aboutMessage}</p>
    <button className="btn btn">
      Shopping List
    </button>
    <button className="btn btn" onClick={recordCordinate}>
      Taxi
    </button>
    <ul className="read-the-docs">
      {fleet.map(flt => (
        <li key={flt.id}>
          {flt.id} - {flt.point.lat}, {flt.point.lon}
        </li>
      ))}
    </ul>
  </div>
);

}

export default App
