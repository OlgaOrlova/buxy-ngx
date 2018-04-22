import { AfterContentInit, Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";

import { AccountDialogComponent } from "../account-dialog/account-dialog.component";
import { Account } from "../../interfaces/account";
import { AccountsService } from "../../services/accounts.service";

@Component({
  selector: "app-accounts",
  templateUrl: "./accounts.component.html",
  styleUrls: ["../../styles/drawer-menu.scss"]
})
export class AccountsComponent implements AfterContentInit {
  accounts: Account[];

  constructor(private dialog: MatDialog, private database: AccountsService) {
    this.accounts = [];
  }

  ngAfterContentInit() {
    this.database.getAll().subscribe(
      result => {
        this.accounts = (result as Account[]).reverse();
      },
      error => {
        console.log(error);
      }
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
    addAccountDialog
      .afterClosed()
      .flatMap(res => {
        return this.database.set(res);
      })
      .flatMap(() => {
        return this.database.getAll();
      })
      .subscribe(result => {
        this.accounts = (result as Account[]).reverse();
      });
  }

  deleteAccount(data) {
    console.log(`delete ${data}`);
  }

  editAccount() {
    console.log("editAccount");
  }
}
