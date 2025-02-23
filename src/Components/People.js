import './People.css'

import React from 'react'

class People extends React.Component {
  constructor() {
    super()
    this.state = {
      userInput: '',
      peopleData: [],
      findName: [],
    }
  }

  componentDidMount() {
    let Base_Url = 'https://ghibliapi.herokuapp.com/'
    let people = 'people'
    fetch(`${Base_Url}${people}`)
      .then((response) => response.json())
      .then((json) => {
        this.setState({ peopleData: json })
      })

      .catch((error) => console.log(error))
  }

  handleSubmit = (event) => {
    event.preventDefault()

    this.setState({
      findName: this.state.peopleData.find(
        (person) => this.state.userInput === person.name
      ),
    })

    event.target.reset()
  }

  handleChange = (event) => {
    this.setState({ userInput: event.target.value })
  }

  render() {
    const { findName } = this.state
    console.log(findName)
    return (
      <div className='people'>
        <h1>Search for a Person</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            type='text'
            placeholder='Enter first letter in Cap'
            onChange={this.handleChange}
            required
          />
          <button className='submit'>Submit</button>
        </form>
        {findName ? (
          <section key={findName.id}>
            <h2>Name: {findName.name}</h2>
            <p>EyeColor: {findName.eye_color}</p>
            <p>Hair Color: {findName.hair_color}</p>
            <p>Gender: {findName.gender}</p>
            <p>Age: {findName.age}</p>
          </section>
        ) : (
          <p>Not Found</p>
        )}
      </div>
    )
  }
}

export default People
