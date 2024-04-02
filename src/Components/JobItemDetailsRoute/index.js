import {Component} from 'react'
import {AiFillStar} from 'react-icons/ai'
import {GoLocation} from 'react-icons/go'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import './index.css'

class JobItemDetailsRoute extends Component {
  render() {
    const {jobitemDetails} = this.props
    const {
      companyLogoUrl,
      employmentType,
      id,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
    } = jobitemDetails

    return (
      <li className="job-details-container">
        <div className="logo-title-rating-container">
          <img className="logo" alt="logo" src={companyLogoUrl} />
          <div className="title-rating-container">
            <h1 className="title-heading">{title}</h1>
            <div className="rating-container">
              <AiFillStar className="star-rating" />
              <p className="rating-text">{rating}</p>
            </div>
          </div>
        </div>

        <div className="location-internship-salary-container">
          <div className="location-internship-container">
            <div className="employment-location-container">
              <GoLocation className="location-icon" />
              <p className="employment-location-text">{location}</p>
            </div>
            <div className="employment-location-container">
              <BsFillBriefcaseFill />
              <p className="employment-location-text">{employmentType}</p>
            </div>
          </div>
          <p className="package-text">{packagePerAnnum}</p>
        </div>
        <hr />
        <p className="description-heading">Description</p>
        <p className="description-para">{jobDescription}</p>
      </li>
    )
  }
}

export default JobItemDetailsRoute
