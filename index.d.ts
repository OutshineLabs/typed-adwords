
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

  type AdWordsDateObject = {
    year: string,
    month: string,
    day: string
  };

  interface AdWordsSelector<T extends AdWordsEntity> {
    forDateRange(dateRande: string): AdWordsSelector<T>;
    forDateRange(dateFrom: string | AdWordsDateObject, dateTo: string | AdWordsDateObject): AdWordsSelector<T>;
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

    interface OwnedByCampaign {
      getCampaign(): Campaign;
    }

    interface OwnedByAdGroup {
      getAdGroup(): AdGroup;
    }

    interface Keyword extends AdWordsEntity {
      // TODO : Complete the Keyword interface
    }

    interface AdParam extends AdWordsEntity {
      getAdGroup(): AdGroup;
      getIndex(): number;
      getInsertionText(): string;
      getKeyword(): Keyword;
      remove(): void;
      setInsertionText(insertionText: string): void;
    }

    interface AdParamSelector {
      get(): AdWordsIterator<AdParam>;
    }

    type ApprovalStatus =
        "APPROVED"
      | "DISAPPROVED"
      | "FAMILY_SAFE"
      | "NON_FAMILY_SAFE"
      | "PORN"
      | "UNCHECKED";

    type AdType =
        "EXPANDED_TEXT_AD"
      | "IMAGE_AD"
      | "MOBILE_AD"
      | "MOBILE_IMAGE_AD"
      | "PRODUCT_AD"
      | "RICH_MEDIA_AD"
      | "TEMPLATE_AD"
      | "TEXT_AD";

    interface Ad extends AdWordsEntity {
      /**
       * Applies a label to the ad. name of the label is case-sensitive. Operation will fail if the
       * label with the specified name does not already exist in the account.
       *
       * Note that the ad cannot not have more than 50 labels.
       */
      applyLabel(label: string): void;

      // FIXME : This should return an AdViewSpace
      asType(): any;

      enable(): void;
      getAdGroup(): AdGroup;
      getAprovalStatus(): ApprovalStatus;
      getCampaign(): Campaign;
      getDescription1(): string;
      getDescription2(): string;
      getDisapprovalReasons(): string[];
      getDisplayUrl(): string;
      getHeadline(): string;
      getId(): number;

      // FIXME : Should return a Stats object.
      getStatsFor(dateRange: string): any;
      getStatsFor(dateFrom: string | AdWordsDateObject, dateTo: string | AdWordsDateObject): any;

      getType(): AdType;
      isEnabled(): boolean;
      isMobilePreferred(): boolean;
      isPaused(): boolean;

      // FIXME : This should return an AdTypeSpace
      isType(): any;

      // FIXME : This should return an AdWordsSelector<Label>
      labels(): AdWordsSelector<any>;

      pause(): void;
      remove(): void;
      removeLabel(label: string): void;

      // FIXME : This should return AdUrls
      urls(): any;
    }

    interface AdGroup extends AdWordsEntity {
      adParams(): AdParamSelector;

      // FIXME : This should take a CalloutExtension and return a CalloutOperation
      addCallout(calloutExtension: any): any;
      // FIXME : This should take a MobileAppExtension and return a MobileApp
      addMobileApp(mobileAppExtension: any): any;
      // FIXME : This should take a PhoneNumberExtension and return a PhoneNumber
      addPhoneNumber(phoneNumberExtension: any): any;
      // FIXME : This should take a ReviewExtension and return a Review
      addReview(reviewExtension: any): any;
      // FIXME : This should take a SitelinkExtension and return a SitelinkOperation
      addSitelink(sitelinkExtension: any): any;

      ads(): AdWordsSelector<Ad>;
      applyLabel(label: string): void;

      // FIXME : This should return AdGroupBidding
      bidding(): any;

      createNegativeKeyword(keywordText): void;

      // FIXME : This should return AdGroupDevices
      devices(): any;
      // FIXME : This should return AdGroupDisplay
      display(): any;

      enable(): void;

      // FIXME : This should return AdGroupExtensions
      extensions(): any;

      getCampaign(): Campaign;
      getId(): number;
      getName(): string;

      // FIXME : These should return Stats
      getStatsFor(dateRange: string): any;
      getStatsFor(dateFrom: string | AdWordsDateObject, dateTo: string | AdWordsDateObject): any;

      isEnabled(): boolean;
      isPaused(): boolean;
      isRemoved(): boolean;
      keywords(): AdWordsSelector<Keyword>;

      // FIXME : This should return a AdWordsSelector<NegativeKeyword>
      negativeKeywords(): any;
      // FIXME : This should return an AdBuilderSpace
      newAd(): any;
      // FIXME: This should return a KeywordBuilder
      newKeywordBuilder(): any;

      pause(): void;

      // FIXME : This should take a CalloutExtension and return a Callout
      removeCallout(calloutExtension: any): any;

      removeLabel(label: string): void;

      // FIXME : This should take a MobileAppExtension and return a MobileApp
      removeMobileApp(mobileAppExtension: any): any;
      // FIXME : This should take a PhoneNumberExtension and return a PhoneNumber
      removePhoneNumber(phoneNumberExtension: any): any;
      // FIXME : This should take a ReviewExtension and return a Review
      removeReview(reviewExtension: any): any;
      // FIXME : This should take a SitelinkExtension and return a SitelinkOperation
      removeSitelink(sitelinkExtension: any): any;

      setName(name: string): void;

      // FIXME : This should return AdGroupTargeting
      targeting(): any;
      // FIXME : This should return AdGroupUrls
      urls(): any;
    }

    interface Campaign extends AdWordsEntity {
      adGroups(): AdWordsSelector<AdGroup>;
      ads(): AdWordsSelector<Ad>;
    }

    interface AdWordsApp {
      campaigns(): AdWordsSelector<Campaign>;
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
