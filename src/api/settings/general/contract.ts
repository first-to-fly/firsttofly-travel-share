import { initContract } from "@ts-rest/core";

import { locationContract } from "./location-contract";
import { privacyPolicyContract } from "./privacy-policy-contract";
import { stationCodeContract } from "./station-code-contract";
import { tenantContract } from "./tenant-contract";


export const generalSettingContract = initContract().router({
  location: locationContract,
  privacyPolicy: privacyPolicyContract,
  stationCode: stationCodeContract,
  tenantContract: tenantContract,
});
