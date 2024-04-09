const axios  = require('axios');

const body = {
    typeofissue:"Waste Disposal",
    pincode: 641045,
    image: "image",
    localtion: "0001",
    userid: "65697a510a94641acae45fc8"
}

axios.post("https://greenguard.onrender.com/issue/newissue",body).then((res)=>console.log(res)).catch((error)=>console.log(error))