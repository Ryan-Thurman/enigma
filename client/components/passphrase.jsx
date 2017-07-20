import React from 'react';
import { Link, Tooltip } from 'react-toolbox';

const TooltipLink = Tooltip(Link);


const PassPhrase = props => (
  <div style={{ margin: '3% auto', width: '35%', textAlign: 'center' }}>
    <div>
      { 'Your Passphrase -' }<TooltipLink onClick={props.handleCopy}label={props.passphrase} tooltip="Copy to clipboard" style={{ display: 'inline-block', opacity: 1, color: 'blue' }} />
    </div>
    <Link onClick={props.generatePassPhrase} href={`#p=${props.passphrase}`} label="Generate new Passphrase" style={{ textDecoration: 'none', margin: '2% auto', color: 'blue', opacity: 1 }} />
  </div>
);

PassPhrase.propTypes = {
  passphrase: React.PropTypes.string.isRequired,
  generatePassPhrase: React.PropTypes.func.isRequired,
  handleCopy: React.PropTypes.func.isRequired,
};

export default PassPhrase;
