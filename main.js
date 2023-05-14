import './style.css'

const body = document.querySelector('body');
const container = document.getElementById('continer');
const search=document.getElementById('search');
const fullUrl=`http://localhost:3000/countries`;
const searchByName=`http://localhost:3000/countries?name.common=`;
let cards=document.querySelector('.card');

const renderItem = (data) => {
  // let currency = Object.entries(abbr)[0][1].name;

  const abbr = data.currencies;
  const currency =Object.entries(abbr)[0][1].name;
  
  const lang =data.languages;
  const dataLang = Object.entries(lang)[0][1];
  // console.log(dataLang)
  

  // console.log(currency)

const addData= `
<div class="card bg-[#2C3A45] rounded-md grid grid-rows-2 shadow-md shadow-gray-800 ">
  <div class="imgDiv h-[50px] overflow-hidden">
    <img class="flag object-scale-down w-full h-[12rem] rounded-r-md rounded-l-md " src="${data.flags.png}" alt="">
  </div>
  <div class="img-container space-y-5 p-3">
    <div class="header ">
      <h3 class="country-name text-2xl font-bold">${data.name.common}</h3>
    </div>
    <div class="country-data space-y-3">
      <div class="data-item row text flex gap-2">🗣️<p class="text" id="language">${dataLang}</p>
      </div>
      <div class="data-item row text flex gap-2">🪙<p class="text" id="currency">${currency}</p>
      </div>
      <div class="data-item row text flex gap-2">🧑🏻‍🤝‍🧑🏻<p class="text" id="population">${(+data.population / 1000000).toFixed(1)} M</p>
      </div>
    </div>
  </div>
</div>
`;
  // console.log("🍃");
  container.insertAdjacentHTML('beforeend', addData);

}


const getCountries = async function (url=fullUrl) {
  try {
    
    if(url===searchByName){
      url=fullUrl;
    }
    const response = await (await fetch(url)).json();
    // console.log(response)
    const data = await response;
    // console.log(data)
   
    data.map(item => {
      const abbr = item.currencies;
      Object.entries(abbr)
      renderItem(item)

    })

      cards.addEventListener('click', () => {
    console.log("card clicked");
  })

  } catch (err) { }
};
getCountries(fullUrl);


// const showCountry=(data)=>{

//   const abbr = data.currencies;
//   const currency =Object.entries(abbr)[0][1].name;
  
//   const lang =data.languages;
//   const dataLang = Object.entries(lang)[0][1];

//   const showCountryData=`
//   <section class="modal h-[100%] w-[100%] text-white bg-[#1F2D36] 
//   flex flex-col justify-center content-center backdrop-blur-md">
//   <ion-icon class="btn-close-modal text-5xl m-4" name="close-circle"></ion-icon>
// <div class="modal-body w-[40rem] shadow-lg rounded-2xl bg-[#2C3A45] p-4">
//   <div class="country-data flex justify-center items-center">
//     <div class="container-flag pr-8">
//       <img class="rounded-md" src="src/img/ir-karaj.gif" alt="">
//     </div>
//     <div class="item-data">
//       <div class="flex py-4">Population:<p>🧑🏻‍🤝‍🧑🏻 ${(+data.population / 1000000).toFixed(1)}</p></div>
//       <div class="flex py-4">Region:<p>🗺 ${data.name.common} </p></div>
//       <div class="flex py-4">Capital:<p>📌 </p></div>
//       <div class="flex py-4">Language:<p>🗣️ ${dataLang}</p></div>
//       <div class="flex py-4">Currency:<p>🪙 ${currency}</p></div>
//     </div>
//   </div>

// </div>
// </section>
//   `; 
//   body.insertAdjacentHTML('beforeend', showCountryData);
// }

search.addEventListener('input',(e)=>{
  // GET /posts?q=internet
  // console.log("🗺️")
  getCountries(`${searchByName}${search.value}`);
  // console.log(`${searchByName}${search.value}`);
  container.innerHTML='';

});



