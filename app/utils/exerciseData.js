export const exerciseOptions = {
    method: "GET",
    headers: {
      'x-rapidapi-key': process.env.NEXT_PUBLIC_RAPID_API_KEY,
		  'x-rapidapi-host': 'exercisedb.p.rapidapi.com'


    },
};



export const fetchData = async(url, options) => {
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    // console.log(data)
    return data
	  // return data
  } catch (error) {
    console.error(error);
  }
}

