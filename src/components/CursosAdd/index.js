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

export default class CursosAdd extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      active: false,
      titulo: '',
      tituloError: '',
      descricao: '',
      descricaoError: ''
    }
    this.toggleModal = this.toggleModal.bind(this)
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }
  render() {
    return (
      <div className="d-inline ml-1">
        <button type="button" className="ButtonAction" onClick={this.toggleModal}>
          <kbd>Novo Curso</kbd>
        </button>

        <Modal isOpen={this.state.active}>
          <ModalHeader toggle={this.toggle}>Novo Curso</ModalHeader>
          <ModalBody>
            <Form>
              <TextField
                type="text"
                label="Título*"
                name="titulo"
                id="titulo"
                value=""
                errorText={this.state.tituloError}
                onChange={this.onChange}
                onEnter={this.onSubmit}
              />

              <TextField
                type="text"
                label="Descrição"
                name="descricao"
                id="descricao"
                value=""
                errorText={this.state.descricaoError}
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
      axios.post(`${API}/cursos`, {
        titulo: this.state.titulo,
        descricao: this.state.decricao
      })
        .then(response => {
          this.toggleModal()
          this.props.onCursoAdded(response.data)
        })
        .catch(error => console.error(error))
    }
  }
  validate() {
    let isError = false
    let errors = {}

    this.setState({
      tituloError: '',
      descricaoError: ''
    })

    // TÍTULO VALIDATION
    if (!this.state.titulo) {
      isError = true
      errors.tituloError = 'Título é obrigatório'
    }

    if (isError) {
      this.setState(errors)
    }

    return isError
  }
}
