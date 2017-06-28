import React from 'react';
import { Link } from 'react-toolbox';


export default class PassPhrase extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return(
            <div style={{textAlign: "center"}}>
                <div>
                Your Passphrase is {this.props.passphrase}
                </div>
                <Link onClick={this.props.generatePassPhrase} href="#" label="Generate New Passphrase"/>
            </div>
        )
    }
}
