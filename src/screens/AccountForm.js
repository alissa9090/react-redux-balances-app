import React, {PureComponent} from 'react';
import { connect } from 'react-redux';
import { get, isEmpty } from 'lodash';
import { Link } from 'react-router';
import uuidv4 from 'uuid/v4';

import { createAccount, updateAccountName } from '../actions/accounts';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationBack from 'material-ui/svg-icons/navigation/arrow-back';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

@connect(
  (state, props) => {
    const accountId = get(props, 'params.accountId');
    return {account: get(state.accounts, accountId, {})};
  },
  {
    createAccountAction: createAccount,
    updateAccountNameAction: updateAccountName
  }
)
class AccountForm extends PureComponent {
constructor(props) {
    super(props);

    this.state = {
      name: props.account.name || '',
      nameValidation: ''
    };
  }

  onPressSave = () => {
    const {name} = this.state;
    if (isEmpty(name)){
      this.setState({nameValidation: 'This field is required.'});
      return;
    }
    const accountId = get(this.props, 'params.accountId');
    if (isEmpty(accountId)) {
      this.props.createAccountAction(uuidv4(), this.state.name);
    } else {
      this.props.updateAccountNameAction(accountId, this.state.name);
    }
    
    this.props.history.push('/');
  }

  handleNameChange = (event) => {
    this.setState({
      name: event.target.value,
      nameValidation: ''
    });
  };

  render() {
    const accountId = get(this.props, 'params.accountId');
    return (
      <div>
        <AppBar
          title={isEmpty(accountId) ? 'New account' : 'Edit account'}
          iconElementLeft={<IconButton containerElement={<Link to="/" />}><NavigationBack /></IconButton>}
          iconElementRight={<FlatButton label="Save" onClick={this.onPressSave} />}
        />
        <div className="account-form">
          <TextField
            floatingLabelText="Name"
            value={this.state.name}
            onChange={this.handleNameChange}
            errorText={this.state.nameValidation}
          />
        </div>
      </div>
    );
  }
}

export default AccountForm
