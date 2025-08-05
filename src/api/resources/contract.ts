import { initContract } from "@ts-rest/core";

import { mediaContract } from "./media-contract";


export const resourcesContract = initContract().router({
  media: mediaContract,
});
