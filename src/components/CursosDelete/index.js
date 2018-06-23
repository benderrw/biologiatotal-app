import React from 'react'
import axios from 'axios'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap'
import PropTypes from 'prop-types'

const API = 'http://localhost:4000/api'

export default class CursosDelete extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      active: false
    }
    this.toggleModal = this.toggleModal.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }
  render() {
    return (
      <div className="d-inline ml-1">
        <button type="button" className="ButtonAction" onClick={this.toggleModal}>
          <kbd>Deletar</kbd>
        </button>

        <Modal isOpen={this.state.active}>
          <ModalHeader toggle={this.toggleModal}>Confirmação</ModalHeader>
          <ModalBody>
            Você realmente deseja deletar o curso <strong>{this.props.curso.titulo}</strong>?
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.onSubmit}>Deletar</Button>{' '}
            <Button color="secondary" onClick={this.toggleModal}>Cancelar</Button>
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
  onSubmit(event) {
    axios.delete(`${API}/cursos/${this.props.curso._id}`)
      .then(res => {
        this.toggleModal()
        this.props.onCursoDeleted(this.props.curso._id)
      })
      .catch(error => console.error(error))
  }
}

CursosDelete.propTypes = {
  onCursoDeleted: PropTypes.func
}
