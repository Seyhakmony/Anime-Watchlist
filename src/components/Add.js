import React from 'react'
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../context/global';
import './add.css'


export const Add = () => {

  console.log = console.warn = console.error = console.info = function () {};   


  const {popularAnime, isSearch, searchR, upanime, airanime} =  useGlobalContext();
  
  const tempC = () => {
    if(!isSearch && render === 'popular'){
      return popularAnime?.map((anime) => {
        return <div className='animec'><Link to={`/anime/${anime.mal_id}`} key={anime.mal_id}>
                  <img src={anime.images.jpg.large_image_url} alt="" />
                  <figcaption className='fig'>{anime.title}</figcaption>
              </Link>
              </div>
      })
    }else{
      return searchR?.map((anime) => {
        return <div className='animec'><Link to={`/anime/${anime.mal_id}`} key={anime.mal_id}>
                  <img src={anime.images.jpg.large_image_url} alt="" />
                  <figcaption className='fig'>{anime.title}</figcaption>
              </Link>
              </div>
      })
    }
  }


  const airanimef = () => {
    if(!isSearch && render === 'airing'){
      return airanime?.map((anime) => {
        return <div className='animec'><Link to={`/anime/${anime.mal_id}`} key={anime.mal_id}>
                  <img src={anime.images.jpg.large_image_url} alt="" />
                    <figcaption className='fig'>{anime.title}</figcaption>
              </Link>
              </div>
      })
    }else{
      return searchR?.map((anime) => {
        return <div className='animec'><Link to={`/anime/${anime.mal_id}`} key={anime.mal_id}>
                  <img src={anime.images.jpg.large_image_url} alt="" />
                  <figcaption className='fig'>{anime.title}</figcaption>
              </Link>
              </div>
      })
    }
  }
  

  const upcoming = () => {
    if(!isSearch && render === 'upcoming'){
      return upanime?.map((anime) => {
        return <div className='animec'><Link to={`/anime/${anime.mal_id}`} key={anime.mal_id}>
                  <img src={anime.images.jpg.large_image_url} alt="" />
                  <figcaption className='fig'>{anime.title}</figcaption>
              </Link>
              </div>
      })
    }else{
      return searchR?.map((anime) => {
        return <div className='animec'><Link to={`/anime/${anime.mal_id}`} key={anime.mal_id}>
                  <img src={anime.images.jpg.large_image_url} alt="" />
                  <figcaption className='fig'>{anime.title}</figcaption>
              </Link>
              </div>
      })
    }
  }
  




const [render, setRender] = React.useState('popular')


const {handleC, handleS, search, upcomingA, airA} = useGlobalContext()

const switchR = () => {
    switch(render){
      case 'popular':
        return <div className='borderA'><div className="popAnime">{tempC()}</div></div>
      case 'airing':
        return <div className='borderA'><div className = "gridsf">{airanimef()}</div></div>
      case 'upcoming':
        return <div className='borderA'><div className = "gridsf">{upcoming()}</div></div>
      default:
        return <div className='borderA'><div className="popAnime">{tempC()}</div></div>
    }

}

  return (
   

      <div className='entireAddp'>
        <div className= 'add-page'>
          <div className = 'container'> 
            <div className = 'add-content'> 
                <div className = 'input-wrapper'> 

                  <form action = "" className='searchAnime' onSubmit={handleS}>
                    <div className='inputTexts'>
                      <input type = "text" placeholder = 'Search Anime'
                      value = {search}
                      onChange = {handleC}
                      />
                      <button className ='submit 'type = "submit">Search</button>
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




        <div className="allTa">

            <div className="popular">
          {/* <button onClick={pop}>Popular</button> */}

          <h1 className = "imgbu">
          {render === 'popular' ? 'Popular Anime' : render === 'airing' ? 'Airing Anime' : render === 'upcoming' ? 'Upcoming Anime': ''}
          </h1>
          </div>

          <div className='abuttons'>

            <div className='abutton'>
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


            <div className='abutton'>
              <button onClick = {() => {
                setRender('upcoming')
                upcomingA()
              }}>Upcoming</button>
            </div>




          </div>


        </div>
        



      {switchR()}
      

      </div>

  
  )
}


