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


  const {popularAnime, isSearch, searchR, upanime, airanime} =  useGlobalContext();
  
  const tempC = () => {
    if(!isSearch && render === 'popular'){
      return popularAnime?.map((anime) => {
        return <Link to={`/anime/${anime.mal_id}`} key={anime.mal_id}>
                  <img src={anime.images.jpg.large_image_url} alt="" />
              </Link>
      })
    }else{
      return searchR?.map((anime) => {
        return <Link to={`/anime/${anime.mal_id}`} key={anime.mal_id}>
                  <img src={anime.images.jpg.large_image_url} alt="" />
              </Link>
      })
    }
  }


  const airanimef = () => {
    if(!isSearch && render === 'airing'){
      return airanime?.map((anime) => {
        return <Link to={`/anime/${anime.mal_id}`} key={anime.mal_id}>
                  <img src={anime.images.jpg.large_image_url} alt="" />
              </Link>
      })
    }else{
      return searchR?.map((anime) => {
        return <Link to={`/anime/${anime.mal_id}`} key={anime.mal_id}>
                  <img src={anime.images.jpg.large_image_url} alt="" />
              </Link>
      })
    }
  }
  

  const upcoming = () => {
    if(!isSearch && render === 'upcoming'){
      return upanime?.map((anime) => {
        return <Link to={`/anime/${anime.mal_id}`} key={anime.mal_id}>
                  <img src={anime.images.jpg.large_image_url} alt="" />
              </Link>
      })
    }else{
      return searchR?.map((anime) => {
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






const [render, setRender] = React.useState('popular')


const {searchingA, handleC, handleS, search, upcomingA, airA} = useGlobalContext()

const switchR = () => {
    switch(render){
      case 'popular':
        return <div className="popAnime">{tempC()}</div>
      case 'airing':
        return <div className = "gridsf">{airanimef()}</div>
      case 'upcoming':
        return <div className = "gridsf">{upcoming()}</div>
      default:
        return <div className="popAnime">{tempC()}</div>
    }

}

  return (
   

      <div>
        <h1>Add page</h1>
        <div className= 'add-page'>
          <div className = 'container'> 
            <div className = 'add-content'> 
                <div className = 'input-wrapper'> 
                  {/* <input type = "text" 
                  
                  placeholder = 'Search Anime'
                  
                  value = {inputq}
                  onChange= {onChange}
                  /> */}

                  <form action = "" className='searchAnime' onSubmit={handleS}>
                    <div className='inputText'>
                      <input type = "text" placeholder = 'Search Anime'
                      value = {search}
                      onChange = {handleC}
                      />
                      <button type = "submit">Search</button>
                    </div>

                      <div className='totalAnimef'>
                      {isSearch && (
                        <p className='totalFanime'>Total Results: {searchR.length}</p>
                      )}
                      </div>

                  </form>
                </div>
            </div>
          </div>
        </div>



        {!showPopular && (
        <div className="">

            <div className="popular">
          {/* <button onClick={pop}>Popular</button> */}

          <h1 className = "imgbu">
          {render === 'popular' ? 'Popular Anime' : render === 'airing' ? 'Airing Anime' : render === 'upcoming' ? 'Upcoming Anime': ''}
          </h1>
          </div>

          <div className='abuttons'>

            <div className='sbutton'>
              <button onClick = {() => {
                setRender('popular')
              }}>Popular</button>
            </div>

            <div className='abutton'>
              <button onClick = {() => {
                setRender('airing')
                airA()
              }}>Airing</button>
            </div>


            <div className='upbutton'>
              <button onClick = {() => {
                setRender('upcoming')
                upcomingA()
              }}>Upcoming</button>
            </div>




          </div>


        </div>
        
      )}




      {showPopular && (
        <div className="popular">
          <h2>Popular Anime  <button onClick={npop}>x</button> </h2>
          
          <div className="popAnime"> {tempC()}</div>
        </div>
      )}


      {switchR()}
      

      </div>

  
  )
}


