import React from 'react';
import { Input, Dialog } from 'react-toolbox';

const DecryptModal = props => (
  <Dialog
    actions={props.actions}
    active={props.active}
    onEscKeyDown={props.handleToggle}
    onOverlayClick={props.handleToggle}
    title="De/Encrypt"
  >
    <Input type="text" label="Encrypted Message" name="encryptedMessage" value={props.encryptedMessage} onChange={props.handleChange} />
  </Dialog>
);

DecryptModal.propTypes = {
  actions: React.PropTypes.array.isRequired,
  active: React.PropTypes.bool.isRequired,
  handleToggle: React.PropTypes.func.isRequired,
  encryptedMessage: React.PropTypes.string.isRequired,
  handleChange: React.PropTypes.func.isRequired,
};
export default DecryptModal;
