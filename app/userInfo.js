import { useEffect, useState } from "react";



export default function Page({ data }) {
    // console.log(data);
    // const [visitedParks, setVPs] = useState();
    // const userEmail = data.user.email;
    // useEffect(() => {
    //     fetch('http://localhost:3000/api/hello')
    //         .then(data => data.json())
    //         .then(data => {
    //         setVPs(JSON.parse(data.name));
    //     })
    // })

    return (
        <pre>{JSON.stringify(data, null, 2)}</pre>
    )
}