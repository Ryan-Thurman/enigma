import React, { Component } from 'react';
import { Card, CardActions, Button, CardTitle } from 'react-toolbox';

import Form from './form';
import DecryptModal from './decryptModal';
import PassPhrase from './passphrase';

export default class App extends Component {
    state = {
      name: '',
      message: '',
      date: new Date(),
      active: false,
      encryptedMessage: '',
      passphrase: '',
    };
    componentWillMount() {
      this.checkForPassphrase();
    }
    checkForPassphrase() {
      // verifying is a password is needed or if one needs to be generated
      const hrefString = window.location.href;

      if (hrefString.indexOf('=') === -1) {
        this.generatePassPhrase();
      } else {
        const hrefPassphrase = hrefString.substr(hrefString.indexOf('=') + 1);
        this.setState({
          passphrase: hrefPassphrase,
        });
      }
    }
    generatePassPhrase = () => {
      const newHash = this.simpleHashGenerator();
      this.setState({
        passphrase: newHash,
      });
      // changing the url with the password created
      window.location.href += `#p=${newHash}`;
    }
    simpleHashGenerator = () => {
      // very basic password generator
      let hash = '';
      const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      for (let i = 0; i < 16; i += 1) {
        hash += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      return hash;
    }
    handleChange = (value, ev) => {
      this.setState({
        [ev.target.name]: value,
      });
    };
    handleEncrypt = () => {
      // easy setup for sending data
      const fm = {
        name: this.state.name,
        message: this.state.message,
        date: this.state.date,
        passphrase: this.state.passphrase,
      };
      fetch('http://localhost:3100/encrypt', {
        method: 'POST',
        body: JSON.stringify(fm),
      },
      ).then((rep) => {
        rep.text()
          .then((text) => {
            // display the encrypted message to be copied
            this.setState({
              encryptedMessage: text,
            });
            // open the decrypt modal
            this.handleToggle();
          });
      });
    }
    handleDecrypt = () => {
      // easy set for sending data
      const fm = {
        message: this.state.encryptedMessage,
        passphrase: this.state.passphrase,
      };
      fetch('http://localhost:3100/decrypt', {
        method: 'POST',
        body: JSON.stringify(fm),
      })
        .then((rep) => {
          rep.json()
            .then((json) => {
              // after the response from the server set the state
              this.setState({
                name: json.name,
                message: json.message,
              });
              // clear the decrypt modal
              this.handleToggle();
            });
        });
    }
    handleToggle = () => {
      // toggle the modal for decrypt
      this.setState({ active: !this.state.active });
    }
    handleCopy = () => {
      // basic setup to copy field
      const textField = document.createElement('textarea');
      textField.innerText = this.state.passphrase;
      document.body.appendChild(textField);
      textField.select();
      document.execCommand('copy');
      textField.remove();
    }
    render() {
      return (
        <div>
          <Card style={{ width: '40%', padding: '0 2%', margin: '0 auto' }}>
            <CardTitle title="Tovia's Enigma" />
            <Form
              onChange={this.handleChange}
              name={this.state.name}
              message={this.state.message}
              date={this.state.date}
            />
            <CardActions>
              <Button onClick={this.handleEncrypt}>ENCRYPT</Button>
              <Button onClick={this.handleToggle}>DECRYPT</Button>
            </CardActions>
            <DecryptModal
              actions={[{ label: 'Cancel', name: 'Cancel', onClick: this.handleToggle }, { label: 'Decrypt', name: 'Decrypt', onClick: this.handleDecrypt }]}
              active={this.state.active}
              onEscKeyDown={this.handleToggle}
              onOverlayClick={this.handleToggle}
              encryptedMessage={this.state.encryptedMessage}
              passphrase={this.state.passphrase}
              onChange={this.handleChange}
            />
          </Card>
          <PassPhrase
            passphrase={this.state.passphrase}
            generatePassPhrase={this.generatePassPhrase}
            handleCopy={this.handleCopy}
          />
        </div>);
    }
}
