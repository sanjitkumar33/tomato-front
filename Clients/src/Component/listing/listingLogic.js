import React, { useState,useEffect } from 'react';
import './listing.css';
import ListingDisplay from './listingDisplay';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CuisineFilter from '../Filters/cuisineFilter';
import CostFilter from '../Filters/costFilter';
import Header from '../Header';

const base_url = "http://localhost:9120";


const Listing = () => {
    let params = useParams();

    const [restList,setRestList] = useState();
    let mealid = params.mealId;

    useEffect(() => {
       
        sessionStorage.setItem('mealId',mealid)
        axios.get(`${base_url}/restaurants?mealtype_id=${mealid}`)
        .then((res) => {
            setRestList(res.data)
        })

    },[])

    const setDataPerFilter = (data) => {
        setRestList(data)
    }
    return(
        <>
        <Header/>
            <div className='row' id='rowone'>
                <div id='mainListing'>
                    <div id='filter'>
                        <CuisineFilter mealId={mealid}
                        restPerCuisine={(data) => {setDataPerFilter(data)}}/>
                        <CostFilter mealId={mealid}
                        restPerCost={(data) => {setDataPerFilter(data)}}/>
                    </div>
                    <ListingDisplay listData={restList}/>
                </div>
            </div>
            
        </>
      
    )
}


export default Listing;