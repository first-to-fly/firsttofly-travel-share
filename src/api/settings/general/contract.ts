import { initContract } from "@ts-rest/core";

import { locationContract } from "./location-contract";
import { poiContract } from "./poi-contract";
import { privacyPolicyContract } from "./privacy-policy-contract";
import { referenceCodeContract } from "./reference-code-contract";
import { stationCodeContract } from "./station-code-contract";
import { tenantContract } from "./tenant-contract";


export const generalSettingContract = initContract().router({
  location: locationContract,
  poi: poiContract,
  privacyPolicy: privacyPolicyContract,
  referenceCode: referenceCodeContract,
  stationCode: stationCodeContract,
  tenantContract: tenantContract,
});
