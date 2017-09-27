import React, {PureComponent} from 'react';
import { connect } from 'react-redux';
import { map, filter, omit } from 'lodash';
import { Link } from 'react-router'

import { createAccount, hideAccount, restoreAccount, deleteAccount } from '../actions/accounts';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Paper from 'material-ui/Paper';
import Toggle from 'material-ui/Toggle';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

const MainMenu = (props) => (
  <IconMenu
    iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
    targetOrigin={{horizontal: 'right', vertical: 'top'}}
    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
    iconStyle={{fill: 'white'}}>
    <MenuItem containerElement={<Link to="/account-form" />} primaryText="Create account" />
    <MenuItem primaryText="Reconcile" />
    <MenuItem containerElement={<Link to="/transactions" />} primaryText="Display transactions" />
  </IconMenu>
);

class AccountMenu extends PureComponent {
  constructor (props) {
    super(props);

    this.state = {
      showModal: false
    };
  }

  toggleDeletAccountModal = () => {
    this.setState({showModal: !this.state.showModal});
  }

  render() {
    const {accountId, hidden, restoreAccountAction, hideAccountAction, deleteAccountAction} = this.props;
    const actions = [
      <FlatButton
        label="Cancel"
        primary
        onClick={this.toggleDeletAccountModal}
      />,
      <FlatButton
        label="Ok"
        primary
        onClick={() => deleteAccountAction(accountId)}
      />
    ];

    return (
      <div>
        <IconMenu
          iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
          targetOrigin={{horizontal: 'right', vertical: 'top'}}
          anchorOrigin={{horizontal: 'right', vertical: 'top'}}>
          <MenuItem containerElement={<Link to={`/account-form/${accountId}`} />} primaryText="Edit" />
          {hidden ?
            <MenuItem onClick={() => restoreAccountAction(accountId)} primaryText="Restore" /> :
            <MenuItem onClick={() => hideAccountAction(accountId)} primaryText="Hide" />}
          <MenuItem onClick={this.toggleDeletAccountModal} primaryText="Delete" />
        </IconMenu>
        <Dialog
          title="Warning"
          actions={actions}
          modal={true}
          open={this.state.showModal}>
          Are you sure you want to delete the account and all relative transactions?
        </Dialog>
      </div>
    );
  }
}

const Account = ({id, name, balance, hidden, restoreAccountAction, hideAccountAction, deleteAccountAction}) => {
  return (
    <Paper className="account-list-account" zDepth={2}>
      <Link to={{ pathname: '/transaction-form', search: `?accountId=${id}` }}>
        <div>
          <span>{`${name}: `}</span>
          <span className={balance < 0 ? 'negative-number' : ''}>{`${balance} €`}</span>
        </div>
      </Link>
      <AccountMenu
        accountId={id}
        hidden={hidden}
        restoreAccountAction={restoreAccountAction}
        hideAccountAction={hideAccountAction}
        deleteAccountAction={deleteAccountAction} />
    </Paper>
  );
};

@connect(
  state => ({
    accounts: omit(state.accounts, 'ADMIN'),
    totalBalance: state.balances.total
  }),
  {
    createAccountAction: createAccount,
    restoreAccountAction: restoreAccount,
    hideAccountAction: hideAccount,
    deleteAccountAction: deleteAccount
  }
)
export default class AccountList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      showHiddenAccounts: false
    }
  }

  toggleShowHiddenAccounts = () => {
    this.setState({showHiddenAccounts: !this.state.showHiddenAccounts});
  }

  render() {
    const {totalBalance, accounts, restoreAccountAction, hideAccountAction, deleteAccountAction} = this.props;
    const {showHiddenAccounts} = this.state;

    const visibleAccounts = filter(accounts, account => account.hidden === showHiddenAccounts);
    return (
      <div>
        <AppBar
          title={`Balance: ${totalBalance} €`}
          showMenuIconButton={false}
          iconElementRight={<MainMenu />}
        />
        <div>
          {map(visibleAccounts, account => <Account
            key={account.id}
            id={account.id}
            name={account.name}
            balance={account.balance}
            hidden={account.hidden}
            restoreAccountAction={restoreAccountAction}
            hideAccountAction={hideAccountAction}
            deleteAccountAction={deleteAccountAction} />)}
        </div>
        <Toggle
          className="show-hidden-accounts"
          label="Hidden accounts"
          toggled={this.state.showHiddenAccounts}
          onToggle={this.toggleShowHiddenAccounts} />
      </div>
    );
  }
}
