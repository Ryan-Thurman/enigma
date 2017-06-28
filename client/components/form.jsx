import React from 'react';
import { DatePicker, Input} from 'react-toolbox';

export default class Form extends React.Component {
    constructor(props) {
        super(props)
        console.log(this.props)
    }
    render() {
        return(
            <div>
                <form>
                    <Input type="text" label="Name" name="name" value={this.props.name} onChange={this.props.onChange} />
                    <Input type="text" label="Message" name="message" value={this.props.message} onChange={this.props.onChange} />
                    <DatePicker label="Expiration" name="date" value={this.props.date} onChange={this.props.onChange} />
                </form>  
            </div>
        )
    }
}


