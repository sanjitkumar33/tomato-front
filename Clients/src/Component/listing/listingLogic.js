import React, { useState,useEffect } from 'react';
import './listing.css';
import ListingDisplay from './listingDisplay';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CuisineFilter from '../Filters/cuisineFilter';
import CostFilter from '../Filters/costFilter';
import Header from '../Header';

const base_url = "https://tomapi1.onrender.com";


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
            <div className='container-fluid'>
                    <div className='row' id='rowone'>

                        {/* Filter Section */}
                        <div className='col-lg-3 col-md-4 col-12' id='filter'>
                            
                            <div className='filterBox'>
                                <h3 className='filterHeading'>Filters</h3>

                                <CuisineFilter
                                    mealId={mealid}
                                    restPerCuisine={(data) => {
                                        setDataPerFilter(data)
                                    }}
                                />

                                <CostFilter
                                    mealId={mealid}
                                    restPerCost={(data) => {
                                        setDataPerFilter(data)
                                    }}
                                />
                            </div>
                        </div>

                        {/* Listing Section */}
                        <div className='col-lg-9 col-md-8 col-12' id='mainListing'>
                            <ListingDisplay listData={restList} />
                        </div>

                    </div>
            </div>
            
        </>
      
    )
}


export default Listing;