import { z } from "zod";

import { MultiLangRecordZ } from "../../../types/multipleLanguage";
import { EntityOIDZ, EntityZ } from "../../entity";
import { EntityType } from "../../entityType";

export const EmailTemplateKeyZ = z.enum([
  "payment.request",
  "user.invitation",
  "group-tour.booking.confirmation",
  "independent-tour.booking.confirmation",
  "independent-tour.booking.cancellation",
  "user-message.notification",
  "approval.notification",
  "approval.outcome",
  "approval.timeout-warning",
  "tour-departure.min-pax-alert",
  "customer.verification-otp",
  "customer.booking-link",
]);
export type EmailTemplateKey = z.infer<typeof EmailTemplateKeyZ>;

export const EmailTemplateZ = EntityZ.extend({
  entityType: z.literal(EntityType.EMAIL_TEMPLATE),
  tenantOID: EntityOIDZ.nullish(),
  key: EmailTemplateKeyZ,
  subjectTemplate: MultiLangRecordZ(z.string()),
  bodyTemplate: MultiLangRecordZ(z.string()),
  textTemplate: MultiLangRecordZ(z.string().nullish()),
});

export type EmailTemplate = z.infer<typeof EmailTemplateZ>;
