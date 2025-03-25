import { Link } from 'react-router-dom'
import useFetch from '../useFetch'
// import EventDetails from './EventDetails'
import { useContext, useState } from 'react'
import Header from '../components/header'
import { SearchContext } from '../SearchContext'

const Events = () => {


    // const [eventType, setEventType] = useState("Both")
    const [url, setUrl] = useState("https://j3md0l0t-9000.inc1.devtunnels.ms/events")

    // const [userInput, setUserInput] = useState("")

    const {userInput} = useContext(SearchContext)

    const displaySpecificEvents = (event) => {

        const {value} = event.target
        
        let newUrl
        
            if(value === "Online"){
                newUrl = "https://j3md0l0t-9000.inc1.devtunnels.ms/events/location/Online Event"
            }
            else if (value === "Offline"){
                newUrl = "https://j3md0l0t-9000.inc1.devtunnels.ms/events/location/Offline Event"
            }else{
                newUrl = "https://j3md0l0t-9000.inc1.devtunnels.ms/events"
            }
            setUrl(newUrl)
    }
  
    const {data, loading, error} = useFetch(url)

    if(loading){
        return (<p className='container py-5'>Loading...</p>)
    }
    if (error){
        return (
            <p>Error fetching events: {error.message}</p>
        )
    }
    
    const filteredEvents = data?.filter((event) => userInput.trim() === "" || event.title.toLowerCase().includes(userInput.toLowerCase())
|| event.tags.find((tag) => tag.toLowerCase().includes(userInput.toLowerCase())))


    return (
        <>
        <Header />
        <div className="container">
            <hr />
        </div>
        <main className="container">
        <div className="d-flex justify-content-between align-items-center">
        <h1>Meetup Events</h1>
        <select id="eventType" onChange={displaySpecificEvents} className='form-select' style={{ width: '200px' }}>
            <option value="" disabled selected className="greyed-out">Select Event Type</option>
            <option value="Both">Both</option>
            <option value="Online">Online</option>
            <option value="Offline">Offline</option>
        </select>
        </div>

        <div className="row row-cols-1 row-cols-md-3 g-4 mt-3 mb-4">
            {filteredEvents?.map((event) => (
            <div key={event._id}>
            <div className="col">
                    <Link to={`/events/${event.title}`} style={{ textDecoration: "none", color: "inherit"}}>
                        <div className="card h-100 position-relative">
                            <div className="position-absolute bg-light rounded text-dark px-2 py-2" style={{top: "10px", left: "10px"}}>
                                <div>{event.location}</div>
                            </div>
                            <img src={event.imageUrl} className='card-img-top' alt={event.title} />
                            <div className="card-body">
                                <p className="card-text">{event.date}.{event.startTime} IST</p>
                                <h5 className="card-title">{event.title}</h5>
                            </div>  
                        </div>
                    </Link>
            </div>
            </div>
            ))}
        </div>


        </main>
        </>
    )
}

export default Events