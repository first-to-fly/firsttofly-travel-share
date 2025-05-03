import { EntityType } from "../entities/entityType";
import { TermType } from "../entities/Settings/General/Term";


export const ENTITY_FIELD_TERM_TYPE = {
  [EntityType.USER]: {
    tourLeadingSkills: {
      termOID: TermType.TOUR_LEADING_SKILL,
    },
    languageSkills: {
      termOID: TermType.LANGUAGE_SKILL,
    },
  },
};
