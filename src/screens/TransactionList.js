import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import map from 'lodash/map';
import orderBy from 'lodash/orderBy';
import filter from 'lodash/filter';

import {deleteTransactions} from '../actions/transactions';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationBack from 'material-ui/svg-icons/navigation/arrow-back';
import Delete from 'material-ui/svg-icons/action/delete';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

@connect(
  state => ({
    transactions: orderBy(state.transactions, ['date'], ['desc']),
    accounts: state.accounts
  }),
  {
    deleteTransactionsAction: deleteTransactions
  }
)
export default class TransactionList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      selectedTransactions: [],
      showModal: false,
      accountId: 'all'
    };
  }

  toggleDeleteTransactionsModal = () => {
    this.setState({showModal: !this.state.showModal});
  }

  handleRowSelected = (selectedRows) => {
    const {transactions} = this.props;
    const {accountId} = this.state;

    const filteredTransactions = accountId === 'all' ? transactions : filter(transactions, t => t.accountId === accountId);
    const selectedTransactions = map(selectedRows, index => filteredTransactions[index].id);
    this.setState({selectedTransactions});
  }

  deleteSelectedTransactions = () => {
    this.props.deleteTransactionsAction(this.state.selectedTransactions);
    this.setState({selectedTransactions: []});
    this.toggleDeleteTransactionsModal();
  }

  handleAccountChange = (event, date, value) => {
    this.setState({
      accountId: value
    });
  }

  render() {
    const {transactions, accounts} = this.props;
    const {selectedTransactions, accountId} = this.state;

    const filteredTransactions = accountId === 'all' ? transactions : filter(transactions, t => t.accountId === accountId);
    
    const items = [<MenuItem value="all" key="all" primaryText="All accounts" />].concat(map(this.props.accounts, account =>
      <MenuItem value={account.id} key={account.id} primaryText={account.name} />
    ));

    const actions = [
      <FlatButton
        label="Cancel"
        primary
        onClick={this.toggleDeleteTransactionsModal}
      />,
      <FlatButton
        label="Ok"
        primary
        onClick={this.deleteSelectedTransactions}
      />
    ];

    return (
      <div>
        <AppBar
          title="Transactions"
          iconElementLeft={<IconButton containerElement={<Link to="/" />}><NavigationBack /></IconButton>}
          iconElementRight={selectedTransactions.length > 0 ? <IconButton onClick={this.toggleDeleteTransactionsModal}><Delete /></IconButton> : undefined}
        />
        <div className="transactions-filter">
          <DropDownMenu
            maxHeight={300}
            value={this.state.accountId}
            onChange={this.handleAccountChange}
            underlineStyle={{margin: 0}}
            labelStyle={{paddingLeft: 0}}>
            {items}
          </DropDownMenu>
        </div>
        <Table style={{tableLayout: 'auto'}} multiSelectable onRowSelection={this.handleRowSelected}>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn>Date</TableHeaderColumn>
              <TableHeaderColumn>Amount</TableHeaderColumn>
              <TableHeaderColumn>Account</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false} deselectOnClickaway={false}>
            {map(filteredTransactions, transaction =>
              <TableRow key={transaction.id} selected={this.state.selectedTransactions.includes(transaction.id)}>
                <TableRowColumn style={{whiteSpace: 'normal'}}>{new Date(transaction.date).toLocaleString()}</TableRowColumn>
                <TableRowColumn className={transaction.amount < 0 ? 'negative-number' : ''}>{transaction.amount}</TableRowColumn>
                <TableRowColumn>{accounts[transaction.accountId].name}</TableRowColumn>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <Dialog
          title="Warning"
          actions={actions}
          modal
          open={this.state.showModal}>
          Are you sure you want to delete the selected transactions?
        </Dialog>
      </div>
    );
  }
}
