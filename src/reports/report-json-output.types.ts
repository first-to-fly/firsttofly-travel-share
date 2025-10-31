import type { ReportFormat } from "../entities/Operations/Report";


/**
 * Base JSON output structure for all reports
 */
export interface BaseReportJsonOutput<TMetadata = Record<string, unknown>> {
  report: {
    name: string;
    baseFormat: ReportFormat;
    generatedAt: string;
    sourceFileName: string;
    totalRows: number;
  };
  metadata?: TMetadata;
  tables: Array<{
    name: string;
    rows: string[][];
  }>;
}

/**
 * Generic report JSON output with no specific metadata
 */
export type GenericReportJsonOutput = BaseReportJsonOutput<Record<string, unknown>>;
