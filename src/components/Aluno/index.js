import React from 'react'
import axios from 'axios'
import { Jumbotron } from 'reactstrap'

const API = 'http://localhost:4000/api'

export default class Aluno extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidMount() {
    axios.get(`${API}/alunos/${this.props.match.params.id}`)
      .then(response => {
        this.setState(response.data)
      })
  }
  render() {
    let data_nascimento = this.state.data_nascimento

    if (data_nascimento) {
      data_nascimento = (new Date(data_nascimento))
      data_nascimento = `${data_nascimento.getDate()}-${data_nascimento.getMonth() + 1}-${data_nascimento.getFullYear()}`
    } else {
      data_nascimento = ''
    }

    return (
      <div>
        <Jumbotron>
          <h1>{this.state.nome}</h1>
          <p className="lead">{this.state.email}</p>
          <p className="lead">{data_nascimento}</p>
        </Jumbotron>
      </div>
    )
  }
}
