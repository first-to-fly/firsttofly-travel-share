import { initContract } from "@ts-rest/core";

import { supplierContractContract } from "../../supplier-contract-contract";
import { supplierProfileContract } from "../../supplier-profile-contract";
import { locationContract } from "./location-contract";
import { poiContract } from "./poi-contract";
import { privacyPolicyContract } from "./privacy-policy-contract";
import { referenceCodeContract } from "./reference-code-contract";
import { stationCodeContract } from "./station-code-contract";
import { tenantContract } from "./tenant-contract";
import { termContract } from "./term-contract";


export const generalSettingContract = initContract().router({
  location: locationContract,
  poi: poiContract,
  privacyPolicy: privacyPolicyContract,
  referenceCode: referenceCodeContract,
  stationCode: stationCodeContract,
  tenant: tenantContract,
  term: termContract,
  supplierProfile: supplierProfileContract,
  supplierContract: supplierContractContract,
});
