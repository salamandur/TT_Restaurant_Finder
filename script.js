const encodedParams = new URLSearchParams();
encodedParams.append("language", "en_US");
encodedParams.append("limit", "30");
encodedParams.append("location_id", "147389");
encodedParams.append("currency", "USD");

const options = {
	method: 'POST',
	headers: {
		'content-type': 'application/x-www-form-urlencoded',
		'X-RapidAPI-Host': 'worldwide-restaurants.p.rapidapi.com',
		'X-RapidAPI-Key': '58073180c3msha5c8b4cf3a6a292p15bdb0jsn447ddf7b84a5'
	},
	body: encodedParams
};

async function getdata(){
    try{
      let resp= await fetch('https://worldwide-restaurants.p.rapidapi.com/search', options); 
      let result = await resp.json();
      drawtable(result);
    }catch(e){
      console.log(e);
    }
  }


function drawtable(response){
  let docuresult= document.querySelector('#restaurant');

  let html = ''; 

  for(let record of response.results.data){
    console.log(record.name);
    html+= `<h2> ${record.name} </h2>
       <img src=${record.photo.images.original.url} width="300px ">
       <ul> Location: ${record.location_string} </ul>
       <ul> Cuisine: ${record.caption}</ul>
       <ul> Opening Hours: </ul>
       <ul> Contact: ${record.phone}</ul> 
       <ul> Website: ${record.website}</ul>
       <ul> Price Range: ${record.price}</ul>
       <ul> Rating: ${record.rating}</ul>`
      ;
  }
  docuresult.innerHTML = html; 
}


getdata();