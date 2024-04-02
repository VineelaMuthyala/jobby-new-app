import {Component} from 'react'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class FilterEmploymentType extends Component {
  onClickEmpType = event => {
    const {employmentSelected} = this.props
    const empId = event.target.value
    employmentSelected(empId)
  }

  onClickSalaryRange = event => {
    const {salarayRangeSelected} = this.props
    const salaryId = event.target.value
    salarayRangeSelected(salaryId)
  }

  render() {
    return (
      <div className="emp-type-container">
        <ul>
          {employmentTypesList.map(eachItem => (
            <li key={eachItem.employmentTypeId}>
              <input
                className="emp-check-box"
                type="checkbox"
                id={eachItem.employmentTypeId}
                name={eachItem.employmentTypeId}
                value={eachItem.label}
                onClick={this.onClickEmpType}
              />
              <label
                className="emp-type-lable"
                htmlFor={eachItem.employmentTypeId}
              >
                {eachItem.label}
              </label>
            </li>
          ))}
        </ul>

        <hr />
        <ul>
          {salaryRangesList.map(eachItem => (
            <li key={eachItem.salaryRangeId}>
              <input
                className="emp-check-box"
                type="checkbox"
                id={eachItem.salaryRangeId}
                name={eachItem.salaryRangeId}
                value={eachItem.label}
                onClick={this.onClickSalaryRange}
              />
              <label
                className="emp-type-lable"
                htmlFor={eachItem.salaryRangeId}
              >
                {eachItem.label}
              </label>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default FilterEmploymentType
