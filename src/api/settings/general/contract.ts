import { initContract } from "@ts-rest/core";

import { aviationStackContract } from "../../misc/aviationstack-contract";
import { accountCodeContract } from "./account-code-contract";
import { approvalContract } from "./approval-contract";
import { locationContract } from "./location-contract";
import { mediaContract } from "./media-contract";
import { paymentWayContract } from "./payment-way-contract";
import { poiContract } from "./poi-contract";
import { privacyPolicyContract } from "./privacy-policy-contract";
import { referenceCodeContract } from "./reference-code-contract";
import { stationCodeContract } from "./station-code-contract";
import { tenantConfigContract } from "./tenant-config-contract";
import { tenantContract } from "./tenant-contract";
import { termContract } from "./term-contract";
import { emailTemplateContract } from "./email-template-contract";


export const generalSettingContract = initContract().router({
  accountCode: accountCodeContract,
  approval: approvalContract,
  aviationstack: aviationStackContract,
  location: locationContract,
  paymentWay: paymentWayContract,
  poi: poiContract,
  privacyPolicy: privacyPolicyContract,
  referenceCode: referenceCodeContract,
  stationCode: stationCodeContract,
  tenant: tenantContract,
  tenantConfig: tenantConfigContract,
  term: termContract,
  media: mediaContract,
  emailTemplate: emailTemplateContract,
});
