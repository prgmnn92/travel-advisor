import axios from "axios";

const URL =
  "https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary";

const options = {
  params: {
    bl_latitude: "11.847676",
    tr_latitude: "12.838442",
    bl_longitude: "109.095887",
    tr_longitude: "109.149359",
  },
  headers: {
    "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
    "X-RapidAPI-Key": "82c3b30d35msh0bc4f51f317f646p170feajsnfde1114de4d9",
  },
};

axios
  .request(options)
  .then(function(response) {
    console.log(response.data);
  })
  .catch(function(error) {
    console.error(error);
  });

export const getPlacesData = async (sw, ne) => {
    if(!sw || !ne) return
  try {
    //req
    const {
      data: { data },
    } = await axios.get(URL, {
        params: {
          bl_latitude: sw.lat(),
          tr_latitude: ne.lat(),
          bl_longitude: sw.lng(),
          tr_longitude: ne.lng(),
        },
        headers: {
          "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
          "X-RapidAPI-Key": "82c3b30d35msh0bc4f51f317f646p170feajsnfde1114de4d9",
        },
      });
    return data;
  } catch (error) {
    console.log(error);
  }
};
