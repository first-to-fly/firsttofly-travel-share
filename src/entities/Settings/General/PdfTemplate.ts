import { z } from "zod";

import { EntityOIDZ, EntityZ } from "../../entity";
import { EntityType } from "../../entityType";


export enum PdfTemplateKey {
  BOOKING_CONFIRMATION = "booking.confirmation",
  PAX_STATEMENT = "pax.statement",
}

export const PdfTemplateKeyZ = z.nativeEnum(PdfTemplateKey);

export enum PdfTemplateEvents {
  PDF_TEMPLATE_UPDATED = "PDF_TEMPLATE_UPDATED",
  PDF_TEMPLATE_LIST_UPDATED = "PDF_TEMPLATE_LIST_UPDATED",
}

export const PdfTemplateZ = EntityZ.extend({
  entityType: z.literal(EntityType.PDF_TEMPLATE),
  tenantOID: EntityOIDZ.nullish(),
  key: PdfTemplateKeyZ,
  template: z.string(),
});

export type PdfTemplate = z.infer<typeof PdfTemplateZ>;

export interface BookingConfirmationPdfContext extends Record<string, unknown> {
  tenantName: string;
  tenantAddress: string;
  tenantEmail: string;
  tenantPhoneNumber: string;
  customerName: string;
  customerEmail: string;
  bookingReference: string;
  bookingCreatedAt: string;
  tripStartDate: string;
  tripEndDate: string;
  travellerCount: number;
  totalCost: number;
  currency: string;
  itinerary: Array<{
    day: string;
    title: string;
    description: string;
  }>;
  notes?: string | null;
}

export interface PaxStatementPdfContext extends Record<string, unknown> {
  tenantName: string;
  tenantAddress: string;
  tenantEmail: string;
  tenantPhoneNumber: string;
  tenantLogoUrl?: string | null;

  bookingReference: string;
  productName: string;
  tourCode?: string | null;
  departureDate: string;
  returnDate?: string | null;
  bookingStatus: string;
  bookingCreatedAt: string;

  customerName: string;
  customerEmail?: string | null;
  customerPhoneNumber?: string | null;
  agentName?: string | null;

  options: {
    showPassportInfo: boolean;
    showCancelledPassengers: boolean;
    showExternalNotes: boolean;
    showPaymentHistory: boolean;
  };

  passengers: Array<{
    order: number;
    fullName: string;
    type: string;
    status: string;
    isCancelled?: boolean;
    passportNumber?: string | null;
    passportExpiry?: string | null;
    nationality?: string | null;
    dateOfBirth?: string | null;
    note?: string | null;
  }>;

  itinerary: Array<{
    dayLabel: string;
    date: string;
    title: string;
    description: string;
  }>;

  pricing: {
    currency: string;
    items: Array<{
      name: string;
      quantity: number;
      unitPrice: number;
      total: number;
      note?: string | null;
    }>;
    subtotal: number;
    discount?: number;
    surcharge?: number;
    tax?: number;
    totalCost: number;
    totalPaid: number;
    totalDue: number;
    notes?: string[] | null;
  };

  payments: Array<{
    date: string;
    reference: string;
    method: string;
    amount: number;
    receivedBy?: string | null;
    note?: string | null;
  }>;

  externalNotes?: string[] | null;
  qrCodeDataUrl?: string | null;

  generatedBy: string;
  generatedAt: string;
}

export interface PdfTemplateContextMap {
  [PdfTemplateKey.BOOKING_CONFIRMATION]: BookingConfirmationPdfContext;
  [PdfTemplateKey.PAX_STATEMENT]: PaxStatementPdfContext;
}
