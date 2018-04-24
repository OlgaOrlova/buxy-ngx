import { Injectable } from "@angular/core";

@Injectable()
export class CurrencyUahService {
  convert(curr: string, amount: number) {
    if (curr === "$") {
      return amount * 27;
    }
    if (curr === "€") {
      return amount * 33;
    }
    return amount;
  }
}
