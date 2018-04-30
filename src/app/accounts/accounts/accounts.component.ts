import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/combineLatest";

import { AccountDialogComponent } from "../account-dialog/account-dialog.component";

import { AccountsService } from "../../services/storage/accounts.service";
import { TransactionsService } from "../../services/storage/transactions.service";

interface ContentData {
  id: string;
  name: string;
  balance: number;
  currentBalance: number;
  type: string;
  currency: string;
}

@Component({
  selector: "app-accounts",
  templateUrl: "./accounts.component.html",
  styleUrls: ["../../styles/drawer-menu.scss"]
})
export class AccountsComponent implements OnInit {
  accounts: ContentData[];

  constructor(
    private dialog: MatDialog,
    private accountsService: AccountsService,
    private transactionsService: TransactionsService
  ) {
    this.accounts = [];
  }

  ngOnInit() {
    const accounts = this.accountsService.getList().map(res => res.reverse());
    const transactions = this.transactionsService.getList();
    Observable.combineLatest(
      accounts,
      transactions,
      (accounts, transactions) => {
        return {
          accounts: accounts,
          transactions: transactions
        };
      }
    ).subscribe(
      res => (this.accounts = this.createData(res.accounts, res.transactions))
    );
  }

  handleAddAccountClick() {
    const addAccountDialog = this.dialog.open(AccountDialogComponent, {
      data: {
        action: "Add",
        accounts: this.accounts
      },
      minWidth: "50%"
    });
    addAccountDialog.afterClosed().subscribe(res => {
      if (res) {
        this.accountsService.setData(res).subscribe();
      }
    });
  }

  private filterDeleteAccount(transactions, account, subscription) {
    transactions
      .filter(value => value.accountId === account.id)
      .forEach((value, index, array) => {
        this.transactionsService.deleteData(value.id).subscribe(res => {
          if (index === array.length - 1) {
            this.removeAccount(account, subscription);
          }
        });
      });
  }

  private removeAccount(account, subscription) {
    this.accountsService.deleteData(account.id).subscribe();
    subscription.unsubscribe();
  }

  deleteAccount(account) {
    const subscription = this.transactionsService
      .getList()
      .subscribe(transactions => {
        if (transactions.length > 0) {
          this.filterDeleteAccount(transactions, account, subscription);
        } else {
          this.removeAccount(account, subscription);
        }
      });
  }

  editAccount() {
    console.log("editAccount");
  }

  createData(accounts, transactions): ContentData[] {
    return accounts.map(item => {
      item.currentBalance = this.calculateBalance(item, transactions);
      return item;
    });
  }

  calculateBalance(account, transactions): number {
    let currentBalance = account.balance;
    const amount = transactions.reduce((amount, item) => {
      if (item.accountId === account.id) {
        amount += parseInt(item.type + item.amount);
      }
      return amount;
    }, 0);
    return currentBalance + amount;
  }
}
