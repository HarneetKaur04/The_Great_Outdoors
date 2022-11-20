import React, { useState } from 'react'
import ParkSummaryCards from '../components/ParkSummaryCards'
import { useLocation } from "react-router-dom";
import { Link } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react';
import ToggleFavorite from '../components/ToggleFavorite'

const AllParks = ({ parksInfo }) => {

  // Stores a US state if one was selected from the map on the
  // previous page from which we navigated to this page.
  const stateSelectedFromMap = useLocation().state?.data

  // Stores the callback function required to login by redirecting to /authorize. 
  const { loginWithRedirect, user } = useAuth0();
  // console.log(stateSelectedFromMap, "stateSelectedFromMap*****")

  // If set to true, toggle filter should be displayed.
  const [openFilterSelection, setOpenFilterSelection] = useState(false);

  // Stores the US state for which all national parks need to be displayed.
  const [selectedState, setSelectedState] = useState(stateSelectedFromMap)

  // Set to 'true' if input from the search bar should be used to filter results.
  const [search, setsearch] = useState(false)

  // Stores the data after applying current filter.
  const [filteredData, setFilteredData] = useState(parksInfo);

  const toggleOpen = () => {
    setOpenFilterSelection(!openFilterSelection);
  };

  const handleSearch = async (event) => {
    setsearch(true)
    setSelectedState(false)
    let value = event.target.value;
    let result = [];
    result = parksInfo.filter((data) => {
      return data.fullName.toLowerCase().startsWith(value.toLowerCase())
    });
    setFilteredData(result);
  }

  // Store all states. Extracted from 'parksInfo' and can contains duplicates.
  let allStates = parksInfo.map(item => item.states).filter(item => item.length == 2)

  // Store all states in sorted order.
  let uniqueStates = [...new Set(allStates)].sort()
  console.log(uniqueStates, "uniqueStates")

  const handleSelectedState = (state) => {
    console.log(state, "checking state")
    setSelectedState(state)
    toggleOpen()
  }


  console.log(selectedState, "check******")
  return (
    <div>
      <div className="dropdown">
        <button className="filter_button" onClick={toggleOpen}>Filter Using States</button>
        {openFilterSelection ? (
          <ul className="menu">
            {uniqueStates.map(state =>
              <li className="menu-item" onClick={() => handleSelectedState(state)}>{state}</li>
            )}
          </ul>) : null}
      </div>
      <br />
      <div className="search">
        <input type="text" className="searchTerm" placeholder="Which park are you looking for?" onChange={(handleSearch)} />
        <button type="submit" className="searchButton">
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>

      {selectedState ? <ParkSummaryCards singleStateParksInfo={selectedState} parksInfo={parksInfo} num={1} title={`${selectedState} National Parks`} /> : search ? (<div className='container1' >
        <br />
        {filteredData.map((item, index) =>
          <div className='container' key={index} >
            <div className="card">
              <div className="image">
                <img src={item.images[0].url} onError={({ currentTarget }) => {
                  currentTarget.src = "./logo.jpg";
                }} alt={item.images[0].altText} />
                <h3>{item.fullName}</h3>
                {user ? <ToggleFavorite selectedPark={item} /> : <button onClick={() => loginWithRedirect()}><i className="fa-regular fa-heart"></i></button>}
              </div>
              <div className="content">
                {item.description}
              </div>
              <div className="content" style={{ margin: 0 }}>
                <Link to={`/allparks/${item.parkCode}`}>Explore</Link>
              </div>
            </div>
          </div>)}
      </div>
      ) : <ParkSummaryCards parksInfo={parksInfo} num={1} title={"All National Parks"} />}

    </div>
  )
}

export default AllParks;
