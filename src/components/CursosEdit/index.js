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
import PropTypes from 'prop-types'

const API = 'http://localhost:4000/api'

export default class CursosEdit extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      active: false,
      titulo: this.props.curso.titulo,
      tituloError: '',
      descricao: this.props.curso.descricao,
      descricaoError: ''
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
          <ModalHeader toggle={this.toggle}>Editar Curso</ModalHeader>
          <ModalBody>
            <Form>
              <TextField
                type="text"
                label="Título*"
                name="titulo"
                id="titulo"
                value={this.state.titulo}
                errorText={this.state.tituloError}
                onChange={this.onChange}
                onEnter={this.onSubmit}
              />

              <TextField
                type="text"
                label="Descrição"
                name="descricao"
                id="descricao"
                value={this.state.descricao}
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
      const curso_atualizado = {
        _id: this.props.curso._id,
        titulo: this.state.titulo,
        descricao: this.state.descricao
      }

      axios.put(`${API}/cursos/${this.props.curso._id}`, curso_atualizado)
        .then(response => {
          this.toggleModal()
          this.props.onCursoEdited(curso_atualizado)
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

    if (isError) this.setState(errors)

    return isError
  }
}

CursosEdit.propTypes = {
  onCursoEdited: PropTypes.func
}
