// import React from "react";
// import { Link } from "react-router-dom";
// import Buttercup1 from "./buttercup1.png";
// import ReviewsIndexContainer from '../reviews/reviews_index_container';
// import '../../stylesheets/trail_show.css'


// class TrailShow extends React.Component {
//   // constructor(props) {
//   //   super(props);
//   // }
//   componentWillMount() {
//     this.props.fetchTrail(this.props.match.params.id);
//     window.scrollTo(0, 0);
//   }

//   componentDidMount() {
//     this.props.fetchWeather({
//       lat: this.props.trail.lat,
//       lng: this.props.trail.lng
//     })
//   }

//   render() {
//     const { trail, weather } = this.props;

//     if (!trail) return null;
//     if (!weather) return null;
//     // if (!trail.photos) return null;

//     if (!this.state.loaded) {
//       return (
//         <div>not loaded</div>
//       );
//     }
    // return (
    //   <div className='trail-show-container'>
    //     <div className="trail-show">
    //       <h1 className='trail-title'>Trail title goes here-{trail.title}</h1>
    //       <div className='trail-show-link'>
    //         <Link className='trail-show-link' to={`/trails/${trail.id}`}>
    //           <img src={Buttercup1} height="300px" width="300px"></img>
    //         </Link>
    //       </div>
    //       <div className='trail-descrption'>
    //         Description - {trail.description}
    //       </div>
    //       <div className='trail-rating'>
    //         Rating - ★★★★★
    //       </div>
    //       <div className='reviews-container'>
    //         <ReviewsIndexContainer />
    //       </div>
    //     </div>
    //   </div>
//     );
//   }
// }

// export default TrailShow;


import React from "react";
import { Link } from "react-router-dom";
import Buttercup1 from "./buttercup1.png";
import ReviewsIndexContainer from '../reviews/reviews_index_container';
class TrailShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = Object.assign({loaded:false}, this.state);
  }
  componentWillMount() {
    //   debugger
    this.props.fetchTrail(this.props.match.params.id).
    then(() => {this.setState({loaded: true})})
    window.scrollTo(0, 0);
  }
  componentDidMount() {
    this.props.fetchWeather({
      lat: this.props.trail.lat,
      lng: this.props.trail.lng
    })
  }
  render() {
    const { trail, weather } = this.props;
    // if (!trail) return null;
    // if (!trail.photos) return null;
    if(!weather) return null;
    // debugger
    if (!this.state.loaded) {
      return (
        <div>not loaded</div>
      );
    }
    return (
      <div className="trail-show-container">
        <div className="trail-show">
          <h1 className="trail-title">Trail title goes here-{trail.title}</h1>
          <div className="trail-show-link">
            <Link className="trail-show-link" to={`/trails/${trail.id}`}>
              <img src={Buttercup1} height="300px" width="300px"></img>
            </Link>
            <div className="weather-container">
              <div className="weather-info">
                <p>{weather.summary}</p>
                <p>{weather.temperature}</p>
                <p>{weather.windSpeed}</p>
                <p>{weather.precipProbability}</p>
                <p>{weather.humidity}</p>
              </div>
            </div>
          </div>
          <div className="trail-descrption">
            Description - {trail.description}
          </div>
          <div className="trail-rating">Rating - ★★★★★</div>
          <div className="reviews-container">
            <ReviewsIndexContainer />
          </div>
        </div>
      </div>
    );
  }
}
export default TrailShow;