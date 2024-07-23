import React from "react";
import { Link } from "react-router-dom";
import './header.css';
import animep from './anime.jpg'

export const Header = () => {
  return (
    <header>
      <div className="container">
        <div className="inner-content">
          <div className="brand">
            {/* <Link to="/">WatchList</Link> */}
            <Link to="/">
              <img src= {animep} alt="WatchList" className="brand-img" />
              </Link>
          </div>

          <ul className="nav-links">
            <li>
              <Link to="/watchlist">Watchlist</Link>
            </li>

            <li>
              <Link to="/watched">Watchedlist</Link>
            </li>


            <li>
              <div ontouchstart="">
                <div class="buttonAdd">
                <Link to="/">
                    + Add
                  </Link>
                </div>
              </div>
            </li>


          </ul>
        </div>
      </div>
    </header>
  );
};