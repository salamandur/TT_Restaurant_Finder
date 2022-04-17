async function searchlocation(searchkey){
  
const encodedParams = new URLSearchParams();
encodedParams.append("q", searchkey);
encodedParams.append("language", "en_US");

const options = {
	method: 'POST',
	headers: {
		'content-type': 'application/x-www-form-urlencoded',
		'X-RapidAPI-Host': 'worldwide-restaurants.p.rapidapi.com',
		'X-RapidAPI-Key': '7af2f43e27msh7847b6f6fed0cfap111851jsn6cb2ad420860'
	},
	body: encodedParams
};



  try{
    let response = await fetch('https://worldwide-restaurants.p.rapidapi.com/typeahead', options);
    let loc_data = await response.json(); 
   for(let array of loc_data.results.data){
     console.log(array.result_object.location_id); 
   }
    
  }catch(e){
    console.log(e); 
  }


}


searchlocation("chaguanas");




