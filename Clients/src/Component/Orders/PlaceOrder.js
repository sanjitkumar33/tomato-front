import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Header from '../Header';


const url = "https://tomapi1.onrender.com/placeOrder";


const PlaceOrder = () => {

    let params = useParams();
    let navigate = useNavigate()

    let sessionData = sessionStorage.getItem('userInfo')
    let data = JSON.parse(sessionData)

    const initialValues = {
        id: Math.floor(Math.random()*100000),
        rest_name: params.restName,
        name: data.name,
        email: data.email,
        cost: Math.floor(Math.random()*1000),
        phone: data.phone,
        address: "Duplex no B27",
    
    };

    const [values,setValues] = useState(initialValues);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({
          ...values,
          [name]: value,
        });
      };

      const checkOut = () => {
        console.log(values)
        fetch(url,{
            method: 'POST',
            headers: {
                'accept':'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(values)
        })
        .then ( navigate(`/vieworder`))
      }

    
    return(
        <>
        <Header/>
        <div className='container'>
            <hr/>
            <div className='panel panel-primary'>
                <div className='panel-heading'>
                    <h1>Orders For {params.restName}</h1>
                </div>
                <div className='panel-body'>
                    {/**<input type='hidden' name='cost' value={values.cost}/>
                    <input type='hidden' name='id' value={values.id}/>
                    <input type='hidden' name='rest_name' value={values.rest_name}/>**/}
                    <div className='row'>
                        <div className='col-md-6 form-group'>
                            <label for="fname" className='control-label'>Name</label>
                            <input className='form-control' id='fname' name='name' 
                            value={values.name}  onChange={handleInputChange}></input>
                        </div>
                        <div className='col-md-6 form-group'>
                            <label for="email" className='control-label'>Email</label>
                            <input className='form-control' id='email' name='email' 
                            value={values.email}  onChange={handleInputChange}></input>
                        </div>
                        <div className='col-md-6 form-group'>
                            <label for="phone" className='control-label'>Phone</label>
                            <input className='form-control' id='phone' name='phone' 
                            value={values.phone}  onChange={handleInputChange}></input>
                        </div>
                        <div className='col-md-6 form-group'>
                            <label for="address" className='control-label'>Address</label>
                            <input className='form-control' id='address' name='address' 
                            value={values.address}  onChange={handleInputChange}></input>
                        </div>
                        
                    </div>
                    <div className='row'>
                        <div className='col-md-12'>
                            <h2>Total Price Rs.{values.cost}</h2>
                        
                        </div>
                    </div>
                    <button className='btn btn-success' onClick={checkOut}>
                        Submit
                    </button>
                
                </div>
            </div>
        </div>
    
    </>
    )
}

export default PlaceOrder;