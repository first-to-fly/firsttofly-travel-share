import { initContract } from "@ts-rest/core";

import { xeroBillContract } from "./xero-bill-contract";
import { xeroJournalContract } from "./xero-journal-contract";
import { xeroReferenceContract } from "./xero-reference-contract";
import { xeroStatusContract } from "./xero-status-contract";
import { xeroSyncContract } from "./xero-sync-contract";
import { xeroTransactionContract } from "./xero-transaction-contract";


export const xeroContract = initContract().router({
  bill: xeroBillContract,
  journal: xeroJournalContract,
  transaction: xeroTransactionContract,
  reference: xeroReferenceContract,
  status: xeroStatusContract,
  sync: xeroSyncContract,
});
