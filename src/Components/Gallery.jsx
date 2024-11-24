import { useEffect, useState } from 'react'



function Gallery (){
    const [tours, setTours] = useState([])
    const [showMore, setShowMore] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetch('https://api.allorigins.win/get?url=https://course-api.com/react-tours-project')
        .then(res => res.json())
        .then(data => {
            setTours(data.contents)
            setIsLoading(false)
        })
        .catch(err => {
            setError(err.message)
            setIsLoading(false)
        })
    }, []);

    const handleRemoveTour = (id) => {
        setTours(tours.filter((tour) => tour.id !== id))
    }

    const handleToogleMore = (id) => {
        setShowMore(prevState => ({...prevState, [id]: !prevState[id]}))
    };

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
                            <p>{tour.price}</p>
                            <p>{tour.image}</p>
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