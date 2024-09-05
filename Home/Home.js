const url = "http://localhost:9120";

const getCity = async () => {
    let response = await fetch(`${url}/location`,{method:'GET'})
    let data = await response.json()
    
        data.map((item) =>{
            let element = document.createElement('option') //<option>
            let text = document.createTextNode(item.state) //delhi
            element.appendChild(text) //<option>delhi</option>
            element.value = item.state_id //<option>Delhi</option>
            document.getElementById('city').appendChild(element)
            //<select><option>Delhi</option><select>
        })

}

const getRest = async() =>{
    let cityId = document.getElementById('city').value;
    let rest = document.getElementById('restSelect')
    while (rest.length > 0){
        rest.remove(0)
    }
    let response = await fetch(`${url}/restaurants?stateId=${cityId}`,{method:'GET'})
    let data = await response.json()
    data.map((item) =>{
        let element = document.createElement('option') //<option>
        let text = document.createTextNode(`${item.restaurant_name} | ${item.address}`) //delhi
        element.appendChild(text) //<option>delhi</option>
       
        rest.appendChild(element)
        //<select><option>Delhi</option><select>
    })
    // console.log("><><",cityId)
}

// async function getCity () {
//     let response = await fetch(`${url}/location`,{method:'GET'})
//     let data = await response.json()
//     .then((data) =>{
//         data.map((item) =>{
//             let element = document.createElement('option') //<option>
//             let text = document.createTextNode(item.state) //delhi
//             element.appendChild(text) //<option>delhi</option>
//             element.value = item.state_id //<option>Delhi</option>
//             document.getElementById('city').appendChild(element)
//             //<select><option>Delhi</option><select>
//         })
//     })

// } 

// const getCity = async () => {
//     let response = await fetch(`${url}/location`,{method:'GET'})
//     let data = await response.json()
//     .then((data) =>{
//         data.map((item) =>{
//             let element = document.createElement('option') //<option>
//             let text = document.createTextNode(item.state) //delhi
//             element.appendChild(text) //<option>delhi</option>
//             element.value = item.state_id //<option>Delhi</option>
//             document.getElementById('city').appendChild(element)
//             //<select><option>Delhi</option><select>
//         })
//     })
// }

// const getCity = () => {
//     fetch(`${url}/location`,{method:'GET'})
//     .then((res) => res.json())
//     .then((data) =>{
//         data.map((item) =>{
//             let element = document.createElement('option') //<option>
//             let text = document.createTextNode(item.state) //delhi
//             element.appendChild(text) //<option>delhi</option>
//             element.value = item.state_id //<option>Delhi</option>
//             document.getElementById('city').appendChild(element)
//             //<select><option>Delhi</option><select>
//         })
//     })
// }