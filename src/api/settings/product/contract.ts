import { initContract } from "@ts-rest/core";

import { assembleLocationAirlinesContract } from "./assemble-location-airlines-contract";
import { badgeContract } from "./badge-contract";
import { costingItemContract } from "./costing-item-contract";
import { costingTemplateContract } from "./costing-template-contract";
import { depositContract } from "./deposit-contract";
import { discountContract } from "./discount-contract";
import { discountTemplateContract } from "./discount-template-contract";
import { insuranceDiscountContract } from "./insurance-discount-contract";
import { mealContract } from "./meal-contract";
import { roomConfigurationContract } from "./room-configuration-contract";
import { sectorContract } from "./sector-contract";
import { sectorGroupContract } from "./sector-group-contract";
import { specialInstructionContract } from "./special-instruction-contract";
import { tagContract } from "./tag-contract";
import { termConditionContract } from "./term-condition-contract";
import { usefulInfoContract } from "./useful-info-contract";


export const productSettingContract = initContract().router({
  badge: badgeContract,
  costingItem: costingItemContract,
  costingTemplate: costingTemplateContract,
  deposit: depositContract,
  meal: mealContract,
  roomConfiguration: roomConfigurationContract,
  insuranceDiscount: insuranceDiscountContract,
  sector: sectorContract,
  sectorGroup: sectorGroupContract,
  specialInstruction: specialInstructionContract,
  termCondition: termConditionContract,
  assembleLocationAirlines: assembleLocationAirlinesContract,
  usefulInfo: usefulInfoContract,
  tag: tagContract,
  discount: discountContract,
  discountTemplate: discountTemplateContract,
});
