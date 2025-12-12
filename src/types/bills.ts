export interface Act {
  actNo: string;
  actYear: string;
  dateSigned: string;
  longTitleEn: string | null;
  longTitleGa: string | null;
  shortTitleEn: string;
  shortTitleGa: string;
  statutebookURI: string;
  uri: string;
}

export interface Sponsor {
  sponsor: {
    as: {
      showAs: string | null;
      uri: string | null;
    };
    by?: {
      showAs: string | null;
      uri: string | null;
    } | null;
    isPrimary: boolean | null;
  };
}

// TODO: Add other properties as needed
// originHouse
// debates
// stages
// mostRecentStage
// events
// relatedDocs

// TODO: In NextJS version of the app use billSort & contextDate properties

export interface Bill {
  act: Act | null;
  billNo: string;
  billType: string;
  billYear: string;
  lastUpdated: string;
  longTitleEn: string | null;
  longTitleGa: string | null;
  method: string;
  shortTitleEn: string;
  shortTitleGa: string;
  source: string;
  sponsors: Sponsor[] | null;
  status: string;
  uri: string;
}

// Raw API response structure (before mapping)
export interface RawApiBillResponse {
  head: {
    counts: {
      billCount: number;
      resultCount: number;
    };
  };
  results: Array<{
    bill: Bill;
  }>;
}

export interface ApiBillResponse {
  head: {
    counts: {
      billCount: number;
      resultCount: number;
    };
  };
  results: Bill[];
}

export const BILL_STATUS = [
  "Current",
  "Withdrawn",
  "Enacted",
  "Rejected",
  "Defeated",
  "Lapsed",
] as const;
export type BillStatus = (typeof BILL_STATUS)[number];

export const BILL_SOURCE = ["Government", "Private Member"] as const;
export type BillSource = (typeof BILL_SOURCE)[number];

export interface ApiBillQueryParams {
  skip: number;
  limit: number;
  bill_status?: BillStatus[];
  bill_source?: string[];
  bill_year?: string;
}
