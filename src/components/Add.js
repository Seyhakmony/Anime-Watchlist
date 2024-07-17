import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../context/global';
import './add.css'
export const Add = () => {
  const [inputq, setQu] = useState("");
  const [showPopular, showPop] = useState(false);

  const onChange = e => {
    e.preventDefault();
      setQu(e.target.value)
  }

  const {popularAnime, isSearch} =  useGlobalContext();
  const tempC = () => {
    if(!isSearch){
      return popularAnime.map((anime) => {
        return <Link to={`/anime/${anime.mal_id}`} key={anime.mal_id}>
                  <img src={anime.images.jpg.large_image_url} alt="" />
              </Link>
      })
    }
  }

  const pop = () => {
    showPop(true);
  }

  const npop = () => {
    showPop(false);
  }

  return (
   

      <div>
        <h1>Add page</h1>
        <div className= 'add-page'>
          <div className = 'container'> 
            <div className = 'add-content'> 
                <div className = 'input-wrapper'> 
                  <input type = "text" 
                  
                  placeholder = 'Search Anime'
                  
                  value = {inputq}
                  onChange= {onChange}
                  />
                </div>
            </div>
          </div>
        </div>



        {!showPopular && (
        <div className="popular">
          <button onClick={pop}>Popular</button>
        </div>
      )}

      {showPopular && (
        <div className="popular">
          <h2>Popular Anime  <button onClick={npop}>x</button> </h2>
          
          <div className="popAnime"> {tempC()}</div>
        </div>
      )}

      </div>

  
  )
}


