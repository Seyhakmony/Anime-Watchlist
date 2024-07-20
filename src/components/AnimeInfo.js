import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './animeinfo.css'

function AnimeInfo() {


    const {animeid} = useParams()
   
    const[anime, pickedAnime] = React.useState({})


    const {title, synopsis, trailer, duration, aired, season, images, rank, 
        score,scored_by, popularity, status, rating, source } = anime

    const animeinfo = async (anime) => {
        const response = await fetch(`https://api.jikan.moe/v4/anime/${anime}`)
        const data = await response.json()
        pickedAnime(data.data)
        console.log(data.data)
  
    }

    useEffect(() => {
        animeinfo(animeid) 
    }, [])


  return (
    <div className='entire'>
      <h1 className='title'>{title}</h1>
      
      <div className= 'details'>
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
        title="Inline Frame Example"
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
