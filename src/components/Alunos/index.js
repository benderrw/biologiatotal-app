import React from 'react'
import axios from 'axios'
import AlunosAdd from '../AlunosAdd'
import AlunosEdit from '../AlunosEdit'
import AlunosDelete from '../AlunosDelete'

const API = 'http://localhost:4000/api'

export default class Alunos extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			filter: '',
			alunos: []
		}

		this.onSubmit = this.onSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
		this.onAlunoAdded = this.onAlunoAdded.bind(this)
    this.onAlunoEdited = this.onAlunoEdited.bind(this)
    this.onAlunoDeleted = this.onAlunoDeleted.bind(this)
	}
	render() {
		let alunos = this.state.alunos.filter(aluno => {
			return !!(
				aluno.nome.indexOf(this.state.filter) > -1 ||
				aluno.email.indexOf(this.state.filter) > -1 ||
				aluno.data_nascimento.indexOf(this.state.filter) > -1
			)
		})

		const NotFound = () => {
			return (
				<div className="alert alert-info" role="alert">
				  Não foram encontrados alunos com o termo <i>{this.state.filter}</i>.
				</div>
			)
		}

		const Table = () => {
			const rows = alunos.map(aluno => {
        let data_nascimento = aluno.data_nascimento;

        if (data_nascimento) {
  				data_nascimento = (new Date(aluno.data_nascimento))
  				data_nascimento = `${data_nascimento.getDate()}-${data_nascimento.getMonth() + 1}-${data_nascimento.getFullYear()}`
        } else {
          data_nascimento = ''
        }


				return (
					<tr key={aluno._id}>
						<td>{aluno.nome}</td>
						<td>{aluno.email}</td>
            <td>{data_nascimento}</td>
						<td align="center">
              <AlunosEdit onAlunoEdited={this.onAlunoEdited} aluno={aluno}/>
              <AlunosDelete onAlunoDeleted={this.onAlunoDeleted} aluno={aluno}/>
            </td>
					</tr>
				)
			})

			return (
				<table className="table table-striped">
					<thead>
						<tr>
							<th scope="col">Nome</th>
							<th scope="col">E-mail</th>
              <th scope="col">Data de Nascimento</th>
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
          <input className="form-control" type="search" autoFocus="true" autoComplete="false" spellCheck="false" value={this.state.filter} placeholder="Escreva aqui para pesquisar" onChange={this.onChange}/>
        </div>
      </form>

      <AlunosAdd onAlunoAdded={this.onAlunoAdded}/>

			{alunos.length
			? <Table />
			: <NotFound />}

      <AlunosAdd onAlunoAdded={this.onAlunoAdded}/>
		</div>
	}
	componentDidMount() {
		axios.get(`${API}/alunos`)
			.then(response => {
        const alunos = response.data.sort((a, b) => a.nome > b.nome)
  			this.setState({ alunos })
  		})
	}
	onSubmit(event) {
		event.preventDefault()
	}
	onChange(event) {
		this.setState({ filter: event.target.value })
	}
  onAlunoAdded(aluno) {
    let alunos = this.state.alunos

    alunos.push(aluno)

    alunos.sort((a, b) => a.nome > b.nome)

    this.setState({ alunos })
  }
  onAlunoEdited(aluno_atualizado) {
    var alunos = this.state.alunos
    var foundIndex = alunos.findIndex(aluno => aluno._id === aluno_atualizado._id)

    console.log(aluno_atualizado, alunos, foundIndex)

    alunos[foundIndex] = aluno_atualizado
    console.log('before', alunos[foundIndex])
    console.log('after', aluno_atualizado)

    alunos.sort((a, b) => a.nome > b.nome)

    this.setState({ alunos })
  }
  onAlunoDeleted(_id) {
    const alunos = this.state.alunos.filter(aluno => aluno._id !== _id)
    this.setState({ alunos })
  }
}
