import { NavBar } from "../../components/NavBar/NavBar";
import "./style.css";
import { Link } from "react-router-dom";

const Homepage = () => {
    return (
        <div className="page-layout">
        <NavBar />
        <div className="homepage-main flex flex-column flex-center">
            <div className="specialized-banner">
                <div className="banner-text flex flex-column flex-gap-1">
                    <h2>Pomodoro</h2>
                    <p>Pomodoro is a productivity app designed for your work and study. Stay focused and finish tasks effectively. Take more time to your life.</p>
                    <Link to="/todo"><button className="btn btn-hover banner-button">Get Started</button></Link>
                </div>
                <div className="responsive-image">
                    <img src="https://media.istockphoto.com/vectors/timer-pomodoro-pomodoro-time-management-kitchen-timer-mechanical-vector-id1280469581?b=1&k=20&m=1280469581&s=170667a&w=0&h=SRsJohpIfDXHy3tcpnP6op51Fdq_1MpFIVRrOs9Xb00=" alt="pomodoro"  />
                </div>
            </div>
        </div>
    </div>
    );
}

export {Homepage}