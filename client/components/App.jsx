import React from 'react';
import { Card, CardActions, DatePicker, Input, Button, Dialog, Link } from 'react-toolbox';

export default class App extends React.Component {
      constructor(props) {
        super(props);
            this.state = {
                name: '',
                message:'',
                date: new Date(),
                active: false,
                encryptedMessage: "",
                passphrase: '',
                passphraseAttempt: ""
            };
        this.handleChange = this.handleChange.bind(this)
        this.handleEncrypt = this.handleEncrypt.bind(this)
        this.handleDecrypt = this.handleDecrypt.bind(this)
        this.handleToggle = this.handleToggle.bind(this)
        this.generatePassPhrase = this.generatePassPhrase.bind(this)
        this.simpleHashGenerator = this.simpleHashGenerator.bind(this)
        this.actions = [
        { label: "Cancel", name: "Cancel", onClick: this.handleToggle },
        { label: "Decrypt", name: "Decrypt", onClick: this.handleDecrypt }
        ];
    };
     componentWillMount() {
        if (!this.state.passphrase) 
        this.generatePassPhrase()
    }
    generatePassPhrase() {
        let newHash = this.simpleHashGenerator()
        this.setState({
            passphrase: newHash
        })
    }
    simpleHashGenerator() {
        let hash = "";
        const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for(var i = 0; i < 16; i++) {
            hash += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return hash;
    }
    handleChange(value, ev) {
        this.setState({
           [ev.target.name] : value 
        })
    };
    handleEncrypt() {
        let fm = {
            name: this.state.name,
            message: this.state.message,
            date: this.state.date,
            passphrase: this.state.passphrase
        }
        fetch('http://localhost:3001/encrypt', {
        method: 'POST',
        body: JSON.stringify(fm)
        }
        ).then((rep) =>{
            return rep.text()
            .then((text) => {
                 this.setState({
                    encryptedMessage : text
                })
                this.handleToggle()
            })
        })
    }
    handleDecrypt() {
        let fm = {
            message: this.state.encryptedMessage,
            passphrase: this.state.passphraseAttempt
        }
        fetch('http://localhost:3001/decrypt', {
        method: 'POST',
        body: JSON.stringify(fm)
        }
        ).then((rep) =>{
            return rep.json()
            .then((json) => {
                 this.setState({
                    name: json.name,
                    message : json.message
                })
                this.handleToggle()
            })
        })
    }
    handleToggle() {
        this.setState({active: !this.state.active});
    }
  render() {
    return (
     <div>
         <Card style={{width: '800px', padding: "5%", margin: "0 auto"}}>
                <form>
                    <Input type="text" label="Name" name="name" value={this.state.name} onChange={this.handleChange}/>
                    <Input type="text" label="Message" name="message" maxLength={120} value={this.state.message} onChange={this.handleChange}/>
                    <DatePicker label="Expiration" name="date" value={this.state.date} onChange={this.handleChange}/>
                </form>
                <CardActions>
                    <Button onClick={this.handleEncrypt}>ENCRYPT</Button>
                    <Button onClick={this.handleToggle}>DECRYPT</Button>
                </CardActions>
                <Dialog
                    actions={this.actions}
                    active={this.state.active}
                    onEscKeyDown={this.handleToggle}
                    onOverlayClick={this.handleToggle}
                    title='De/Encrypt'>
                    <Input type="text" label="Encrypted Message" name="encryptedMessage" value={this.state.encryptedMessage} onChange={this.handleChange}/>
                    <Input type="text" label="Enter The Passphrase" name="passphraseAttempt" value={this.state.passphraseAttempt} onChange={this.handleChange} />
                </Dialog>
                <div style={{textAlign: "center"}}>
                    <div>
                    Your Passphrase is {this.state.passphrase}
                    </div>
                    <Link onClick={this.generatePassPhrase} href="#" label="Generate New Passphrase"/>
                </div>
        </Card>
    </div>);
  }
}