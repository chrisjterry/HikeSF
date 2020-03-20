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
        <div>
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
      </div>
      <div className="submain">
        <div>
          <Link className="all-trails" to={"/trails"}>
            Browse trails created by fellow HikeSF hikers
          </Link>
          <div>⚘</div>
        </div>
        <div>
          <Link
            className="all-trails"
            to={"/trails/5e7406189a1eaf1e4a2416ce"}
          >
            View current weather conditions before heading out
          </Link>
          <div>❄</div>
        </div>
        <div>
          Loved the trail? Leave a review
          <div>✰</div>
        </div>
        <div>
          <Link className="create-trail" to={"/trails/new"}>
            Create your own trails and share the magic!
          </Link>
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
