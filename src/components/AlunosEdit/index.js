import React from 'react'
import axios from 'axios'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormText
} from 'reactstrap'
import TextField from '../TextField'

const API = 'http://localhost:4000/api'

export default class AlunosEdit extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      active: false,
      nome: this.props.aluno.nome,
      nomeError: '',
      email: this.props.aluno.email,
      emailError: '',
      data_nascimento: this.props.aluno.data_nascimento,
      data_nascimentoError: ''
    }
    this.toggleModal = this.toggleModal.bind(this)
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }
  render() {
    return (
      <div className="d-inline">
        <button type="button" className="ButtonAction" onClick={this.toggleModal}>
          <kbd>Editar</kbd>
        </button>

        <Modal isOpen={this.state.active}>
          <ModalHeader toggle={this.toggle}>Editar Aluno</ModalHeader>
          <ModalBody>
            <Form>
              <TextField
                type="text"
                label="Nome*"
                name="nome"
                id="nome"
                value={this.state.nome}
                errorText={this.state.nameError}
                onChange={this.onChange}
                onEnter={this.onSubmit}
              />

              <TextField
                type="email"
                label="E-mail*"
                name="email"
                id="email"
                value={this.state.email}
                errorText={this.state.emailError}
                onChange={this.onChange}
                onEnter={this.onSubmit}
              />
              <TextField
                type="date"
                label="Data de Nascimento"
                name="data_nascimento"
                id="data-nascimento"
                value={this.state.data_nascimento}
                errorText={this.state.data_nascimentoError}
                onChange={this.onChange}
                onEnter={this.onSubmit}
              />

              <FormText color="muted">
                * campos obrigatórios
              </FormText>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button type="button" color="primary" onClick={this.onSubmit}>Enviar</Button>
            <Button type="button" color="secondary" onClick={this.toggleModal}>Cancelar</Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
  toggleModal(event) {
    this.setState({
      active: !this.state.active
    })
  }
  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  onSubmit(event) {
    event.preventDefault()

    const err = this.validate()

    if (!err) {
      const aluno_atualizado = {
        _id: this.props.aluno._id,
        nome: this.state.nome,
        email: this.state.email,
        data_nascimento: this.state.data_nascimento
      }

      axios.put(`${API}/alunos/${this.props.aluno._id}`, aluno_atualizado)
        .then(response => {
          this.toggleModal()
          this.props.onAlunoEdited(aluno_atualizado)
        })
        .catch(error => console.error(error))
    }
  }
  validate() {
    let isError = false
    let errors = {}
    let regex = null

    this.setState({
      nomeError: '',
      emailError: '',
      data_nascimentoError: ''
    })

    // NOME VALIDATION
    if (!this.state.nome) {
      isError = true
      errors.nomeError = 'Nome é obrigatório'
    }

    // EMAIL VALIDATION
    regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    if (!this.state.email) {
      isError = true
      errors.emailError = 'E-mail é obrigatório'
    } else if (!regex.test(String(this.state.email).toLowerCase())) {
      isError = true
      errors.emailError = 'E-mail deve ser um endereço válido'
    } else if (this.state.email.length > 400) {
      isError = true
      errors.emailError = 'Email deve ter no máximo 400 caracteres'
    }

    if (isError) this.setState(errors)

    return isError
  }
}
