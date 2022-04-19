let result; 
let count = 0; 

 getdata();

async function getdata(){ 

const generalParams = new URLSearchParams();
generalParams.append("language", "en_US");
generalParams.append("limit", "30");
generalParams.append("location_id", "147387");
generalParams.append("currency", "USD");

const options = {
	method: 'POST',
	headers: {
		'content-type': 'application/x-www-form-urlencoded',
		'X-RapidAPI-Host': 'worldwide-restaurants.p.rapidapi.com',
		'X-RapidAPI-Key': '7af2f43e27msh7847b6f6fed0cfap111851jsn6cb2ad420860'
	},
	body: generalParams
};
    try{
      let resp= await fetch('https://worldwide-restaurants.p.rapidapi.com/search', options); 
      result = await resp.json();
      drawtable(result);
    }catch(e){
      console.log(e);
    }
  
  }


async function getcitydata(citycode){
  
const cityParams = new URLSearchParams();
cityParams.append("language", "en_US");
cityParams.append("limit", "30");
cityParams.append("location_id", citycode);
cityParams.append("currency", "USD");

const cityoptions = {
	method: 'POST',
	headers: {
		'content-type': 'application/x-www-form-urlencoded',
		'X-RapidAPI-Host': 'worldwide-restaurants.p.rapidapi.com',
		'X-RapidAPI-Key': '7af2f43e27msh7847b6f6fed0cfap111851jsn6cb2ad420860'
	},
	body: cityParams
};


  
    try{
      let resp= await fetch('https://worldwide-restaurants.p.rapidapi.com/search', cityoptions); 
      result = await resp.json();
      drawtable(result);
   }catch(e){
      console.log(e);
    }
  
}

function drawtable(response){
  let result;
  let photourl  = "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdGF1cmFudHxlbnwwfHwwfHw%3D&w=1000&q=80";
  let docuresult= document.querySelector('#restaurant');
  
  let html = ''; 

  for(let record of response.results.data){

    if(record.photo !=undefined){
      photourl = record.photo.images.original.url; 
    }
    else{
      photourl  = "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdGF1cmFudHxlbnwwfHwwfHw%3D&w=1000&q=80";
    }
  


    html+= `<div class="row">
    <div class="col s12 m7">
      <div class="card">
        <div class="card-image">
          <img src=${photourl} width =>
          <span class="card-title">${record.name}</span>
        </div>
        <div class="card-content">
          <p><ul id="rstloc"> Location: ${record.location_string} </ul>
          <ul id="rstcuis"> Cuisine: `;
       html +=  listcuisine(record.cuisine, html);
       html += `<ul id="rstcont"> Contact: ${record.phone}</ul> 
    <ul id="rstprc"> Price Range: ${record.price}</ul>
    <ul id="rstrat"> Rating: ${record.rating}</ul>
       </p>
        </div>
        <div class="card-action">
          <a href=${record.website}>This is a link</a>
        </div>
      </div>
    </div>
  </div>` ;
  }
  docuresult.innerHTML = html; 
}

function listcuisine(cuisine, string){
  string = '';
 
  for(let list of cuisine){
    string += `${list.name}, `
  }
  return string;
}




//to get user location

    var locationoptions = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };
 

  function success(pos) {
    var crd = pos.coords;
    console.log(crd.latitude);
    console.log(crd.longitude);

    getcity(crd.latitude, crd.longitude);
  }

  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  function locate(){
    navigator.geolocation.getCurrentPosition(success, error, locationoptions);
  }


document.querySelector('#locationbutton').addEventListener('click', locate);
//end of to get user location




//to get the city name from lat and long using reverse geolocation  service
async function getcity(latitude, longitude){
  const cityoptions = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Host': 'geocodeapi.p.rapidapi.com',
		'X-RapidAPI-Key': '7af2f43e27msh7847b6f6fed0cfap111851jsn6cb2ad420860'
	}
};

try {
  let response = await fetch (`https://geocodeapi.p.rapidapi.com/GetNearestCities?latitude=${latitude}&longitude=${longitude}&range=0`, cityoptions);
  let city = await response.json();
  console.log(city[0].City); 
  getlocationID(city[0].City);  
}catch(e){
  console.log(e);
}

  
}


//to contact worldwide restaurants and get the location id of the major city

async function getlocationID(city){
  const generalParams = new URLSearchParams();
generalParams.append("q", city);
generalParams.append("language", "en_US");

const options_locationID = {
	method: 'POST',
	headers: {
		'content-type': 'application/x-www-form-urlencoded',
		'X-RapidAPI-Host': 'worldwide-restaurants.p.rapidapi.com',
		'X-RapidAPI-Key': '7af2f43e27msh7847b6f6fed0cfap111851jsn6cb2ad420860'
	},
	body: generalParams
};

try{
  let response = await fetch('https://worldwide-restaurants.p.rapidapi.com/typeahead', options_locationID); 
  let location = await response.json(); 
  console.log(location.results.data[0].result_object.location_id);
  getcitydata(location.results.data[0].result_object.location_id);
   // for(let loop of location.results.data){
    //console.log(loop.result_object.location_id) ;  
    //}
}catch(e){
  console.log(e);
}
}
//end of to contact worldwide restaurants and get the location id of the major city




// section to sort restaurants based on rating
function SortByRating(rating){
let sortee = result;
let photourl  = "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdGF1cmFudHxlbnwwfHwwfHw%3D&w=1000&q=80";
let docuresult= document.querySelector('#restaurant');
let html = ''; 

  for(let record of sortee.results.data){
    if(rating === 0){
      drawtable(result);
      return; 
    }
    if(record.rating >= rating && record.rating<=rating+0.9){
      if(record.photo !=undefined){
        photourl = record.photo.images.original.url; 
      }
      else{
        photourl  = "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdGF1cmFudHxlbnwwfHwwfHw%3D&w=1000&q=80";
      }
    
      html+= `<div class="row">
    <div class="col s12 m7">
      <div class="card">
        <div class="card-image">
          <img src=${photourl} width =>
          <span class="card-title">${record.name}</span>
        </div>
        <div class="card-content">
          <p><ul id="rstloc"> Location: ${record.location_string} </ul>
          <ul id="rstcuis"> Cuisine: `;
       html +=  listcuisine(record.cuisine, html);
       html += `<ul id="rstcont"> Contact: ${record.phone}</ul> 
    <ul id="rstprc"> Price Range: ${record.price}</ul>
    <ul id="rstrat"> Rating: ${record.rating}</ul>
       </p>
        </div>
        <div class="card-action">
          <a href=${record.website}>This is a link</a>
        </div>
      </div>
    </div>
  </div>` ; 
    }}
  docuresult.innerHTML = html; ; 
}
//end of section to sort restaurants based on rating



//getlocationID("port of spain"); 
// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyCgaktm0IYgoEp6-v4fwF615cMb_Bzzh4k",
//   authDomain: "hungryman-answers.firebaseapp.com",
//   projectId: "hungryman-answers",
//   storageBucket: "hungryman-answers.appspot.com",
//   messagingSenderId: "163606395482",
//   appId: "1:163606395482:web:514df4e967ff44c639f663"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);