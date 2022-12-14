import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react';
import Loading from "./Auth0/loading";
import ToggleFavorite from './ToggleFavorite';

// Input: props => activitiesInfo stores all activitiesInfo fetched fron National Parks API
const SingleActivity = ({ activitiesInfo }) => {

  // Stores the callback function required to login by redirecting to /authorize. 
  const { loginWithRedirect, user } = useAuth0();

  // Stores the acitivity category like biking, hiking, etc.
  let { activityType } = useParams();

  let parksFilteredByActivity = activitiesInfo.filter(item => item.name === activityType)

  //console.log(parksFilteredByActivity)
  // Stores a list of all parks marked as favorite by the currently logged in user.
  const [favParks, setFavParks] = useState(undefined)

  const checkFav = (parkCode) => {
    let found = favParks.filter(item => item.park_code === parkCode)
    return found.length > 0
  }

  const loadFavorites = async () => {
    if (user !== undefined) {
      let userSub = user.sub
      await fetch(`/api/favorites/${userSub}`)
        .then(response => response.json())
        .then(display => {
          setFavParks(display);
          console.log(favParks, "favParks");
        })
    } else {
      setFavParks([]);
    }
  }

  useEffect(() => {
    loadFavorites()
  }, [])

  return (
    <>
    {favParks !== undefined ? (parksFilteredByActivity.length >= 1 ? (
        <>
          <h2 className='heading'><hr />Enjoy <span className='activity_heading'>{activityType}</span> in these National Parks <hr /> </h2>
          <div className='container1' >

            {parksFilteredByActivity[0].parks.map((item, index) =>
              <div className='container' key={index} >
                <div className="card2">
                  <h3>{item.fullName}</h3>
                  <p>State: <div className="states_name">{item.states}</div></p><br />
                  <Link to={`/allparks/${item.parkCode}`}>Explore</Link><br />
                  {user ? (<><br /><ToggleFavorite selectedPark={item} isFavorite={checkFav(item.parkCode)} /></>) : <button data-testId="buttonFav"><i className="fa-regular fa-heart" onClick={() => loginWithRedirect()}></i></button>}
                </div>
              </div>
            )}
          </div>
        </>
      ) : <Loading />): null}
      
    </>
  )
}


export default SingleActivity;