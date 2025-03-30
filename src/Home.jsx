import "./Home.css"
import Jobs from "./Jobs";

function Home(){
    return(
        <>
        <section className="Home">
        <div className="content">
        <div className="main-text">
            <h1>FIND YOUR DREAM <br></br> JOB <br></br>WITH EASE</h1>
        </div>
        </div>
        </section>
        <section className="jobs">
            <Jobs />
        </section>
        </>
    );
}
export default Home