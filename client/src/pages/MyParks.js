import React, {useState, useEffect} from 'react'
import { useAuth0 } from '@auth0/auth0-react';
import ParkSummaryCards from '../components/ParkSummaryCards';
import ToggleFavorite from '../components/ToggleFavorite';

const MyParks = ({parksInfo}) => {
    const { user } = useAuth0();
    const [favParks, setFavParks] = useState([])

    const handleDisplay = async() => {
        console.log(user.sub, "check if user present??")
        if (user == undefined) {
            return (
                <p><span>
                    <a href="">Log in to see your favorite!</a>
                </span></p>);
        } else {
        let userSub = user.sub
        await fetch(`http://localhost:5000/favorites/${userSub}`)
        .then(response => response.json() )
        .then(display => {
            setFavParks(display);
            console.log(favParks, "favParks");
        }
            )      
        
    }
}
let allParks = favParks.map(item => item.park_code)
console.log(allParks, "allParks")
let moreDataOfSamePark = parksInfo.filter(elem => allParks.includes(elem.parkCode))
console.log(moreDataOfSamePark, "moreDataOfSamePark")

useEffect(()=> {
    handleDisplay()
  },[])


  return (
    <div>
        {favParks? <ParkSummaryCards parksInfo={moreDataOfSamePark} num ={1}/> : (<p><span>
                    <a href="">Log in to see your favorite!</a>
                </span></p>)}
        {/* {favParks ? (moreDataOfSamePark.map(item=> (
            <>
        <p>{item.park_code}</p>
        <ToggleFavorite selectedPark={item}/>
        </>
        ))): (<p><span>
                    <a href="">Log in to see your favorite!</a>
                </span></p>)} */}

    </div>
  )
}

export default MyParks