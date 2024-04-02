import {Redirect} from 'react-router-dom'
import {Component} from 'react'
import Cookies from 'js-cookie'
import {Loader} from 'react-loader-spinner'
import {AiOutlineSearch} from 'react-icons/ai'
import HeaderRoute from '../HeaderRoute'
import JobItemDetailsRoute from '../JobItemDetailsRoute'
import FilterEmploymentType from '../FilterEmploymentType'
import './index.css'

const apiStatusValues = {
  jobsListFailure: 'FAILURE',
  jobsListInitial: 'INITIAL',
  jobsListSuccess: 'SUCCESS',
  jobsListInProgress: 'IN_PROGRESS',
}

const profileStatusValue = {
  profileFailure: 'FAILURE',
  profileSuccess: 'SUCCESS',
  profileInitial: 'INITIAL',
  profileLoading: 'LOADING',
}
class JobsRoute extends Component {
  state = {
    jobsList: [],
    initialJobsList: [],
    apiStatus: apiStatusValues.jobsListInitial,
    profileStatus: profileStatusValue.profileInitial,
    profileDetails: {},
    searchValue: '',
    empType: [],
    salaryRange: [],
  }

  componentDidMount() {
    this.getJobItemDetails()
    this.getprofileDetails()
  }

  getUpDatedJobsData = data => {
    const updatedJobsData = {
      companyLogoUrl: data.company_logo_url,
      employmentType: data.employment_type,
      id: data.id,
      jobDescription: data.job_description,
      location: data.location,
      packagePerAnnum: data.package_per_annum,
      rating: data.rating,
      title: data.title,
    }
    return updatedJobsData
  }

  onClickRetry = () => {
    this.setState(
      {apiStatus: apiStatusValues.jobsListSuccess},
      this.renderJobsListFetched,
    )
  }

  renderJobsListFailureView = () => (
    <div className="no-jobs-failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failureView"
        className="failure-image"
      />
      <h1 className="failure-heading">Oops something went wrong!</h1>
      <p className="failure-text">
        We can not seem to find the page you are looking for
      </p>
      <button className="retry-btn" type="button" onClick={this.onClickRetry}>
        Retry
      </button>
    </div>
  )

  renderJobsListFetched = () => {
    const {jobsList} = this.state
    return (
      <ul>
        {jobsList.map(eachItem => (
          <JobItemDetailsRoute key={eachItem.id} jobitemDetails={eachItem} />
        ))}
      </ul>
    )
  }

  renderLoading = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  getJobItemDetails = async () => {
    const jobItemsUrl = 'https://apis.ccbp.in/jobs'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(jobItemsUrl, options)
    const fetchedJobsData = await response.json()

    if (response.ok === true) {
      const updatedJobsList = fetchedJobsData.jobs.map(eachJob =>
        this.getUpDatedJobsData(eachJob),
      )
      console.log(updatedJobsList)
      this.setState({
        jobsList: updatedJobsList,
        initialJobsList: updatedJobsList,
        apiStatus: apiStatusValues.jobsListSuccess,
      })
    } else {
      this.setState({apiStatus: apiStatusValues.jobsListFailure})
    }
  }

  getprofileDetails = async () => {
    const profileUrl = 'https://apis.ccbp.in/profile'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const profileResponse = await fetch(profileUrl, options)
    const profileData = await profileResponse.json()
    const data = profileData.profile_details
    if (profileResponse.ok === true) {
      const upDatedProfile = {
        name: data.name,
        profileImageUrl: data.profile_image_url,
        shortBio: data.short_bio,
      }

      this.setState({
        profileDetails: upDatedProfile,
        profileStatus: profileStatusValue.profileSuccess,
      })
    } else {
      this.setState({profileStatusValue: profileStatusValue.profileFailure})
    }
  }

  renderProfileSuccess = () => {
    const {profileDetails} = this.state
    const {name, profileImageUrl, shortBio} = profileDetails
    return (
      <div className="profile-container">
        <img className="profile-image" alt={name} src={profileImageUrl} />
        <h1 className="profile-name">{name}</h1>
        <p className="profile-description">{shortBio}</p>
      </div>
    )
  }

  renderProfileFailure = () => (
    <button className="retry-btn" type="button">
      Retry
    </button>
  )

  renderProfilePage = () => {
    const {profileStatus} = this.state
    switch (profileStatus) {
      case profileStatusValue.profileSuccess:
        return this.renderProfileSuccess()
      case profileStatusValue.profileFailure:
        return this.renderProfileFailure()
      case profileStatusValue.profileLoading:
        return this.renderLoading()
      default:
        return null
    }
  }

  renderJobsDetailsPage = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusValues.jobsListSuccess:
        return this.renderJobsListFetched()
      case apiStatusValues.jobsListFailure:
        return this.renderJobsListFailureView()
      case apiStatusValues.jobsListInProgress:
        return this.renderLoading()
      default:
        return null
    }
  }

  onChangeSearchValue = event => {
    this.setState({searchValue: event.target.value})
    console.log(event.target.value)
  }

  onclickSearchBtn = () => {
    const {searchValue, jobsList, initialJobsList} = this.state
    if (searchValue === '') {
      this.setState({jobsList: initialJobsList}, this.renderJobsListFetched)
    } else {
      const filteredList = jobsList.filter(eachItem =>
        eachItem.title.toLowerCase().includes(searchValue.toLowerCase()),
      )
      this.setState({jobsList: filteredList}, this.renderJobsListFetched)
    }
  }

  renderFiltersList = () => {
    const {empType, jobsList, initialJobsList, searchValue, salaryRange} =
      this.state

    let filteredJobsList = []

    if (empType.length === 0 && salaryRange.length === 0) {
      filteredJobsList = initialJobsList
    } else if (empType.length !== 0) {
      filteredJobsList = initialJobsList.filter(eachItem =>
        empType.includes(eachItem.employmentType),
      )
    } else if (salaryRange.length !== 0) {
      const newSalaryRange = salaryRange.map(eachItem => eachItem.slice(0, 2))
      filteredJobsList = initialJobsList.filter(eachItem =>
        salaryRange.filter(item => eachItem.packagePerAnnum.slice(0, 2) > item),
      )
      console.log(newSalaryRange)
      console.log(filteredJobsList)
    }

    if (searchValue === '') {
      this.setState({jobsList: filteredJobsList}, this.renderJobsListFetched)
    } else {
      this.setState({jobsList: filteredJobsList}, this.onclickSearchBtn)
    }
  }

  employmentSelected = empId => {
    const {empType} = this.state

    const isEmpIdThere = empType.includes(empId)
    console.log(isEmpIdThere)
    if (isEmpIdThere) {
      const filteredEmyTypeList = empType.filter(eachItem => eachItem !== empId)
      this.setState({empType: filteredEmyTypeList}, this.renderFiltersList)
    } else {
      this.setState(
        prevState => ({empType: [...prevState.empType, empId]}),
        this.renderFiltersList,
      )
    }
  }

  salarayRangeSelected = salaryId => {
    const {salaryRange} = this.state
    const isSalaryRangeThere = salaryRange.includes(salaryId)
    if (isSalaryRangeThere) {
      const filteredSalaryRangeList = salaryRange.filter(
        eachItem => eachItem !== salaryId,
      )
      this.setState(
        {salaryRange: filteredSalaryRangeList},
        this.renderFiltersList,
      )
    } else {
      this.setState(
        prevState => ({salaryRange: [...prevState.salaryRange, salaryId]}),
        this.renderFiltersList,
      )
    }
  }

  render() {
    const {searchValue} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }
    return (
      <div className="jobs-list-container">
        <HeaderRoute />
        <div className="jobs-page">
          <div className="jobs-page-left">
            {this.renderProfilePage()}
            <hr />
            <FilterEmploymentType
              employmentSelected={this.employmentSelected}
              salarayRangeSelected={this.salarayRangeSelected}
            />
          </div>
          <div className="jobs-page-right">
            <div className="search-container">
              <input
                type="search"
                placeholder="Search"
                className="search-text"
                onChange={this.onChangeSearchValue}
                value={searchValue}
              />
              <button
                className="search-button"
                type="button"
                onClick={this.onclickSearchBtn}
                data-testid="searchButton"
              >
                <AiOutlineSearch className="search-icon" />
              </button>
            </div>
            <div>{this.renderJobsDetailsPage()}</div>
          </div>
        </div>
      </div>
    )
  }
}

export default JobsRoute
