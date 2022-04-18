const encodedParams = new URLSearchParams();
encodedParams.append("language", "en_US");
encodedParams.append("limit", "30");
encodedParams.append("location_id", "147389");
encodedParams.append("currency", "TTD");

const options = {
	method: 'POST',
	headers: {
		'content-type': 'application/x-www-form-urlencoded',
		'X-RapidAPI-Host': 'worldwide-restaurants.p.rapidapi.com',
		'X-RapidAPI-Key': 'db1b736a74msh8c11453393ade34p1c3a2djsn7da3f1c56ac6'
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
       <ul> Cuisine: `;
    html += listcuisine(record.cuisine, html); 
    html +=`
       </ul>
       <ul> Opening Hours: `;
    //html += listhours(record.hours, html);
    html +=`
      </ul>
       <ul> Contact: ${record.phone}</ul> 
       <ul> Website: ${record.website}</ul>
       <ul> Price Range: ${record.price}</ul>
       <ul> Rating: ${record.rating}</ul>`; 
  }
  docuresult.innerHTML = html; 
}


function listcuisine(cuisine, string){
  string = '';
 
  for(let list of cuisine){
    console.log(list.name)
    string += `${list.name}, `
  }
  return string;
}

function listhours(hours, str) {
  str ='';
  let open = 0; 
  let close = ''; 

  for (let list of hours.week_ranges){
    console.log(list[0].open_time);
    console.log(list[0].close_time);
    open = list[0].open_time;
    close = list[0].close_time; 
    str += `Open: ${open} Close: ${close};
 `;
  }
  return str; 
  
}

function getlocation(){
    
}


async function getlocationID(city){
  const encodedParams = new URLSearchParams();
encodedParams.append("q", city);
encodedParams.append("language", "en_US");

const options_locationID = {
	method: 'POST',
	headers: {
		'content-type': 'application/x-www-form-urlencoded',
		'X-RapidAPI-Host': 'worldwide-restaurants.p.rapidapi.com',
		'X-RapidAPI-Key': '7af2f43e27msh7847b6f6fed0cfap111851jsn6cb2ad420860'
	},
	body: encodedParams
};

try{
  let response = await fetch('https://worldwide-restaurants.p.rapidapi.com/typeahead', options_locationID); 
  let location = await response.json(); 
    console.log(location.results.data[0].result_object.location_id);
    //for(let loop of location.results.data){
    //console.log(loop.result_object.location_id) ;  
   // }
  
}catch(e){
  console.log(e);
}
}





function locationselector(){
  let result = document.getElementById('location').value;

 
  if(result === "myLocation"){
    console.log("the location one was selected");
    
  }

  if(result ==="searchlocation"){
    document.getElementById("locationsearch").innerHTML = `<input type= "text" id= "searchinput"/>`; 
   
  }
  console.log(result); 
  
}
 
locationselector(); 
//getdata();