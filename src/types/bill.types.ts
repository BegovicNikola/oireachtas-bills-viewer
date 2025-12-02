export type Bill = {
  bill: {
    billNo: string;
    billYear: string;
    billType: string;
    status: string;
    sponsors: Sponsor[];
    shortTitleEn: string;
    shortTitleGa: string;
    longTitleEn: string;
    longTitleGa: string;
  };
};

export type Sponsor = {
  sponsor: {
    as: { showAs: string | null };
    by?: { showAs: string | null } | null;
    isPrimary: boolean;
  };
};

export type ApiBillResponse = {
  head: {
    counts: {
      billCount: number;
      resultCount: number;
    };
  };
  results: Bill[];
};

export type BillStatus =
  | "Current"
  | "Withdrawn"
  | "Enacted"
  | "Rejected"
  | "Defeated"
  | "Lapsed";

export type BillsQueryParams = {
  skip?: number;
  limit?: number;
  bill_status?: BillStatus[];
  bill_source?: string[];
  bill_no?: string;
  bill_year?: string;
};

export type PaginationInfo = {
  currentPage: number; // 0-indexed
  pageSize: number;
  totalCount: number;
  totalPages: number; // calculated
};

export type BillTypeFilter = "all" | "Public" | "Private";

export type LanguageTab = "en" | "ga";

// export type TableView = "all" | "favourites";
