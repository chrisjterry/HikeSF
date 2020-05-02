import React from "react";
import tucker from './tuckybackground.png';
import fog from './fog.jpg';
import { Link } from "react-router-dom";
import '../../stylesheets/main_page.css';
import '../../stylesheets/logged_in_home.css';

const MainPage = ({ currentUser, history }) => {

  const handleClick = redirect => {
    return e => {
      if (!Object.keys(currentUser).length) {
        e.preventDefault();
        history.push({
          pathname: '/register',
          search: `redirect=${redirect}`
        })
      }
    }
  }

  const loggedOutHome = () => (
   <div className='main-page-whole-wrapper'>
        <div className='main-page-container'>
          {/* <p className='main-page-words'>HikeSF</p> */}
          <div className='main-page-picture-container'>
            <img className='main-page-picture'src={tucker} alt=""/>
          </div>
        </div>
      </div>
  );

  const loggedInHome = () => (
    <div>
      <div className="main-page-logged-in">
        <div className='main-inner'>
          <div className="main-page-header">Ready for your next adventure?</div>
          <div className='right-side-trails-wrapper'>
            <div className="trails-link">
              <Link className="all-trails pulsate-2" to={"/trails"} onClick={handleClick('/trails')}>
                All Trails
              </Link>
            </div>
            <div className="create-trail-wrap">
              <Link className="create-trail pulsate-1" to={"/trails/new"} onClick={handleClick('/trails/new')}>
                Create Trail
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="submain">
        <div>
          Browse trails created by fellow HikeSF hikers
          <div>⚘</div>
        </div>
        <div>
          View current weather conditions before heading out
          <div>❄</div>
        </div>
        <div>
          Read reviews and leave reviews
          <div>✰</div>
        </div>
        <div>
          Create your own trails and share the magic!
          <br />
          <div>✎</div>
        </div>
      </div>
    </div>
  );

    return (
      <div>
        {currentUser ? loggedInHome() : loggedOutHome()}
      </div>
    );

}

export default MainPage;
