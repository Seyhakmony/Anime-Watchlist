import React from 'react';
import { useStoreGlobalContext } from '../context/global';
import './watchlist.css';

const Watchlist = () => {
    const { watchlist, removeMovieFromWatchlist, addMovieToWatched } = useStoreGlobalContext();
  const handleRemove = (id) => {
      removeMovieFromWatchlist(id.mal_id);
  };

  // Handle adding an anime to the watched list
  const handleAddToWatched = (anime) => {
      addMovieToWatched(anime);
      removeMovieFromWatchlist(anime.mal_id);
  };

    return (
        <div className='watchlist-page'>
            {watchlist.length > 0 ? (
                <div className='anime-grid'>
                    <h1 className='watchh'>My Watchlist ({watchlist.length}) </h1>
                    {watchlist.map((anime, index) => (
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
                                        <button onClick={() => handleAddToWatched(anime)}>Watched</button>
                                        <button onClick={() => handleRemove(anime)}>Remove</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className='anime-grid'>
                    <h2 className='watchh'>No animes in your Watchlist</h2>
                </div>
            )}
        </div>
    );
};

export default Watchlist;
