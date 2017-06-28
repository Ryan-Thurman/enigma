import React from 'react';
import { Input, Dialog } from 'react-toolbox';

export default class DecryptModal extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
                <Dialog
                    actions={this.props.actions}
                    active={this.props.active}
                    onEscKeyDown={this.props.handleToggle}
                    onOverlayClick={this.props.handleToggle}
                    title='De/Encrypt'>
                    <Input type="text" label="Encrypted Message" name="encryptedMessage" value={this.props.encryptedMessage} onChange={this.props.handleChange}/>
                    <Input type="text" label="Enter The Passphrase" name="passphraseAttempt" value={this.props.passphraseAttempt} onChange={this.props.handleChange} />
                </Dialog>
        )
    }
}