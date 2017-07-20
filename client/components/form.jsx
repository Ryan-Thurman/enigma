import React from 'react';
import { Avatar, DatePicker, Input } from 'react-toolbox';

const Form = props => (
  <div>
    <div style={{ margin: '2% 0' }}>
      <Avatar title="Sender" style={{ display: 'inline-block', margin: '0 5% 0 0' }} />
      <div style={{ display: 'inline-block' }}>
        <Input type="text" label="Name *" name="name" value={props.name} onChange={props.onChange} />
      </div>
    </div>
    <Input type="text" label="Message *" name="message" value={props.message} onChange={props.onChange} maxLength={120} multiline />
    <DatePicker label="Expiration *" name="date" value={props.date} onChange={props.onChange} />
  </div>
);

Form.propTypes = {
  name: React.PropTypes.string.isRequired,
  message: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired,
  date: React.PropTypes.object.isRequired,
};

export default Form;

