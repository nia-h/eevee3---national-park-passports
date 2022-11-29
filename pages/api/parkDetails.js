//import { NextApiRequest, NextApiResponse } from 'next'
//(req: NextApiRequest, res: NextApiResponse)
// export default async function handler(req, res) {

//   // first grab the parkCode
//   const { parkCode } = req.body;
//   // fetch that specific park info from API
//   // send entire park object back
//   const parkInfo = await fetch(`https://developer.nps.gov/api/v1/parks?parkCode=${parkCode}&api_key=zLbSDcf7rYq9FzTqTDWlFOeER9ygN3vl5UtPFYuH`);

//   res.status(200).json({ parkInfo })
// }

// if (!res.ok) {
//   // This will activate the closest `error.js` Error Boundary
//   throw new Error('Failed to fetch data');
// }
