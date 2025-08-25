import React,{useState,useEffect} from 'react';
import './QuickSearch.css';
import QuickDisplay from './QuickDisplay';

const base_url = "http://localhost:9120";



const QuickSearch = () => {

    const [mealType,setMealType] = useState();
    useEffect(() => {
        fetch(`${base_url}/quicksearch`,{method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            setMealType(data) 
        })
        
    },[])

    


    return(
        <>
        <div id="quickSearch">
            <span className="QuickHeading">Quick search</span>
            <span className="QuickSubHeading">Find Restaurant by Meal Type</span>
            <QuickDisplay mealData={mealType}/>

            
           
        </div>
        
        </>
    )
}
export default QuickSearch;