import React from 'react';

const Transaction = ({id, accountId, amount, date}) => {
  return (
    <div>
      Transaction
    </div>
  );
};

export default class TransactionList extends React.Component {
  render() {
    return (
      <div>
        TransactionList
        <Transaction />
      </div>
    );
  }
}
