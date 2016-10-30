
declare namespace AdWordsScripts {

  interface AdWordsEntity {
    getEntityType(): string;
  }

  interface AdWordsIterator<T extends AdWordsEntity> {
    hasNext(): boolean;
    next(): T;
    totalNumEntities(): number;
  }

  interface AdWordsBasicSelector<T extends AdWordsEntity> {
    get(): AdWordsIterator<T>;
    withCondition(condition: string): AdWordsBasicSelector<T>;
    withIds(ids: number[]): AdWordsBasicSelector<T>;
  }

  interface AdWordsSelector<T extends AdWordsEntity> {
    forDateRange(dateRande: string): AdWordsSelector<T>;
    forDateRange(dateFrom: string, dateTo: string): AdWordsSelector<T>;
    get(): AdWordsIterator<T>;
    orderBy(orderBy: string): AdWordsSelector<T>;
    withCondition(condition: string): AdWordsSelector<T>;
    withIds(ids: number[]): AdWordsSelector<T>;
    withLimit(limit: number): AdWordsSelector<T>;
  }

  export module AdWordsApp {

    type ReportQueryOptions = {
      includeZeroImpressions?: boolean,
      returnMoneyInMicros?: boolean,
      apiVersion?: string,
      resolveGeoName?: string,
    };

    interface ReportColumnHeader {
      getBulkUploadColumnName(): string;
      getReportColumnName(): string;
    }

    interface ReportRow {
      formatForUpload(): Object;
    }

    interface ReportRowIterator {
      hasNext(): boolean;
      next(): ReportRow;
    }

    interface Report {
      exportToSheet(sheet: GoogleAppsScript.Spreadsheet.Sheet): void;
      getColumnHeader(awqlColumnName: string): ReportColumnHeader;
      rows(): ReportRowIterator;
    }

    interface AdWordsApp {
      report(query, options?: ReportQueryOptions): Report;
    }
  }

  export module MccApp {

    type AccountLabelSelector = AdWordsBasicSelector<AccountLabel>;

    interface AccountLabel extends AdWordsEntity {
      accounts(): ManagedAccountSelector;
      getId(): string;
      getName(): string;
      remove(): string;
      setName(name: string): void;
    }

    interface ManagedAccountStats {
      getClickConversionRate(): number;
      getClicks(): number;
      getConvertedClicks(): number;
      getCost(): number;
      getCtr(): number;
      getImpressions(): number;
    }

    interface ManagedAccount extends AdWordsEntity {
      applyLabel(name: string): void;
      getCurrencyCode(): string;
      getCustomerId(): string;
      getName(): string;
      getStatsFor(dateRange: string): ManagedAccountStats;
      getStatsFor(dateFrom: string, dateTo: string): ManagedAccountStats;
      getTimeZone(): string;
      labels(): AccountLabelSelector;
      removeLabel(name: string): void;
    }

    interface ManagedAccountSelector extends AdWordsSelector<ManagedAccount> {
      executeInParallel(functionName: string, optionalCallbackFunctionName?: string, optionalInput?: string): void;
      forDateRange(dateRande: string): ManagedAccountSelector;
      forDateRange(dateFrom: string, dateTo: string): ManagedAccountSelector;
      get(): AdWordsIterator<ManagedAccount>;
      orderBy(orderBy: string): ManagedAccountSelector;
      withCondition(condition: string): ManagedAccountSelector;
      withIds(ids: number[]): ManagedAccountSelector;
      withLimit(limit: number): ManagedAccountSelector;
    }

    interface MccApp {
      accountLabels(): AccountLabelSelector;
      accounts(): ManagedAccountSelector;
      createAccountLabel(name: string): void;
      select(account: ManagedAccount): void;
    }
  }
}

declare const AdWordsApp: AdWordsScripts.AdWordsApp.AdWordsApp;
declare const MccApp: AdWordsScripts.MccApp.MccApp;
