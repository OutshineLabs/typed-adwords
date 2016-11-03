
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

  type AdWordsDate = {
    year: number,
    month: number,
    day: number
  };

  interface AdWordsSelector<T extends AdWordsEntity> {
    forDateRange(dateRande: string): AdWordsSelector<T>;
    forDateRange(dateFrom: string | AdWordsDate, dateTo: string | AdWordsDate): AdWordsSelector<T>;
    get(): AdWordsIterator<T>;
    orderBy(orderBy: string): AdWordsSelector<T>;
    withCondition(condition: string): AdWordsSelector<T>;
    withIds(ids: number[]): AdWordsSelector<T>;
    withLimit(limit: number): AdWordsSelector<T>;
  }

  interface AdWordsOperation<T extends AdWordsEntity> {
    getErrors(): string[];
    getResults(): T | null;
    isSuccessful(): boolean;
  }

  type DateRange =
      "TODAY"
    | "YESTERDAY"
    | "LAST_7_DAYS"
    | "THIS_WEEK_SUN_TODAY"
    | "LAST_WEEK"
    | "LAST_14_DAYS"
    | "LAST_30_DAYS"
    | "LAST_BUSINESS_WEEK"
    | "LAST_WEEK_SUN_SAT"
    | "THIS_MONTH"
    | "LAST_MONTH"
    | "ALL_TIME";

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

    type ExcludedKeyword = any;

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
      getStatsFor(dateFrom: string | AdWordsDate, dateTo: string | AdWordsDate): any;

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

    // TODO : Define Sitelink
    type Sitelink = any;

    // TODO : Define AdGroupBidding
    type AdGroupBidding = any;

    // TODO : Define AdGroupDevices
    type AdGroupDevices = any;

    // TODO : Define AdGroupExtensions
    type AdGroupExtensions = any;

    type Stats = any;

    type NegativeKeyword = any;

    type AdBuilderSpace = any;

    type KeywordBuilder = any;

    type AdGroupTargeting = any;

    type AdGroupUrls = any;

    interface AdGroup extends AdWordsEntity {
      adParams(): AdParamSelector;
      addCallout(calloutExtension: Callout): AdWordsOperation<Callout>;
      addMobileApp(mobileAppExtension: MobileApp): AdWordsOperation<MobileApp>;
      addPhoneNumber(phoneNumberExtension: PhoneNumber): AdWordsOperation<PhoneNumber>;
      addReview(reviewExtension: Review): AdWordsOperation<Review>;
      addSitelink(sitelinkExtension: Sitelink): AdWordsOperation<Sitelink>;
      ads(): AdWordsSelector<Ad>;
      applyLabel(label: string): void;
      bidding(): AdGroupBidding;
      createNegativeKeyword(keywordText): void;
      devices(): AdGroupDevices;
      display(): AdGroupDisplay;
      enable(): void;
      extensions(): AdGroupExtensions;
      getCampaign(): Campaign;
      getId(): number;
      getName(): string;
      getStatsFor(dateRange: string): Stats;
      getStatsFor(dateFrom: string | AdWordsDate, dateTo: string | AdWordsDate): Stats;
      isEnabled(): boolean;
      isPaused(): boolean;
      isRemoved(): boolean;
      keywords(): AdWordsSelector<Keyword>;
      negativeKeywords(): AdWordsSelector<NegativeKeyword>;
      newAd(): AdBuilderSpace;
      newKeywordBuilder(): KeywordBuilder;
      pause(): void;
      removeCallout(calloutExtension: Callout): void;
      removeLabel(label: string): void;
      removeMobileApp(mobileAppExtension: MobileApp): void;
      removePhoneNumber(phoneNumberExtension: PhoneNumber): void;
      removeReview(reviewExtension: Review): void;
      removeSitelink(sitelinkExtension: Sitelink): void;
      setName(name: string): void;
      targeting(): AdGroupTargeting;
      urls(): AdGroupUrls;
    }

    type DayOfWeek =
        "MONDAY"
      | "TUESDAY"
      | "WEDNESDAY"
      | "THURSDAY"
      | "FRIDAY"
      | "SATURDAY"
      | "SUNDAY";

    // TODO : Define AdSchedule interface
    type AdSchedule = any;

    type AdScheduleObject = {
      dayOfWeek: DayOfWeek,
      startHour: number,
      startMinute: number,
      endHour: number,
      endNumber: number,
      bidModifier?: number
    };

    // TODO : Define Callout interface
    type Callout = any;

    // TODO : Define ExcludedPlacementList
    type ExcludedPlacementList = any;

    // TODO : Define TargetedLocation interface
    type TargetedLocation = any;

    // TODO : Define ExcludedLocation interface
    type ExcludedLocation = any;

    type LocationObject = {
      id: number,
      bidModifier?: number
    };

    // TODO : Define MobileApp
    type MobileApp = any;

    // TODO : Define NegativeKeywordList
    type NegativeKeywordList = any;

    // TODO : Define PhoneNumber
    type PhoneNumber = any;

    // TODO : Define TargetedProximity
    type TargetedProximity = any;

    type RadiusUnits = "MILES" | "KILOMETERS";

    type AddressObject = {
      streetAddress?: string,
      streetAddress2?: string,
      cityName?: string,
      provinceName?: string,
      provinceCode?: string,
      postalCode?: string,
      countryCode?: string
    };

    type TargetedProximityObject = {
      latitude: number,
      longitude: number,
      radius: number,
      radiusUnits: RadiusUnits,
      bidModifier?: number,
      address?: AddressObject
    };

    type Audience = any;

    type ExcludedAudience = any;

    type Placement = any;

    type ExcludedPlacement = any;

    type PlacementBuilder = any;

    type Topic = any;

    type ExcludedTopic = any;

    type TopicBuilder = any;

    type AudienceBuilder = any;

    interface Display {
      audiences(): AdWordsSelector<Audience>;
      keywords(): AdWordsSelector<Keyword>;
      placements(): AdWordsSelector<Placement>;
      topics(): AdWordsSelector<Topic>;
    }

    interface ComplexDisplay extends Display {
      excludedAudiences(): AdWordsSelector<ExcludedAudience>;
      excludedKeywords(): AdWordsSelector<ExcludedKeyword>;
      excludedPlacements(): AdWordsSelector<ExcludedPlacement>;
      excludedTopics(): AdWordsSelector<ExcludedTopic>;
      newAudenceBuilder(): AudienceBuilder;
      newKeywordBuilder(): KeywordBuilder;
      newPlacementBuilder(): PlacementBuilder;
      newTopicBuilder(): TopicBuilder;
    }

    type CampaignDisplay = ComplexDisplay;

    type AdGroupDisplay = ComplexDisplay;

    // TODO : Define Review
    type Review = any;

    type ReviewOperation = AdWordsOperation<Review>;

    type CampaignBidding = any;

    type CampaignExtensions = any;

    type AdRotationType =
        "OPTIMIZE"
      | "CONVERSION_OPTIMIZE"
      | "ROTATE"
      | "ROTATE_FOREVER";

    type BiddingStrategyType =
        "MANUAL_CPC"
      | "MANUAL_CPM"
      | "BUDGET_OPTIMIZER"
      | "CONVERSION_OPTIMIZER"
      | "PERCENT_CPA";

    type Budget = any;

    type Label = any;

    type AdGroupBuilder = any;

    type CampaignTargeting = any;

    type CampaignUrls = any;

    interface Campaign extends AdWordsEntity {
      adGroups(): AdWordsSelector<AdGroup>;
      addAdSchedule(schedule: AdSchedule | AdScheduleObject): AdWordsOperation<AdSchedule>;
      addAdSchedule(
        dayOfWeek: DayOfWeek,
        startHour: number,
        startMinute: number,
        endHour: number,
        endMinute: number,
        bidModifier?: number): AdWordsOperation<AdSchedule>;
      addCallout(calloutExtension: Callout): AdWordsOperation<Callout>;
      addExcludedPlacementList(excludedPlacementList: ExcludedPlacementList): void;
      addLocation(location: number | TargetedLocation | ExcludedLocation | LocationObject): AdWordsOperation<TargetedLocation>;
      addLocation(locationId: number, bidModifier?: number): AdWordsOperation<TargetedLocation>;
      addMobileApp(mobileAppExtension: MobileApp): AdWordsOperation<MobileApp>;
      addNegativeKeywordList(negativeKeywordList: NegativeKeywordList): void;
      addPhoneNumber(phoneNumber: PhoneNumber): AdWordsOperation<PhoneNumber>;
      addProximity(proximity: TargetedProximity | TargetedProximityObject): AdWordsOperation<TargetedProximity>;
      addProximity(latitude: number, longitude: number, radius: number, radiusUnits: RadiusUnits, optArgs?: {
        bidModifier?: number,
        address?: AddressObject
      }): AdWordsOperation<TargetedProximity>;
      addReview(reviewExtension: Review): AdWordsOperation<Review>;
      addSitelink(sitelinkExtension: Sitelink): AdWordsOperation<Sitelink>;
      ads(): AdWordsSelector<Ad>;
      applyLabel(label: string): void;
      bidding(): CampaignBidding;
      createNegativeKeyword(keywordText: string): void;
      display(): CampaignDisplay;
      enable(): void;
      excludeLocation(locationOrId: number | TargetedLocation | ExcludedLocation | LocationObject): AdWordsOperation<ExcludedLocation>;
      excludedPlacementLists(): AdWordsSelector<ExcludedPlacementList>;
      extensions(): CampaignExtensions;
      getAdRotationType(): AdRotationType;
      getBiddingStategyType(): BiddingStrategyType;
      getBudget(): Budget;
      getEndDate(): AdWordsDate;
      getId(): number;
      getName(): string;
      getStartDate(): AdWordsDate;
      getStatsFor(dateRange: DateRange): Stats;
      getStatsFor(dateFrom: string| AdWordsDate, dateTo: string | AdWordsDate): Stats;
      isEnabled(): boolean;
      isPaused(): boolean;
      isRemoved(): boolean;
      keywords(): AdWordsSelector<Keyword>;
      labels(): AdWordsSelector<Label>;
      negativeKeywordLists(): AdWordsSelector<NegativeKeywordList>;
      negativeKeywords(): AdWordsSelector<NegativeKeyword>;
      newAdGroupBuilder(): AdGroupBuilder;
      pause(): void;
      removeCallout(calloutExtension: Callout): void;
      removeExcludedPlacementList(excludedPlacementList: ExcludedPlacementList): void;
      removeLabel(name: string): void;
      removeMobileApp(mobileAppExtension: MobileApp): void;
      removeNegativeKeywordList(negativeKeywordList: NegativeKeywordList): void;
      removePhoneNumber(phoneNumberExtension: PhoneNumber): void;
      removeReview(reviewExtension: Review): void;
      removeSitelink(sitelinkExtension: Sitelink): void;
      setAdRotationType(adRotationType: AdRotationType): void;
      setEndDate(endDate: string | AdWordsDate): void;
      setName(name: string): void;
      setStartDate(startDate: string | AdWordsDate): void;
      targeting(): CampaignTargeting;
      urls(): CampaignUrls;
    }

    interface AdWordsApp {
      adGroups(): AdWordsSelector<AdGroup>;
      ads(): AdWordsSelector<Ad>;
      campaigns(): AdWordsSelector<Campaign>;
      createLabel(name: string, description?: string, backgroundColor?: string): void;
      display(): Display;
      keywords(): AdWordsSelector<Keyword>;
      labels(): AdWordsSelector<Label>;
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
      getStatsFor(dateRange: DateRange): ManagedAccountStats;
      getStatsFor(dateFrom: string, dateTo: string): ManagedAccountStats;
      getTimeZone(): string;
      labels(): AccountLabelSelector;
      removeLabel(name: string): void;
    }

    interface ManagedAccountSelector extends AdWordsSelector<ManagedAccount> {
      executeInParallel(functionName: string, optionalCallbackFunctionName?: string, optionalInput?: string): void;
      forDateRange(dateRande: DateRange): ManagedAccountSelector;
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
