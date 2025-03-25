import { z } from "zod";

import { EntityZ } from "../../entity";
import { EntityType } from "../../entityType";


export enum CounterType {
  SEQUENTIAL = "sequential",
  // Add other counter types as needed
}

export enum ResetCounterType {
  MONTHLY = "monthly",
  YEARLY = "yearly",
  NEVER = "never",
  // Add other reset types as needed
}

export enum ComponentType {
  NUMERIC = 1,
  DATE = 2,
  TEXT = 3,
  // Add other component types as needed
}

export const MenuZ = EntityZ.extend({
  entityType: z.literal(EntityType.MENU),

  moduleId: z.number(),
  name: z.string(),
  parentId: z.number().nullable(),
  seq: z.number(),
});

export type Menu = z.infer<typeof MenuZ>;

export const CounterZ = EntityZ.extend({
  entityType: z.literal(EntityType.COUNTER),

  moduleId: z.number(),
  name: z.string(),
  counterType: z.nativeEnum(CounterType),
  resetCounterType: z.nativeEnum(ResetCounterType),
  counterWidth: z.number(),
  template: z.string(),
  remarks: z.string().optional(),
});

export type Counter = z.infer<typeof CounterZ>;

export const CounterComponentZ = EntityZ.extend({
  entityType: z.literal(EntityType.COUNTER_COMPONENT),

  name: z.string(),
  code: z.string(),
  type: z.nativeEnum(ComponentType),
  seq: z.number(),
  description: z.string().optional(),
});

export type CounterComponent = z.infer<typeof CounterComponentZ>;

export const CounterComponentMappingZ = z.object({
  counterId: z.string(),
  componentId: z.string(),
});

export type CounterComponentMapping = z.infer<typeof CounterComponentMappingZ>;
