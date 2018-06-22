import React from 'react';
import PropTypes from 'prop-types';
import {
  Input,
  Label,
  FormGroup,
  FormFeedback
} from 'reactstrap';

class TextField extends React.Component {
  _handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.props.onEnter(e);
    }
  }

  render() {
    return (
      <FormGroup>
        <Label for={this.props.id}>{this.props.label}</Label>
        <Input
          type={this.props.type}
          name={this.props.name}
          id={this.props.id}
          defaultValue={this.props.value}
          onChange={this.props.onChange}
          onKeyPress={this._handleKeyPress}
          invalid={!!this.props.errorText} />
        <FormFeedback>{this.props.errorText}</FormFeedback>
      </FormGroup>
    );
  }
}

export default TextField;

TextField.propTypes = {
  onEnter: PropTypes.func,
  id: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  errorText: PropTypes.string
}
