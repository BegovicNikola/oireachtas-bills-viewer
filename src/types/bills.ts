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
  bill: {
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
  };
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

export type BillStatus =
  | "Current"
  | "Withdrawn"
  | "Enacted"
  | "Rejected"
  | "Defeated"
  | "Lapsed";

export type BillSource = "Government" | "Private Member";

export interface ApiBillQueryParams {
  skip?: number;
  limit?: number;
  bill_status?: BillStatus[];
  bill_source?: string[];
  bill_year?: string;
}
