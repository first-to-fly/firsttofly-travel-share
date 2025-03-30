import { initContract } from "@ts-rest/core";

import { badgeContract } from "./badge-contract";
import { costingItemContract } from "./costing-item-contract";
import { costingTemplateContract } from "./costing-template-contract";
import { insuranceDiscountContract } from "./insurance-discount-contract";
import { mealContract } from "./meal-contract";
import { productTypeContract } from "./product-type-contract";
import { roomConfigContract } from "./room-config-contract";
import { sectorContract } from "./sector-contract";
import { sectorGroupContract } from "./sector-group-contract";
import { specialInstructionContract } from "./special-instruction-contract";
import { tagContract } from "./tag-contract";
import { termConditionContract } from "./term-condition-contract";


export const productSettingContract = initContract().router({
  badge: badgeContract,
  costingItem: costingItemContract,
  costingTemplate: costingTemplateContract,
  meal: mealContract,
  productType: productTypeContract,
  roomConfig: roomConfigContract,
  insuranceDiscount: insuranceDiscountContract,
  sector: sectorContract,
  sectorGroup: sectorGroupContract,
  specialInstruction: specialInstructionContract,
  termCondition: termConditionContract,
  tag: tagContract,
});
