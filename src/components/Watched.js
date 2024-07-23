import React from 'react';
import { useStoreGlobalContext } from '../context/global';
import './watchlist.css';

const Watched = () => {
  const { watched, removeFromWatched, addMovieToWatchlist } = useStoreGlobalContext();
  const handleRemove = (id) => {
    removeFromWatched(id.mal_id);
  };

  const handleAddToWatchL = (anime) => {
      addMovieToWatchlist(anime);
      removeFromWatched(anime.mal_id); 
  };
    return (
        <div className='watched-page'>
            {watched.length > 0 ? (
                <div className='anime-grid'>
                <h1 className='watchh'>My Watched List ({watched.length})</h1>
                    {watched.map((anime , index) => (


                        <div className='anime-card' key={anime.mal_id}>
                        
                        <div className='anime'>

                            <div className='animeI'>{index + 1}</div>


                            <div className='anime-image-cell'>
                                <img src={anime.images.jpg.large_image_url} alt={anime.title} className='anime-image' />
                            </div>
                            <div className='anime-details-cell'>
                                <div className='anime-details'>
                                    <h3>{anime.title}</h3>

                                </div>
                            </div>
                            <div className='anime-actions-cell'>
                                <div className='anime-actions'>
                                    <button onClick={() => handleAddToWatchL(anime)}>Move to Watchlist</button>
                                    <button onClick={() => handleRemove(anime)}>Remove</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                </div>
            ) : (
                <div className='anime-grid'>
                    <h2 className='watchh'>No animes in your Watchedlist</h2>
                </div>
            )}
        </div>
    );
};

export default Watched;
