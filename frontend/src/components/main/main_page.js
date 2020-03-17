import React from "react";
import tucker from './tuckybackground.png'
import '../../stylesheets/main_page.css'

class MainPage extends React.Component {
  render() {
    return (
      <div className='main-page-whole-wrapper'>
        <div className='main-page-container'>
          <p className='main-page-words'>HikeSF</p>
          <div className='main-page-picture-container'>
            <img className='main-page-picture'src={tucker} alt=""/>
          </div>
        </div>
      </div>
    );
  }
}

export default MainPage;
