import { useEffect, useState } from 'react'



function Gallery (){
    // Setting states for loading, tour info, error message, and toogle functionality
    const [tours, setTours] = useState([])
    const [showMore, setShowMore] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    //Fetching API data, and handling potential errors
    useEffect(() => {
        fetch('https://api.allorigins.win/get?url=https://course-api.com/react-tours-project')
        .then(res => res.json())
        .then(data => {
            const toursData = JSON.parse(data.contents)
            setTours(toursData)
            setIsLoading(false)
        })
        .catch(err => {
            setError(err.message)
            setIsLoading(false)
        })
    }, []); //[] Run once when component mounts

    
    //logic for removing tours button
    const handleRemoveTour = (id) => {
        setTours(tours.filter((tour) => tour.id !== id))
    }

    //logic for toogle functionality
    const handleToogleMore = (id) => {
        setShowMore(prevState => ({...prevState, [id]: !prevState[id]}))
    };

    //Conditional statements for loading, and error messages
    if (isLoading) {
        return <p>Loading...</p>;}

    if (error) {
        return <p>Error: {error}</p>}
        
    return (
        <div>
            <h2>Tours available:</h2>
            <ul>
                {tours.map((tour) => {
                    return (
                        <li key={tour.id}>
                            <h3>{tour.name}</h3>
                            <p>${tour.price}</p>
                            <img src={tour.image} alt={tour.name} style={{width: '200px'}} />
                            <p>{showMore[tour.id] ? tour.info : `${tour.info.substring(0, 200)}...`}</p>
                            <button onClick={() => handleRemoveTour(tour.id)}>Not interested</button>
                            <button onClick={() => handleToogleMore(tour.id)}>{showMore[tour.id] ? 'Show less' : 'Show more'}</button>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}





export default Gallery 