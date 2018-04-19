import { Component } from "@angular/core";
import { MatDialog } from "@angular/material";
import { TransactionDialogComponent } from "../transaction-dialog/transaction-dialog.component";

import { DatabaseService } from "../../services/database.service";

@Component({
  selector: "app-transactions",
  templateUrl: "./transactions.component.html",
  styleUrls: ["./transactions.component.scss"]
})
export class TransactionsComponent {
  accounts: any[];
  tags: string[];

  _getList;
  _getObject;
  _setObject;
  _updateObject;
  _deleteObject;
  _getNewObject;
  constructor(private dialog: MatDialog, private storage: DatabaseService) {
    this.accounts = [
      { name: "Cash", id: "ibf3y0kuv4" },
      { name: "BoaBank", id: "w2dvndxoz7n" },
      { name: "Private", id: "tfcmw2vqfgk" }
    ];
    this.tags = [
      "Rent",
      "Restaurant",
      "Salary",
      "Groceries",
      "Entertainment",
      "Building"
    ];
  }

  getList() {
    this._getList = this.storage.getList("accounts");
  }

  getObject() {
    this._getObject = this.storage.getData("accounts", "-LACFMj8hJwpsOygBfJL");
  }

  setObject() {
    const accs = [
      {
        name: "Privat",
        balance: 500,
        type: "savings",
        currency: "EUR"
      },
      { name: "Cash", balance: 2000, type: "cash", currency: "UAH" }
    ];
    const trans = {
      desc: "trip",
      type: "-",
      amount: 1000,
      date: "2018-04-13",
      tagId: "-LACFMj8hJwpsOygBfJL",
      accountId: "-LACFMj8hJwpsOygBfJL"
    };
    const tag = { name: "transport" };
    this._setObject = this.storage.setData("account", accs[0]);
  }

  updateObject() {
    const acc = {
      id: "-LACFMj8hJwpsOygBfJL",
      name: "Private",
      balance: 1900,
      type: "savings",
      currency: "USD"
    };
    this._updateObject = this.storage.updateData("accounts", acc);
  }

  deleteObject() {
    this._deleteObject = this.storage.deleteData(
      "accounts",
      "-LACFMj8hJwpsOygBfJL"
    );
  }

  editTransaction() {
    console.log("editTransaction");
  }

  deleteTransaction() {
    console.log("deleteTransaction");
  }

  handleAddTransactionClick() {
    const addTransactionDialog = this.dialog.open(TransactionDialogComponent, {
      data: { action: "Add", accounts: this.accounts, tags: this.tags },
      minWidth: "50%"
    });
    addTransactionDialog
      .afterClosed()
      .subscribe(res => (res ? console.log(res) : null));
  }
}
