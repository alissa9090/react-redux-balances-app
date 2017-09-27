import React, {PureComponent} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { map, sortBy } from 'lodash';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationBack from 'material-ui/svg-icons/navigation/arrow-back';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

const Transaction = ({id, accountId, amount, date}) => {
  return (
    <div>
      Transaction
    </div>
  );
};

@connect(
  state => ({
    transactions: state.transactions,
    accounts: state.accounts
  }),
  {

  }
)
export default class TransactionList extends PureComponent {
  render() {
    const {transactions, accounts} = this.props;
    return (
      <div>
        <AppBar
          title="Transactions"
          iconElementLeft={<IconButton containerElement={<Link to="/" />}><NavigationBack /></IconButton>}
        />
        <Table style={{tableLayout: 'auto'}}>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn>Date</TableHeaderColumn>
              <TableHeaderColumn>Amount</TableHeaderColumn>
              <TableHeaderColumn>Account</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {map(transactions, transaction =>
              <TableRow key={transaction.id}>
                <TableRowColumn style={{whiteSpace: 'normal'}}>{new Date(transaction.date).toLocaleString()}</TableRowColumn>
                <TableRowColumn className={transaction.amount < 0 ? 'negative-number' : ''}>{transaction.amount}</TableRowColumn>
                <TableRowColumn>{accounts[transaction.accountId].name}</TableRowColumn>
              </TableRow>
            )}
          </TableBody>
      </Table>
      </div>
    );
  }
}
