import { useContext, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { SearchContext } from "../SearchContext"
import { useLocation } from "react-router-dom"
import { useNavigate } from "react-router-dom"


const Header = () => {

    const {userInput, setUserInput} = useContext(SearchContext)
    const location = useLocation();
    const navigate = useNavigate();

    const handleUserInput = (event) => {
        setUserInput(event.target.value)

        // Check if on EventDetails page
        if (location.pathname.includes('/events/')) {
            navigate('/events'); // Redirect to Events page
        }

    }

    const handleUserSubmit = (event) => {
        event.preventDefault();
    }

    // console.log(userInput)



    return (
        <div>
            <style>
                {`
                    @import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');
                `}
            </style>
            <nav className="navbar bg-body-tertiary">
            <div className="container py-3">
                <a className="navbar-brand" href="/" style={{ fontFamily: 'Pacifico, cursive', color: 'red' }}>Meet Up</a>
                <form className="d-flex justify-content-end"  role="search" onSubmit={handleUserSubmit}>
                <div className="position-relative">
                            <span className="position-absolute" style={{ left: '10px', top: '20%', color: '#6c757d' }}>
                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                            </span>
                <input className="form-control" style={{paddingLeft: "40px", textOverflow: "ellipsis", minWidth: "200px", maxWidth: "100%"}} type="search" placeholder="Search for title and tags" aria-label="Search" id="userInput"
                onChange={handleUserInput} value={userInput}/>
                </div>
                </form>
            </div>
            </nav>

        </div>
    )
}

export default Header

