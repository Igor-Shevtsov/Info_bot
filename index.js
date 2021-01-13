const { default: fetch } = require('node-fetch');

// global.fetch = require('node-fetch');
// async function data() {
//   const response = await fetch("https://rapidalex-i-am-groot-v1.p.rapidapi.com/grootSpeak", {
//     "method": "GET",
//     "headers": {
//       "x-rapidapi-key": "2e593bfd8cmshcc21845d95861e9p113de0jsn81704a384ff5",
//       "x-rapidapi-host": "rapidalex-i-am-groot-v1.p.rapidapi.com"
//     }
//   })
//   // https://vindecoder.p.rapidapi.com/v1.1/decode_vin?vin=YV1CM713691507034
//   const result = await response.json();
//   console.log(result);
// }

global.fetch = require('node-fetch');
async function data() {
  const response = await fetch("https://covid-19-data.p.rapidapi.com/totals", {
    "method": "GET",
    "headers": {
      "x-rapidapi-key": "2e593bfd8cmshcc21845d95861e9p113de0jsn81704a384ff5",
      "x-rapidapi-host": "covid-19-data.p.rapidapi.com"
    }
  })
  // https://vindecoder.p.rapidapi.com/v1.1/decode_vin?vin=YV1CM713691507034
  const result = await response.json();
  
  
  return result
}

data() 
module.exports = data;
