import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import find from 'lodash/find';
import filter from 'lodash/filter';
import map from 'lodash/map';
import toNumber from 'lodash/toNumber';
import isNaN from 'lodash/isNaN';
import {Link} from 'react-router-dom';
import uuidv4 from 'uuid/v4';

import {createTransaction} from '../actions/transactions';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationBack from 'material-ui/svg-icons/navigation/arrow-back';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

@connect(
  state => {
    return {
      accounts: filter(state.accounts, account => !account.hidden)
    };
  },
  {
    createTransactionAction: createTransaction
  }
)
export default class TransactionForm extends PureComponent {
  constructor(props) {
    super(props);

    const accountId = get(props, 'match.params.accountId');

    this.state = {
      amount: '',
      amountValidation: '',
      date: new Date(),
      accountId
    };
  }

  handleAmountChange = (event) => {
    this.setState({
      amount: event.target.value,
      amountValidation: ''
    });
  }

  handleDateChange = (event, date) => {
    const hours = this.state.date.getHours();
    const minutes = this.state.date.getMinutes();
    date.setHours(hours);
    date.setMinutes(minutes);
    this.setState({
      date
    });
  }

  handleTimeChange = (event, date) => {
    this.setState({
      date
    });
  }

  handleAccountChange = (event, date, value) => {
    this.setState({
      accountId: value
    });
  }

  onPressSave = () => {
    const {amount} = this.state;
    if (isEmpty(amount)) {
      this.setState({amountValidation: 'This field is required.'});
      return;
    }
    const amountNumber = toNumber(amount);
    if (isNaN(amountNumber)) {
      this.setState({amountValidation: 'The amount must be a number.'});
      return;
    }

    const {accountId, date} = this.state;
    this.props.createTransactionAction(uuidv4(), accountId, amountNumber, date.toISOString());
    
    this.props.history.push('/');
  }

  render() {
    const items = map(this.props.accounts, account =>
      <MenuItem value={account.id} key={account.id} primaryText={account.name} />
    );
    return (
      <div>
        <AppBar
          title="Create transaction"
          iconElementLeft={<IconButton containerElement={<Link to="/" />}><NavigationBack /></IconButton>}
          iconElementRight={<FlatButton label="Save" onClick={this.onPressSave} />}
        />
        <div className="transaction-form">
          <TextField
            floatingLabelText="Amount"
            value={this.state.amount}
            onChange={this.handleAmountChange}
            errorText={this.state.amountValidation}
          />
          <DatePicker
            floatingLabelText="Date"
            autoOk
            value={this.state.date}
            onChange={this.handleDateChange}
          />
          <TimePicker
            format="24hr"
            floatingLabelText="Time"
            autoOk
            value={this.state.date}
            onChange={this.handleTimeChange}
          />
          <DropDownMenu
            maxHeight={300}
            value={this.state.accountId}
            onChange={this.handleAccountChange}
            underlineStyle={{margin: 0}}
            labelStyle={{paddingLeft: 0}}>
            {items}
          </DropDownMenu>
        </div>
      </div>
    );
  }
}
