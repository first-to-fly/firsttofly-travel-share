import { initContract } from "@ts-rest/core";

import { badgeContract } from "./badge-contract";
import { costingItemContract } from "./costing-item-contract";
import { mealContract } from "./meal-contract";
import { productTypeContract } from "./product-type-contract";
import { roomConfigContract } from "./room-config-contract";
import { sectorContract } from "./sector-contract";
import { tagContract } from "./tag-contract";


export const productSettingContract = initContract().router({
  badge: badgeContract,
  costingItem: costingItemContract,
  meal: mealContract,
  productType: productTypeContract,
  roomConfig: roomConfigContract,
  sector: sectorContract,
  tag: tagContract,
});
