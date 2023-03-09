import { useState, useEffect } from 'react';
import './App.css';

export interface herbListView {
   name: string;
   sciName: string;
   image: string;
}

function App() {
   const [herbsData, setHerbs] = useState<herbListView[] | undefined>(undefined);

   useEffect(() => {
      async function getHerbs() {
         const response = await fetch('http://localhost:6060/herbs'); // API not yet published online
         const myJson: herbListView[] = await response.json(); //extract JSON from the http response
         setHerbs(myJson);
      }
      getHerbs();
   }, []);

   const herbCards = herbsData
      ? herbsData.map((herb) => (
           <li>
              {herb.name} | {herb.sciName}
              {herb.image && <img src={herb.image} />}
           </li>
        ))
      : 'no cards to display';

   return (
      <div className="App">
         <h1>Herbs</h1>
         <div className="card">
            <ul>{herbCards}</ul>
         </div>
      </div>
   );
}

export default App;
