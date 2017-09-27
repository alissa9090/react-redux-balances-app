import React, {PureComponent} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { map, orderBy } from 'lodash';

import { deleteTransactions } from '../actions/transactions';

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
  TableRowColumn,
} from 'material-ui/Table';

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
      showModal: false
    };
  }

  toggleDeleteTransactionsModal = () => {
    this.setState({showModal: !this.state.showModal});
  }

  handleRowSelected = (selectedRows) => {
    const {transactions} = this.props;
    const selectedTransactions = map(selectedRows, index => transactions[index].id);
    this.setState({selectedTransactions});
  }

  deleteSelectedTransactions = () => {
    this.props.deleteTransactionsAction(this.state.selectedTransactions);
    this.setState({selectedTransactions: []});
    this.toggleDeleteTransactionsModal();
  }

  render() {
    const {transactions, accounts} = this.props;
    const {selectedTransactions} = this.state;

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
        <Table style={{tableLayout: 'auto'}} multiSelectable onRowSelection={this.handleRowSelected}>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn>Date</TableHeaderColumn>
              <TableHeaderColumn>Amount</TableHeaderColumn>
              <TableHeaderColumn>Account</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false} deselectOnClickaway={false}>
            {map(transactions, transaction =>
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
          modal={true}
          open={this.state.showModal}>
          Are you sure you want to delete the selected transactions?
        </Dialog>
      </div>
    );
  }
}
