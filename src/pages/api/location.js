export default async function handler(req, res){
  let countryLanguages = {lang: null};
  if(process.env.SECRET_LOCATION_API_KEY) {
    const locationRequest = await fetch(`http://api.ipapi.com/check?access_key=${process.env.SECRET_LOCATION_API_KEY}`);
    const locationData = await locationRequest.json();
    countryLanguages = { lang: locationData.location?.languages[0]?.code };
  }
  res.status(200).json(countryLanguages);
}