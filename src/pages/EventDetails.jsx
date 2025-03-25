import useFetch from "../useFetch"
import Header from "../components/header"
import { useParams } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons';
import { SearchContext } from "../SearchContext";
import { useContext } from "react";

const EventDetails = () => {

    const {userInput} = useContext(SearchContext)

    const { eventTitle } = useParams();

    // console.log(eventTitle)
    // const encodedEventTitle = encodeURIComponent(eventTitle); // Encode the title
    const {data, loading, error} = useFetch(`https://j3md0l0t-9000.inc1.devtunnels.ms/events/${eventTitle}`)
    // console.log(`Fetching data from https://j3md0l0t-9000.inc1.devtunnels.ms/events/${eventTitle}`)
    // console.log(data)

    const EventInfo = () => 
        
           {
            if(loading){
                return <p className="container">Loading...</p>
            }
            if (error){
                return <p className="container">An error occured</p>
            }
            
        const displayTags = () => {

            if(data?.tags.length > 0){
                  return (
                    <div className="d-flex flex-row">
                    {data?.tags.map((tag, index) => (
                            <div key={index} className="me-4 mb-5">
                                <button type="button" className="btn btn-danger">{tag}</button>
                            </div>
                    ))}
                    </div>)
            }
        }

        const displaySpeakers = () => (

            <div className="row">
            {data?.speakers.map((speaker, index) => (
                    <div className="col" key={index}>
                        <div className="card h-70">
                            <div className="card-body">
                                <img src={speaker.imageUrl} alt={speaker.name} className="rounded-circle img-fluid" style={{width: 150, height: 150}}/>
                                <div className="card-text mt-3 text-center">
                                    <p><strong>{speaker.name}</strong></p>
                                    <p>{speaker.role}</p>
                                </div>

                            </div>

                        </div>
                    </div>

                
            ))}
            </div>
        )

        
            


        return (
            <div className="container">
                <div className="row justify-content-between">
                    <div className="col-md-6">
                        <h1>{data?.title}</h1>
                        <p>Hosted By:</p>
                        <p><strong>{data?.hostedBy}</strong></p>
                        <img src={data?.imageUrl} alt={data?.title} className="img-fluid"/>
                        <h2 className="mt-3">Details:</h2>
                        <p>{data?.details}</p>
                        <h2 className="mt-3">Additional Information:</h2>
                        <p><strong>Dress Code: </strong>{data?.dressCode}</p>
                        <p><strong>Age Restrictions: </strong>{data?.ageRestrictions}</p>
                        <h2>Event Tags:</h2>
                        {displayTags()}
                    </div>
                    <div className="col-md-4">
                        <div className="card mt-3">
                            <div className="card-body py-5">
                                <div className="d-flex align-items-center mb-3">
                                    <span className="me-3" style={{ fontSize: '24px' }}>
                                    {/* &#x1F554; */}
                                    <FontAwesomeIcon icon={faClock} />
                                    </span>
                                    <div>
                                        <p className="card-text" style={{margin: 0}}>
                                        {data?.date} at {data?.startTime} to</p>
                                        <p> {data?.date} at {data?.endTime}</p>
                                    </div>
                                </div>
                                
                               

                                <div className="d-flex align-items-center mb-4">
                                    <span className="me-3" style={{ fontSize: '24px' }}>
                                    {/* &#x1F4CC; */}
                                    <FontAwesomeIcon icon={faLocationDot} />
                                    </span>
                                    <p className="card-text">
                                    {data?.venue}
                                    </p>
                                </div>
                             

                                <div className="d-flex align-items-center">
                                    <span className="me-3 px-2" style={{ fontSize: '24px' }}>
                                     {/* ₹ */}
                                     <FontAwesomeIcon icon={faIndianRupeeSign} />
                                    </span>
                                    <p className="card-text">
                                    {data?.price}
                                    </p>
                                </div>
                                
                            </div>
                        </div>

                        <div className="mt-5">
                            <h4>Speakers: ({data?.speakers.length})</h4>
                            {displaySpeakers()}
                        </div>

                    </div>
                </div>
            </div>
        )};
        

    return (
        <div>
            <Header />
            <div className="container">
            <hr />
            </div>
            <EventInfo />

        </div>
    )


}

export default EventDetails