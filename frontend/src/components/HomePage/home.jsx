import NavigationBar from '../navBar/navbar';
import './style.css';

const Home = () => {

  return (
    <>
    <NavigationBar />
    <div className="welcome-container">
      <span className="render">LMASROUF</span><br/>
      <span className="render2">Create your budget</span>
    </div>
    </>
    
  );
};

export default Home;
