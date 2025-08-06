import { initContract } from "@ts-rest/core";

import { aviationStackContract } from "../../misc/aviationstack-contract";
import { approvalContract } from "./approval-contract";
import { locationContract } from "./location-contract";
import { mediaContract } from "./media-contract";
import { poiContract } from "./poi-contract";
import { privacyPolicyContract } from "./privacy-policy-contract";
import { referenceCodeContract } from "./reference-code-contract";
import { stationCodeContract } from "./station-code-contract";
import { tenantContract } from "./tenant-contract";
import { termContract } from "./term-contract";


export const generalSettingContract = initContract().router({
  approval: approvalContract,
  aviationstack: aviationStackContract,
  location: locationContract,
  poi: poiContract,
  privacyPolicy: privacyPolicyContract,
  referenceCode: referenceCodeContract,
  stationCode: stationCodeContract,
  tenant: tenantContract,
  term: termContract,
  media: mediaContract,
});
