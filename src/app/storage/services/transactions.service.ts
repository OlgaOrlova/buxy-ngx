import { Injectable } from "@angular/core";

import { DatabaseService } from "./database.service";
import { AbstractService } from "./abstract.service";

import { Transaction } from "../../interfaces/transaction.interface";

@Injectable()
export class TransactionsService extends AbstractService<Transaction> {
  constructor(db: DatabaseService) {
    super(db);
  }

  getDataType(): string {
    return "transactions";
  }
}
