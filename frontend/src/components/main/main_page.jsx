import React from "react";
import tucker from './tuckybackground.png';
import fog from './fog.jpg';
import { Link } from "react-router-dom";
import '../../stylesheets/main_page.css';
import '../../stylesheets/logged_in_home.css';

const MainPage = ({ currentUser }) => {

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
        <div className="main-page-logged-in-inside-container">
          {/* <img className="main-page-picture" src={fog} alt="" /> */}
          <br />
          <br />
          <br />
          <br />
          <div className="main-page-header">Ready to get lost?</div>
          <br />
          <br />

          <div className="main-page-subheader">
            get to know San Francisco like you've never known it before.
          </div>
          <br />
          <br />
          <br />
          <br />
        </div>
        <div className="create-trail-wrap">
          <Link className="create-trail" to={"/trails/new"}>
            Create New Trail
          </Link>
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
