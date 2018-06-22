import React from 'react'
import axios from 'axios'
import CursosAdd from '../CursosAdd'
import CursosEdit from '../CursosEdit'
import CursosDelete from '../CursosDelete'

const API = 'http://localhost:4000/api'

export default class Cursos extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      filter: '',
      cursos: []
    }

    this.onSubmit = this.onSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.onCursoAdded = this.onCursoAdded.bind(this)
    this.onCursoEdited = this.onCursoEdited.bind(this)
    this.onCursoDeleted = this.onCursoDeleted.bind(this)
  }
  render() {
    let cursos = this.state.cursos.filter(curso => {
      return !!(
        curso.titulo.toLowerCase().indexOf(this.state.filter.toLowerCase()) > -1 ||
        curso.descricao.toLowerCase().indexOf(this.state.filter.toLowerCase()) > -1
      )
    })

    const NotFound = () => {
      return (
        <div className="alert alert-info" role="alert">
          {this.state.filter.length
          ? `Não foram encontrados cursos com o termo "${this.state.filter}".`
          : "Nenhum curso cadastrado"}
        </div>
      )
    }

    const Table = () => {
      const rows = cursos.map(curso => {
        return (
          <tr key={curso._id}>
            <td>{curso.titulo}</td>
            <td>{curso.descricao}</td>
            <td align="center">
              <CursosEdit onCursoEdited={this.onCursoEdited} curso={curso}/>
              <CursosDelete onCursoDeleted={this.onCursoDeleted} curso={curso}/>
            </td>
          </tr>
        )
      })

      return (
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Título</th>
              <th scope="col">Descrição</th>
              <th scope="col">&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>
      )
    }

    return <div>
      <form onSubmit={this.onSubmit}>
        <div className="form-group">
          <input className="form-control" type="search" autoFocus="true" autoComplete="false" spellCheck="false" value={this.state.filter} placeholder="Escreva aqui para filtrar os cursos" onChange={this.onChange}/>
        </div>
      </form>

      <CursosAdd onCursoAdded={this.onCursoAdded}/>

      {cursos.length
      ? <Table />
      : <NotFound />}

      <CursosAdd onCursoAdded={this.onCursoAdded}/>
    </div>
  }
  componentDidMount() {
    axios.get(`${API}/cursos`)
      .then(response => {

        console.log(response)
        const cursos = response.data.sort((a, b) => a.titulo > b.titulo)
        this.setState({ cursos })
      })
  }
  onSubmit(event) {
    event.preventDefault()
  }
  onChange(event) {
    this.setState({ filter: event.target.value })
  }
  onCursoAdded(curso) {
    let cursos = this.state.cursos

    cursos.push(curso)

    cursos.sort((a, b) => a.titulo > b.titulo)

    this.setState({ cursos })
  }
  onCursoEdited(curso_atualizado) {
    let cursos = this.state.cursos
    let foundIndex = cursos.findIndex(curso => curso._id === curso_atualizado._id)

    cursos[foundIndex] = curso_atualizado

    cursos.sort((a, b) => a.titulo > b.titulo)

    this.setState({ cursos })
  }
  onCursoDeleted(_id) {
    const cursos = this.state.cursos.filter(curso => curso._id !== _id)
    this.setState({ cursos })
  }
}
