import React, { useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'
import './animeinfo.css'
import { useStoreGlobalContext } from '../context/global';



function AnimeInfo() {

    const { addMovieToWatchlist, addMovieToWatched, watchlist, watched, removeMovieFromWatchlist, removeFromWatched} = useStoreGlobalContext();

    const {animeid} = useParams()
   
    const[anime, pickedAnime] = React.useState({})
    const [isWatch, setisWatch] = React.useState(false)
    const [isWatched, setisWatched] = React.useState(false)

    const {title, synopsis, trailer, duration, aired, season, images, rank, 
        score,scored_by, popularity, status, rating, source } = anime

    const animeinfo = async (anime) => {
        try {
            const response = await fetch(`https://api.jikan.moe/v4/anime/${anime}`);
            const data = await response.json();
            pickedAnime(data.data);
            // console.log(data.data);
        } catch (error) {
            console.error('Error fetching anime info:', error);
        }
    };

    useEffect(() => {
        animeinfo(animeid) 
    }, [animeid])

    useEffect(() => {
        // console.log = console.warn = console.error = console.info = function () {};
        if (anime.mal_id){
        const alreadyinWl = watchlist.some((item) => item.mal_id === anime.mal_id);
        const alreadyinW = watched.some((item) => item.mal_id === anime.mal_id);
        
        setisWatch(alreadyinWl);
        setisWatched(alreadyinW);
        }
    }, [watchlist, watched, anime.mal_id]);


    const handleAddToWatchlist = () => {
        if (watchlist.some((item) => item.mal_id === anime.mal_id)) {
            removeMovieFromWatchlist(anime.mal_id);
            setisWatch(false);
        } else if (watched.some((item) => item.mal_id === anime.mal_id) && setisWatched) {
            addMovieToWatchlist(anime);
            removeFromWatched(anime.mal_id);
            setisWatched(false);
            setisWatch(true);
        } else {
            addMovieToWatchlist(anime);
            setisWatch(true);
        }
    }

    
    const handleAddToWatched = () => {
        if (watched.some((item) => item.mal_id === anime.mal_id)) {
            removeFromWatched(anime.mal_id);
            setisWatched(false);
        } else if ((watchlist.some((item) => item.mal_id === anime.mal_id) && setisWatch)) {
            removeMovieFromWatchlist(anime.mal_id);
            addMovieToWatched(anime);
            setisWatch(false);
            setisWatched(true);
        } else {
            addMovieToWatched(anime);
            setisWatched(true);
        }
    }

    useEffect(() => {
        function handleTouchStart(event) {
            // event.preventDefault(); 
        }

        document.addEventListener('touchstart', handleTouchStart, { passive: true });

        return () => {
            document.removeEventListener('touchstart', handleTouchStart);
        };
    }, []);


  return (
    <div className='entire'>
        <div className='backline'>
            <div className='backdiv'>
        <Link to="/" className='linkB'>
        <button className='back-button'>
            <span className='arrow'>&larr;</span>
        </button>
            </Link>
            </div>
      <h1 className='title'>{title}</h1>
      </div>
      
      <div className= 'details'>


        <div className='addRB'>

            <div className='backlineB'>
                    <div className='backdivB'>
                <button className={`back-buttonB ${isWatch ? 'active' : ''}`} onClick={handleAddToWatchlist}>
                    <span className='adds'> {isWatch ? 'Remove from Watchlist' : 'Add to Watchlist'}</span>
                </button>

                    </div>
            </div>


            <div className='backlineB'>
                    <div className='backdivB' >
                <button className={`back-buttonB ${isWatched ? 'active' : ''}`}  onClick = {handleAddToWatched}>
                    <span className='adds'> {isWatched ? 'Remove from Watched' : 'Add to Watched'}</span>
                </button>
                    </div>
            </div>

        </div>


        <div className='first2'>
                <div className='imgs'>
                    <img src={images?.jpg.large_image_url} alt =""/>
                </div>

            <div className ="detail">
                
                <div className='animede'>
                    <p>
                    <b>Aired: </b>
                    <span>
                        {aired?.string}
                    </span> 
                    </p>


                    <p>
                    <b>Rating: </b>
                    <span>
                        {rating}
                    </span> 
                    </p>


                    <p>
                    <b>Rank: </b>
                    <span>
                        {rank}
                    </span> 
                    </p>


                    <p>
                    <b>Score: </b>
                    <span>
                        {score}
                    </span> 
                    </p>


                    <p>
                    <b>Scored: </b>
                    <span>
                        {scored_by}
                    </span> 
                    </p>



                    <p>
                    <b>Popularity: </b>
                    <span>
                        {popularity}
                    </span> 
                    </p>



                    <p>
                    <b>Status: </b>
                    <span>
                        {status}
                    </span> 
                    </p>


                    <p>
                    <b>Source: </b>
                    <span>
                        {source}
                    </span> 
                    </p>

                    <p>
                    <b>Seasons: </b>
                    <span>
                        {season}
                    </span> 
                    </p>

                    <p>
                    <b>Duration: </b>
                    <span>
                        {duration}
                    </span> 
                    </p>
                </div>
                
            </div>
        </div>
            <p className='desc'>
                {synopsis}
            </p>



        
      </div>

      <h1 className = "title">
        Trailer
        </h1>
    <div className='tAll'>
        <div className='trailerV'>
        {trailer?.embed_url ? 
         <iframe src= {`${trailer.embed_url}?autoplay=0`}
        title="Trailer"
        width="800"
        height="450"
        allow="accelerometer; clipboard-write; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen>
        </iframe> :
        <h3>Trailer not available</h3>}
        
        </div>
    </div>
            
    </div>

  )
}

export default AnimeInfo
