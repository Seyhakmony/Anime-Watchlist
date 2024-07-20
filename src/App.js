import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Watchlist } from './components/Watchlist';
import { Watched } from './components/Watched';
import { Add } from './components/Add';
import './lib/all.min.css'
import AnimeInfo from './components/AnimeInfo';
// import { useGlobalContext } from './context/global';

function App() {
  // const global = useGlobalContext();
  // console.log(global)
  return (
   <Router>
      <Header/> 
        <Routes>

        <Route path="/" element={<Add />} />
        <Route path="/Watched" element={<Watched />} />
        <Route path="/Add" element={<Add />} />
        <Route path="/anime/:animeid" element={<AnimeInfo />} />
        
        </Routes>
   </Router>
  );
}

export default App;
