import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";

import { AccountDialogComponent } from "../account-dialog/account-dialog.component";
import { Account } from "../../models/account";

@Component({
  selector: "app-accounts",
  templateUrl: "./accounts.component.html",
  styleUrls: ["../../styles/drawer-menu.scss"]
})
export class AccountsComponent implements OnInit {
  accounts: Account[];

  constructor(private dialog: MatDialog) {}

  ngOnInit() {
    this.accounts = [
      {
        id: "id1",
        name: "Privat",
        balance: 500,
        type: "savings",
        currency: "EUR"
      },
      { id: "id2", name: "Cash", balance: 2000, type: "cash", currency: "UAH" }
    ];
  }

  handleAddAccountClick() {
    const addAccountDialog = this.dialog.open(AccountDialogComponent, {
      data: { action: "Add", accounts: this.accounts },
      minWidth: "50%"
    });
    addAccountDialog
      .afterClosed()
      .subscribe(res => (res ? console.log(res) : null));
  }

  deleteAccount(data) {
    console.log(`delete ${data}`);
  }

  editAccount() {
    console.log("editAccount");
  }
}
