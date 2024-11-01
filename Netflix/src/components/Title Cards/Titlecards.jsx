import React, { useEffect, useRef, useState } from 'react'
import './Titlecards.css'
import cards_data from '../../assets/cards/Cards_data'
import { Link } from 'react-router-dom'



const Titlecards = ({title, category}) => {

  const [apiData, setApidata] = useState([]);
  const cardsRef = useRef();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MjU1MWRkM2M1MWQ1NzRjMjBmY2MwNDBlYTg4YzcxNyIsIm5iZiI6MTczMDIzNjQzMi45NTQyMzE1LCJzdWIiOiI2NzIxNGUyZDE4ODI3YTkzMjlmMTYwMDQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.0XzElKHfky-Dj_usRZlqAhMFBNLmrHJds6k9oF4ebPQ'
    }
  };
  
  

const handleWheel = (event)=>{
  event.preventDefault();
  cardsRef.current.scrollLeft += event.deltaY ;
}

useEffect(()=>{

  fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
  .then(res => res.json())
  .then(res => setApidata(res.results))
  .catch(err => console.error(err));


  cardsRef.current.addEventListener('wheel', handleWheel);
},[])

  return (
    <div className='title-cards' >
      <h2>{title?title:"Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index)=>{
          return <Link to={`/player/${card.id}`}  className="card" key={index}>
            <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="" />
            <p>{card.original_title}</p>
          </Link>
        })}
      </div>
    </div>
  )
}

export default Titlecards