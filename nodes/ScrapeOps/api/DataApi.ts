import {
  IExecuteFunctions,
  NodeOperationError,
  IHttpRequestMethods,
  IRequestOptions,
  INodeProperties,
} from 'n8n-workflow';
import {
  IAmazonApiOptions,
  IWalmartApiOptions,
  IIndeedApiOptions,
  IRedfinApiOptions,
  IScrapeOpsApiOptions,
} from './types';

const API_BASE_URL = 'https://proxy.scrapeops.io/v1';

export class DataApi {
  static getNodeProperties(): INodeProperties[] {
    return [
      {
        displayName: 'Domain',
        name: 'dataDomain',
        type: 'options',
        displayOptions: {
          show: {
            apiType: ['dataApi'],
          },
        },
        options: [
          { name: 'Amazon', value: 'amazon' },
          { name: 'eBay', value: 'ebay' },
          { name: 'Walmart', value: 'walmart' },
          { name: 'Indeed', value: 'indeed' },
          { name: 'Redfin', value: 'redfin' },
        ],
        default: 'amazon',
        description: 'Domain data to retrieve',
      },

      //
      // Amazon configuration
      //
      {
        displayName: 'Amazon API Type',
        name: 'amazonApiType',
        type: 'options',
        displayOptions: {
          show: {
            apiType: ['dataApi'],
            dataDomain: ['amazon'],
          },
        },
        options: [
          {
            name: 'Product API',
            value: 'product',
            description: 'Get data for a specific Amazon product by ASIN or URL',
          },
          {
            name: 'Product Search API',
            value: 'search',
            description: 'Search for Amazon products by keyword or URL',
          },
        ],
        default: 'product',
        description: 'Type of Amazon API to use',
      },
      {
        displayName: 'Input Type',
        name: 'amazonProductInputType',
        type: 'options',
        displayOptions: {
          show: {
            apiType: ['dataApi'],
            dataDomain: ['amazon'],
            amazonApiType: ['product'],
          },
        },
        options: [
          {
            name: 'ASIN',
            value: 'asin',
            description: 'Amazon Standard Identification Number',
          },
          {
            name: 'URL',
            value: 'url',
            description: 'Full Amazon product URL',
          },
        ],
        default: 'url',
        description: 'Type of input for Amazon Product API',
      },
      {
        displayName: 'ASIN',
        name: 'amazonProductAsin',
        type: 'string',
        displayOptions: {
          show: {
            apiType: ['dataApi'],
            dataDomain: ['amazon'],
            amazonApiType: ['product'],
            amazonProductInputType: ['asin'],
          },
        },
        default: '',
        required: true,
        description: 'Amazon Standard Identification Number of the product',
      },
      {
        displayName: 'Product URL',
        name: 'amazonProductUrl',
        type: 'string',
        displayOptions: {
          show: {
            apiType: ['dataApi'],
            dataDomain: ['amazon'],
            amazonApiType: ['product'],
            amazonProductInputType: ['url'],
          },
        },
        default: '',
        required: true,
        description: 'Full URL of the Amazon product page',
      },
      {
        displayName: 'Input Type',
        name: 'amazonSearchInputType',
        type: 'options',
        displayOptions: {
          show: {
            apiType: ['dataApi'],
            dataDomain: ['amazon'],
            amazonApiType: ['search'],
          },
        },
        options: [
          {
            name: 'Query',
            value: 'query',
            description: 'Search query for Amazon products',
          },
          {
            name: 'URL',
            value: 'url',
            description: 'Full Amazon search URL',
          },
        ],
        default: 'url',
        description: 'Type of input for Amazon Product Search API',
      },
      {
        displayName: 'Search Query',
        name: 'amazonSearchQuery',
        type: 'string',
        displayOptions: {
          show: {
            apiType: ['dataApi'],
            dataDomain: ['amazon'],
            amazonApiType: ['search'],
            amazonSearchInputType: ['query'],
          },
        },
        default: '',
        required: true,
        description: 'Search query for Amazon products',
      },
      {
        displayName: 'Search URL',
        name: 'amazonSearchUrl',
        type: 'string',
        displayOptions: {
          show: {
            apiType: ['dataApi'],
            dataDomain: ['amazon'],
            amazonApiType: ['search'],
            amazonSearchInputType: ['url'],
          },
        },
        default: '',
        required: true,
        description: 'Full URL of the Amazon search page',
      },
      {
        displayName: 'Advanced Options',
        name: 'amazonApiOptions',
        type: 'collection',
        placeholder: 'Add Option',
        displayOptions: {
          show: {
            apiType: ['dataApi'],
            dataDomain: ['amazon'],
          },
        },
        default: {},
        description: 'Advanced options for Amazon API',
        options: [
          {
            displayName: 'Country',
            name: 'country',
            type: 'string',
            default: 'us',
            description:
              'The 2 letter country code to scrape data from (e.g., us, uk, ca, de, fr)',
          },
          {
            displayName: 'TLD (Top Level Domain)',
            name: 'tld',
            type: 'options',
            options: [
              { name: '.AE (UAE)', value: 'ae' },
              { name: '.CA (Canada)', value: 'ca' },
              { name: '.CO.JP (Japan)', value: 'co.jp' },
              { name: '.CO.UK (UK)', value: 'co.uk' },
              { name: '.COM (US)', value: 'com' },
              { name: '.COM.AU (Australia)', value: 'com.au' },
              { name: '.COM.BR (Brazil)', value: 'com.br' },
              { name: '.COM.MX (Mexico)', value: 'com.mx' },
              { name: '.COM.TR (Turkey)', value: 'com.tr' },
              { name: '.DE (Germany)', value: 'de' },
              { name: '.ES (Spain)', value: 'es' },
              { name: '.FR (France)', value: 'fr' },
              { name: '.IN (India)', value: 'in' },
              { name: '.IT (Italy)', value: 'it' },
              { name: '.NL (Netherlands)', value: 'nl' },
              { name: '.PL (Poland)', value: 'pl' },
              { name: '.RO (Romania)', value: 'ro' },
              { name: '.SA (Saudi Arabia)', value: 'sa' },
            ],
            default: 'com',
            description: 'The Amazon domain to scrape from',
          },
        ],
      },

      //
      // eBay configuration
      //
      {
        displayName: 'eBay API Type',
        name: 'ebayApiType',
        type: 'options',
        displayOptions: {
          show: {
            apiType: ['dataApi'],
            dataDomain: ['ebay'],
          },
        },
        options: [
          {
            name: 'Product API',
            value: 'product',
            description: 'Retrieve structured data for a specific eBay listing',
          },
          {
            name: 'Search API',
            value: 'search',
            description: 'Retrieve structured search results for an eBay keyword or URL',
          },
          {
            name: 'Feedback API',
            value: 'feedback',
            description: 'Retrieve seller or buyer feedback data from eBay profiles',
          },
          {
            name: 'Category API',
            value: 'category',
            description: 'Retrieve structured product listings from eBay category pages',
          },
          {
            name: 'Store API',
            value: 'store',
            description: 'Retrieve structured data from eBay storefronts by name or URL',
          },
        ],
        default: 'product',
        description: 'Type of eBay API to use',
      },
      {
        displayName: 'Input Type',
        name: 'ebayProductInputType',
        type: 'options',
        displayOptions: {
          show: {
            apiType: ['dataApi'],
            dataDomain: ['ebay'],
            ebayApiType: ['product'],
          },
        },
        options: [
          {
            name: 'Item ID',
            value: 'itemId',
            description: 'Unique eBay item ID (e.g. 155616449358)',
          },
          {
            name: 'Product URL',
            value: 'url',
            description: 'Full eBay product URL (encoded if necessary)',
          },
        ],
        default: 'url',
        description: 'Type of input for the eBay Product API request',
      },
      {
        displayName: 'Item ID',
        name: 'ebayProductItemId',
        type: 'string',
        displayOptions: {
          show: {
            apiType: ['dataApi'],
            dataDomain: ['ebay'],
            ebayApiType: ['product'],
            ebayProductInputType: ['itemId'],
          },
        },
        default: '',
        required: true,
        description: 'eBay item ID for the product you want to retrieve',
      },
      {
        displayName: 'Product URL',
        name: 'ebayProductUrl',
        type: 'string',
        displayOptions: {
          show: {
            apiType: ['dataApi'],
            dataDomain: ['ebay'],
            ebayApiType: ['product'],
            ebayProductInputType: ['url'],
          },
        },
        default: '',
        required: true,
        description: 'Full eBay product URL (remember to URL encode before sending)',
      },
      {
        displayName: 'Input Type',
        name: 'ebaySearchInputType',
        type: 'options',
        displayOptions: {
          show: {
            apiType: ['dataApi'],
            dataDomain: ['ebay'],
            ebayApiType: ['search'],
          },
        },
        options: [
          {
            name: 'Query',
            value: 'query',
            description: 'Keyword or phrase to search for on eBay',
          },
          {
            name: 'Search URL',
            value: 'url',
            description: 'Full eBay search results URL (URL encode before sending)',
          },
        ],
        default: 'url',
        description: 'Type of input for the eBay Search API request',
      },
      {
        displayName: 'Search Query',
        name: 'ebaySearchQuery',
        type: 'string',
        displayOptions: {
          show: {
            apiType: ['dataApi'],
            dataDomain: ['ebay'],
            ebayApiType: ['search'],
            ebaySearchInputType: ['query'],
          },
        },
        default: '',
        required: true,
        description: 'Keyword or phrase to search for on eBay (e.g., laptop, sneakers)',
      },
      {
        displayName: 'Search URL',
        name: 'ebaySearchUrl',
        type: 'string',
        displayOptions: {
          show: {
            apiType: ['dataApi'],
            dataDomain: ['ebay'],
            ebayApiType: ['search'],
            ebaySearchInputType: ['url'],
          },
        },
        default: '',
        required: true,
        description: 'Full eBay search page URL (remember to URL encode before sending)',
      },
      {
        displayName: 'Input Type',
        name: 'ebayFeedbackInputType',
        type: 'options',
        displayOptions: {
          show: {
            apiType: ['dataApi'],
            dataDomain: ['ebay'],
            ebayApiType: ['feedback'],
          },
        },
        options: [
          {
            name: 'Username',
            value: 'username',
            description: 'eBay username whose feedback page should be scraped',
          },
          {
            name: 'Feedback URL',
            value: 'url',
            description: 'Full eBay feedback page URL (URL encode before sending)',
          },
        ],
        default: 'url',
        description: 'Type of input for the eBay Feedback API request',
      },
      {
        displayName: 'Username',
        name: 'ebayFeedbackUsername',
        type: 'string',
        displayOptions: {
          show: {
            apiType: ['dataApi'],
            dataDomain: ['ebay'],
            ebayApiType: ['feedback'],
            ebayFeedbackInputType: ['username'],
          },
        },
        default: '',
        required: true,
        description: 'Exact eBay username to retrieve feedback for',
      },
      {
        displayName: 'Feedback URL',
        name: 'ebayFeedbackUrl',
        type: 'string',
        displayOptions: {
          show: {
            apiType: ['dataApi'],
            dataDomain: ['ebay'],
            ebayApiType: ['feedback'],
            ebayFeedbackInputType: ['url'],
          },
        },
        default: '',
        required: true,
        description: 'Full eBay feedback page URL (remember to URL encode before sending)',
      },
      {
        displayName: 'Input Type',
        name: 'ebayCategoryInputType',
        type: 'options',
        displayOptions: {
          show: {
            apiType: ['dataApi'],
            dataDomain: ['ebay'],
            ebayApiType: ['category'],
          },
        },
        options: [
          {
            name: 'Category ID',
            value: 'categoryId',
            description:
              'eBay numeric category ID (e.g. 1648276). The ID after bn_ in the URL (https://www.ebay.com/b/Laptops/bn_1648276) is 1648276',
          },
          {
            name: 'Category URL',
            value: 'url',
            description: 'Full eBay category page URL (URL encode before sending)',
          },
        ],
        default: 'url',
        description: 'Type of input for the eBay Category API request',
      },
      {
        displayName: 'Category ID',
        name: 'ebayCategoryId',
        type: 'string',
        displayOptions: {
          show: {
            apiType: ['dataApi'],
            dataDomain: ['ebay'],
            ebayApiType: ['category'],
            ebayCategoryInputType: ['categoryId'],
          },
        },
        default: '',
        required: true,
        description: 'The eBay category identifier you want to scrape',
      },
      {
        displayName: 'Category URL',
        name: 'ebayCategoryUrl',
        type: 'string',
        displayOptions: {
          show: {
            apiType: ['dataApi'],
            dataDomain: ['ebay'],
            ebayApiType: ['category'],
            ebayCategoryInputType: ['url'],
          },
        },
        default: '',
        required: true,
        description: 'Full eBay category page URL (remember to URL encode before sending)',
      },
      {
        displayName: 'Input Type',
        name: 'ebayStoreInputType',
        type: 'options',
        displayOptions: {
          show: {
            apiType: ['dataApi'],
            dataDomain: ['ebay'],
            ebayApiType: ['store'],
          },
        },
        options: [
          {
            name: 'Store Name',
            value: 'storeName',
            description: 'Public-facing eBay store name (e.g. mystore)',
          },
          {
            name: 'Store URL',
            value: 'url',
            description: 'Full eBay store URL (URL encode before sending)',
          },
        ],
        default: 'url',
        description: 'Type of input for the eBay Store API request',
      },
      {
        displayName: 'Store Name',
        name: 'ebayStoreName',
        type: 'string',
        displayOptions: {
          show: {
            apiType: ['dataApi'],
            dataDomain: ['ebay'],
            ebayApiType: ['store'],
            ebayStoreInputType: ['storeName'],
          },
        },
        default: '',
        required: true,
        description: 'Exact eBay storefront name you want to retrieve data for',
      },
      {
        displayName: 'Store URL',
        name: 'ebayStoreUrl',
        type: 'string',
        displayOptions: {
          show: {
            apiType: ['dataApi'],
            dataDomain: ['ebay'],
            ebayApiType: ['store'],
            ebayStoreInputType: ['url'],
          },
        },
        default: '',
        required: true,
        description: 'Full eBay store page URL (remember to URL encode before sending)',
      },
      {
        displayName: 'Advanced Options',
        name: 'ebayApiOptions',
        type: 'collection',
        placeholder: 'Add Option',
        displayOptions: {
          show: {
            apiType: ['dataApi'],
            dataDomain: ['ebay'],
          },
        },
        default: {},
        description: 'Advanced options for eBay API',
        options: [],
      },

      //
      // Walmart configuration
      //
      {
        displayName: 'Walmart API Type',
        name: 'walmartApiType',
        type: 'options',
        displayOptions: {
          show: {
            apiType: ['dataApi'],
            dataDomain: ['walmart'],
          },
        },
        options: [
          {
            name: 'Product API',
            value: 'product',
            description: 'Get data for a specific Walmart product by Product ID or URL',
          },
          {
            name: 'Product Search API',
            value: 'search',
            description: 'Search for Walmart products by keyword or search URL',
          },
          {
            name: 'Review API',
            value: 'review',
            description: 'Retrieve review data for a Walmart product by Product ID or URL',
          },
          {
            name: 'Shop API',
            value: 'shop',
            description: 'Retrieve data for a Walmart Shop by Shop ID or URL',
          },
          {
            name: 'Browse API',
            value: 'browse',
            description: 'Retrieve data for a Walmart browse page by Browse Path or URL',
          },
          {
            name: 'Category API',
            value: 'category',
            description: 'Retrieve data for a Walmart category by Category ID or URL',
          },
        ],
        default: 'product',
        description: 'Type of Walmart API to use',
      },
      {
        displayName: 'Input Type',
        name: 'walmartProductInputType',
        type: 'options',
        displayOptions: {
          show: {
            apiType: ['dataApi'],
            dataDomain: ['walmart'],
            walmartApiType: ['product'],
          },
        },
        options: [
          {
            name: 'Product ID',
            value: 'productId',
            description: 'Walmart Product ID',
          },
          {
            name: 'URL',
            value: 'url',
            description: 'Full Walmart product URL',
          },
        ],
        default: 'url',
        description: 'Type of input for Walmart Product API',
      },
      {
        displayName: 'Product ID',
        name: 'walmartProductId',
        type: 'string',
        displayOptions: {
          show: {
            apiType: ['dataApi'],
            dataDomain: ['walmart'],
            walmartApiType: ['product'],
            walmartProductInputType: ['productId'],
          },
        },
        default: '',
        required: true,
        description: 'Walmart Product ID of the product to retrieve',
      },
      {
        displayName: 'Product URL',
        name: 'walmartProductUrl',
        type: 'string',
        displayOptions: {
          show: {
            apiType: ['dataApi'],
            dataDomain: ['walmart'],
            walmartApiType: ['product'],
            walmartProductInputType: ['url'],
          },
        },
        default: '',
        required: true,
        description: 'Full URL of the Walmart product page',
      },
      {
        displayName: 'Input Type',
        name: 'walmartSearchInputType',
        type: 'options',
        displayOptions: {
          show: {
            apiType: ['dataApi'],
            dataDomain: ['walmart'],
            walmartApiType: ['search'],
          },
        },
        options: [
          {
            name: 'Query',
            value: 'query',
            description: 'Search query for Walmart products',
          },
          {
            name: 'URL',
            value: 'url',
            description: 'Full Walmart search results URL',
          },
        ],
        default: 'url',
        description: 'Type of input for Walmart Product Search API',
      },
      {
        displayName: 'Search Query',
        name: 'walmartSearchQuery',
        type: 'string',
        displayOptions: {
          show: {
            apiType: ['dataApi'],
            dataDomain: ['walmart'],
            walmartApiType: ['search'],
            walmartSearchInputType: ['query'],
          },
        },
        default: '',
        required: true,
        description: 'Search query for Walmart products',
      },
      {
        displayName: 'Search URL',
        name: 'walmartSearchUrl',
        type: 'string',
        displayOptions: {
          show: {
            apiType: ['dataApi'],
            dataDomain: ['walmart'],
            walmartApiType: ['search'],
            walmartSearchInputType: ['url'],
          },
        },
        default: '',
        required: true,
        description: 'Full Walmart search URL',
      },
      {
        displayName: 'Input Type',
        name: 'walmartReviewInputType',
        type: 'options',
        displayOptions: {
          show: {
            apiType: ['dataApi'],
            dataDomain: ['walmart'],
            walmartApiType: ['review'],
          },
        },
        options: [
          {
            name: 'Product ID',
            value: 'productId',
            description: 'Walmart Product ID associated with the review page',
          },
          {
            name: 'URL',
            value: 'url',
            description: 'Full Walmart review page URL',
          },
        ],
        default: 'url',
        description: 'Type of input for Walmart Review API',
      },
      {
        displayName: 'Product ID',
        name: 'walmartReviewProductId',
        type: 'string',
        displayOptions: {
          show: {
            apiType: ['dataApi'],
            dataDomain: ['walmart'],
            walmartApiType: ['review'],
            walmartReviewInputType: ['productId'],
          },
        },
        default: '',
        required: true,
        description: 'Walmart Product ID of the item whose reviews should be retrieved',
      },
      {
        displayName: 'Review URL',
        name: 'walmartReviewUrl',
        type: 'string',
        displayOptions: {
          show: {
            apiType: ['dataApi'],
            dataDomain: ['walmart'],
            walmartApiType: ['review'],
            walmartReviewInputType: ['url'],
          },
        },
        default: '',
        required: true,
        description: 'Full URL of the Walmart review page',
      },
      {
        displayName: 'Input Type',
        name: 'walmartShopInputType',
        type: 'options',
        displayOptions: {
          show: {
            apiType: ['dataApi'],
            dataDomain: ['walmart'],
            walmartApiType: ['shop'],
          },
        },
        options: [
          {
            name: 'Shop ID',
            value: 'shopId',
            description: 'Walmart Shop ID',
          },
          {
            name: 'URL',
            value: 'url',
            description: 'Full Walmart shop page URL',
          },
        ],
        default: 'url',
        description: 'Type of input for Walmart Shop API',
      },
      {
        displayName: 'Shop ID',
        name: 'walmartShopId',
        type: 'string',
        displayOptions: {
          show: {
            apiType: ['dataApi'],
            dataDomain: ['walmart'],
            walmartApiType: ['shop'],
            walmartShopInputType: ['shopId'],
          },
        },
        default: '',
        required: true,
        description: 'Walmart Shop ID to retrieve',
      },
      {
        displayName: 'Shop URL',
        name: 'walmartShopUrl',
        type: 'string',
        displayOptions: {
          show: {
            apiType: ['dataApi'],
            dataDomain: ['walmart'],
            walmartApiType: ['shop'],
            walmartShopInputType: ['url'],
          },
        },
        default: '',
        required: true,
        description: 'Full URL of the Walmart shop page',
      },
      {
        displayName: 'Input Type',
        name: 'walmartBrowseInputType',
        type: 'options',
        displayOptions: {
          show: {
            apiType: ['dataApi'],
            dataDomain: ['walmart'],
            walmartApiType: ['browse'],
          },
        },
        options: [
          {
            name: 'Browse Path',
            value: 'browsePath',
            description: 'Walmart browse path (e.g. 3944_1060825_447913)',
          },
          {
            name: 'URL',
            value: 'url',
            description: 'Full Walmart browse page URL',
          },
        ],
        default: 'url',
        description: 'Type of input for Walmart Browse API',
      },
      {
        displayName: 'Browse Path',
        name: 'walmartBrowsePath',
        type: 'string',
        displayOptions: {
          show: {
            apiType: ['dataApi'],
            dataDomain: ['walmart'],
            walmartApiType: ['browse'],
            walmartBrowseInputType: ['browsePath'],
          },
        },
        default: '',
        required: true,
        description: 'Walmart browse path identifier',
      },
      {
        displayName: 'Browse URL',
        name: 'walmartBrowseUrl',
        type: 'string',
        displayOptions: {
          show: {
            apiType: ['dataApi'],
            dataDomain: ['walmart'],
            walmartApiType: ['browse'],
            walmartBrowseInputType: ['url'],
          },
        },
        default: '',
        required: true,
        description: 'Full Walmart browse page URL',
      },
      {
        displayName: 'Input Type',
        name: 'walmartCategoryInputType',
        type: 'options',
        displayOptions: {
          show: {
            apiType: ['dataApi'],
            dataDomain: ['walmart'],
            walmartApiType: ['category'],
          },
        },
        options: [
          {
            name: 'Category ID',
            value: 'categoryId',
            description: 'Walmart Category ID',
          },
          {
            name: 'URL',
            value: 'url',
            description: 'Full Walmart category URL',
          },
        ],
        default: 'url',
        description: 'Type of input for Walmart Category API',
      },
      {
        displayName: 'Category ID',
        name: 'walmartCategoryId',
        type: 'string',
        displayOptions: {
          show: {
            apiType: ['dataApi'],
            dataDomain: ['walmart'],
            walmartApiType: ['category'],
            walmartCategoryInputType: ['categoryId'],
          },
        },
        default: '',
        required: true,
        description: 'Walmart Category ID to retrieve',
      },
      {
        displayName: 'Category URL',
        name: 'walmartCategoryUrl',
        type: 'string',
        displayOptions: {
          show: {
            apiType: ['dataApi'],
            dataDomain: ['walmart'],
            walmartApiType: ['category'],
            walmartCategoryInputType: ['url'],
          },
        },
        default: '',
        required: true,
        description: 'Full Walmart category page URL',
      },
      {
        displayName: 'Advanced Options',
        name: 'walmartApiOptions',
        type: 'collection',
        placeholder: 'Add Option',
        displayOptions: {
          show: {
            apiType: ['dataApi'],
            dataDomain: ['walmart'],
          },
        },
        default: {},
        description: 'Advanced options for Walmart API',
        options: [
          {
            displayName: 'Country',
            name: 'country',
            type: 'string',
            default: 'us',
            description:
              'The 2 letter country code to scrape data from (e.g., us, ca, mx)',
          },
          {
            displayName: 'TLD (Top Level Domain)',
            name: 'tld',
            type: 'options',
            options: [
              { name: '.CA (Canada)', value: 'ca' },
              { name: '.CL (Chile)', value: 'cl' },
              { name: '.COM (USA)', value: 'com' },
              { name: '.COM.BR (Brazil)', value: 'com.br' },
              { name: '.COM.MX (Mexico)', value: 'com.mx' },
            ],
            default: 'com',
            description: 'The Walmart domain to scrape from',
          },
        ],
      },
      //
      // Indeed configuration
      //
      {
        displayName: 'Indeed API Type',
        name: 'indeedApiType',
        type: 'options',
        displayOptions: {
          show: {
            apiType: ['dataApi'],
            dataDomain: ['indeed'],
          },
        },
        options: [
          { name: 'Job Search', value: 'jobSearch', description: 'Search for jobs by query or URL' },
          { name: 'Job Detail', value: 'jobDetail', description: 'Retrieve job details by job ID or URL' },
          { name: 'Company Search', value: 'companySearch', description: 'Search for companies by query or URL' },
          { name: 'Top Companies', value: 'topCompanies', description: 'List top companies by filters or URL' },
          { name: 'Company Snapshot', value: 'companySnapshot', description: 'Get company snapshot data' },
          { name: 'Company About', value: 'companyAbout', description: 'Get company about page data' },
          { name: 'Company Reviews', value: 'companyReviews', description: 'Get company reviews data' },
          { name: 'Company Jobs', value: 'companyJobs', description: 'Get company jobs data' },
        ],
        default: 'jobSearch',
        description: 'Type of Indeed API to use',
      },
      {
        displayName: 'Input Type',
        name: 'indeedJobSearchInputType',
        type: 'options',
        displayOptions: {
          show: {
            apiType: ['dataApi'],
            dataDomain: ['indeed'],
            indeedApiType: ['jobSearch'],
          },
        },
        options: [
          { name: 'Query', value: 'query', description: 'Search using a query string and optional filters' },
          { name: 'URL', value: 'url', description: 'Provide a full Indeed job search URL' },
        ],
        default: 'url',
        description: 'Select how to identify the job search results',
      },
      {
        displayName: 'Search Query',
        name: 'indeedJobSearchQuery',
        type: 'string',
        displayOptions: {
          show: {
            apiType: ['dataApi'],
            dataDomain: ['indeed'],
            indeedApiType: ['jobSearch'],
            indeedJobSearchInputType: ['query'],
          },
        },
        default: '',
        required: true,
        description: 'Search query for Indeed jobs',
      },
      {
        displayName: 'Search URL',
        name: 'indeedJobSearchUrl',
        type: 'string',
        displayOptions: {
          show: {
            apiType: ['dataApi'],
            dataDomain: ['indeed'],
            indeedApiType: ['jobSearch'],
            indeedJobSearchInputType: ['url'],
          },
        },
        default: '',
        required: true,
        description: 'Full Indeed job search URL',
      },
      {
        displayName: 'Input Type',
        name: 'indeedJobDetailInputType',
        type: 'options',
        displayOptions: {
          show: {
            apiType: ['dataApi'],
            dataDomain: ['indeed'],
            indeedApiType: ['jobDetail'],
          },
        },
        options: [
          { name: 'Job ID', value: 'jobId', description: 'Provide the Indeed job ID' },
          { name: 'URL', value: 'url', description: 'Provide the full job detail URL' },
        ],
        default: 'url',
        description: 'Select how to identify the job detail data',
      },
      {
        displayName: 'Job ID',
        name: 'indeedJobDetailJobId',
        type: 'string',
        displayOptions: {
          show: {
            apiType: ['dataApi'],
            dataDomain: ['indeed'],
            indeedApiType: ['jobDetail'],
            indeedJobDetailInputType: ['jobId'],
          },
        },
        default: '',
        required: true,
        description: 'Indeed job ID to retrieve',
      },
      {
        displayName: 'Job URL',
        name: 'indeedJobDetailUrl',
        type: 'string',
        displayOptions: {
          show: {
            apiType: ['dataApi'],
            dataDomain: ['indeed'],
            indeedApiType: ['jobDetail'],
            indeedJobDetailInputType: ['url'],
          },
        },
        default: '',
        required: true,
        description: 'Full Indeed job detail URL',
      },
      {
        displayName: 'Input Type',
        name: 'indeedCompanySearchInputType',
        type: 'options',
        displayOptions: {
          show: {
            apiType: ['dataApi'],
            dataDomain: ['indeed'],
            indeedApiType: ['companySearch'],
          },
        },
        options: [
          { name: 'Query', value: 'query', description: 'Search using a company query' },
          { name: 'URL', value: 'url', description: 'Provide a full company search URL' },
        ],
        default: 'url',
        description: 'Select how to identify the company search results',
      },
      {
        displayName: 'Company Query',
        name: 'indeedCompanySearchQuery',
        type: 'string',
        displayOptions: {
          show: {
            apiType: ['dataApi'],
            dataDomain: ['indeed'],
            indeedApiType: ['companySearch'],
            indeedCompanySearchInputType: ['query'],
          },
        },
        default: '',
        required: true,
        description: 'Company search query',
      },
      {
        displayName: 'Company Search URL',
        name: 'indeedCompanySearchUrl',
        type: 'string',
        displayOptions: {
          show: {
            apiType: ['dataApi'],
            dataDomain: ['indeed'],
            indeedApiType: ['companySearch'],
            indeedCompanySearchInputType: ['url'],
          },
        },
        default: '',
        required: true,
        description: 'Full Indeed company search URL',
      },
      {
        displayName: 'Input Type',
        name: 'indeedTopCompaniesInputType',
        type: 'options',
        displayOptions: {
          show: {
            apiType: ['dataApi'],
            dataDomain: ['indeed'],
            indeedApiType: ['topCompanies'],
          },
        },
        options: [
          { name: 'Parameters', value: 'parameters', description: 'Use industry as parameter' },
          { name: 'URL', value: 'url', description: 'Provide a full top companies URL' },
        ],
        default: 'url',
        description: 'Select how to fetch the top companies data',
      },
      {
        displayName: 'Industry',
        name: 'indeedTopCompaniesIndustry',
        type: 'string',
        displayOptions: {
          show: {
            apiType: ['dataApi'],
            dataDomain: ['indeed'],
            indeedApiType: ['topCompanies'],
            indeedTopCompaniesInputType: ['parameters'],
          },
        },
        default: '',
        description: 'Industry filter for the top companies endpoint (e.g., Technology)',
      },
      {
        displayName: 'Top Companies URL',
        name: 'indeedTopCompaniesUrl',
        type: 'string',
        displayOptions: {
          show: {
            apiType: ['dataApi'],
            dataDomain: ['indeed'],
            indeedApiType: ['topCompanies'],
            indeedTopCompaniesInputType: ['url'],
          },
        },
        default: '',
        required: true,
        description: 'Full Indeed top companies URL',
      },
      {
        displayName: 'Input Type',
        name: 'indeedCompanySnapshotInputType',
        type: 'options',
        displayOptions: {
          show: {
            apiType: ['dataApi'],
            dataDomain: ['indeed'],
            indeedApiType: ['companySnapshot'],
          },
        },
        options: [
          { name: 'Company ID', value: 'companyId', description: 'Provide the Indeed company ID' },
          { name: 'URL', value: 'url', description: 'Provide the full company snapshot URL' },
        ],
        default: 'url',
        description: 'Select how to identify the company snapshot data',
      },
      {
        displayName: 'Company ID',
        name: 'indeedCompanySnapshotId',
        type: 'string',
        displayOptions: {
          show: {
            apiType: ['dataApi'],
            dataDomain: ['indeed'],
            indeedApiType: ['companySnapshot'],
            indeedCompanySnapshotInputType: ['companyId'],
          },
        },
        default: '',
        required: true,
        description: 'Indeed company ID for the snapshot endpoint',
      },
      {
        displayName: 'Company Snapshot URL',
        name: 'indeedCompanySnapshotUrl',
        type: 'string',
        displayOptions: {
          show: {
            apiType: ['dataApi'],
            dataDomain: ['indeed'],
            indeedApiType: ['companySnapshot'],
            indeedCompanySnapshotInputType: ['url'],
          },
        },
        default: '',
        required: true,
        description: 'Full Indeed company snapshot URL',
      },
      {
        displayName: 'Input Type',
        name: 'indeedCompanyAboutInputType',
        type: 'options',
        displayOptions: {
          show: {
            apiType: ['dataApi'],
            dataDomain: ['indeed'],
            indeedApiType: ['companyAbout'],
          },
        },
        options: [
          { name: 'Company ID', value: 'companyId', description: 'Provide the Indeed company ID' },
          { name: 'URL', value: 'url', description: 'Provide the full company about URL' },
        ],
        default: 'url',
        description: 'Select how to identify the company about data',
      },
      {
        displayName: 'Company ID',
        name: 'indeedCompanyAboutId',
        type: 'string',
        displayOptions: {
          show: {
            apiType: ['dataApi'],
            dataDomain: ['indeed'],
            indeedApiType: ['companyAbout'],
            indeedCompanyAboutInputType: ['companyId'],
          },
        },
        default: '',
        required: true,
        description: 'Indeed company ID for the about endpoint',
      },
      {
        displayName: 'Company About URL',
        name: 'indeedCompanyAboutUrl',
        type: 'string',
        displayOptions: {
          show: {
            apiType: ['dataApi'],
            dataDomain: ['indeed'],
            indeedApiType: ['companyAbout'],
            indeedCompanyAboutInputType: ['url'],
          },
        },
        default: '',
        required: true,
        description: 'Full Indeed company about URL',
      },
      {
        displayName: 'Input Type',
        name: 'indeedCompanyReviewsInputType',
        type: 'options',
        displayOptions: {
          show: {
            apiType: ['dataApi'],
            dataDomain: ['indeed'],
            indeedApiType: ['companyReviews'],
          },
        },
        options: [
          { name: 'Company ID', value: 'companyId', description: 'Provide the Indeed company ID' },
          { name: 'URL', value: 'url', description: 'Provide the full company reviews URL' },
        ],
        default: 'url',
        description: 'Select how to identify the company reviews data',
      },
      {
        displayName: 'Company ID',
        name: 'indeedCompanyReviewsId',
        type: 'string',
        displayOptions: {
          show: {
            apiType: ['dataApi'],
            dataDomain: ['indeed'],
            indeedApiType: ['companyReviews'],
            indeedCompanyReviewsInputType: ['companyId'],
          },
        },
        default: '',
        required: true,
        description: 'Indeed company ID for the reviews endpoint',
      },
      {
        displayName: 'Company Reviews URL',
        name: 'indeedCompanyReviewsUrl',
        type: 'string',
        displayOptions: {
          show: {
            apiType: ['dataApi'],
            dataDomain: ['indeed'],
            indeedApiType: ['companyReviews'],
            indeedCompanyReviewsInputType: ['url'],
          },
        },
        default: '',
        required: true,
        description: 'Full Indeed company reviews URL',
      },
      {
        displayName: 'Input Type',
        name: 'indeedCompanyJobsInputType',
        type: 'options',
        displayOptions: {
          show: {
            apiType: ['dataApi'],
            dataDomain: ['indeed'],
            indeedApiType: ['companyJobs'],
          },
        },
        options: [
          { name: 'Company ID', value: 'companyId', description: 'Provide the Indeed company ID' },
          { name: 'URL', value: 'url', description: 'Provide the full company jobs URL' },
        ],
        default: 'url',
        description: 'Select how to identify the company jobs data',
      },
      {
        displayName: 'Company ID',
        name: 'indeedCompanyJobsId',
        type: 'string',
        displayOptions: {
          show: {
            apiType: ['dataApi'],
            dataDomain: ['indeed'],
            indeedApiType: ['companyJobs'],
            indeedCompanyJobsInputType: ['companyId'],
          },
        },
        default: '',
        required: true,
        description: 'Indeed company ID for the jobs endpoint',
      },
      {
        displayName: 'Company Jobs URL',
        name: 'indeedCompanyJobsUrl',
        type: 'string',
        displayOptions: {
          show: {
            apiType: ['dataApi'],
            dataDomain: ['indeed'],
            indeedApiType: ['companyJobs'],
            indeedCompanyJobsInputType: ['url'],
          },
        },
        default: '',
        required: true,
        description: 'Full Indeed company jobs URL',
      },
      {
        displayName: 'Advanced Options',
        name: 'indeedApiOptions',
        type: 'collection',
        placeholder: 'Add Option',
        displayOptions: {
          show: {
            apiType: ['dataApi'],
            dataDomain: ['indeed'],
          },
        },
        default: {},
        description: 'Advanced options for Indeed API',
        options: [
          {
            displayName: 'Country',
            name: 'country',
            type: 'string',
            default: 'us',
            description: 'The 2 letter country code to scrape data from (e.g., us, uk, ca)',
          },
          {
            displayName: 'TLD (Top Level Domain)',
            name: 'tld',
            type: 'options',
            options: [
              { name: '.COM (US)', value: 'com' },
              { name: '.CO.UK (UK)', value: 'co.uk' },
              { name: '.CA (Canada)', value: 'ca' },
              { name: '.DE (Germany)', value: 'de' },
              { name: '.FR (France)', value: 'fr' },
              { name: '.IT (Italy)', value: 'it' },
              { name: '.ES (Spain)', value: 'es' },
              { name: '.NL (Netherlands)', value: 'nl' },
              { name: '.PL (Poland)', value: 'pl' },
              { name: '.IN (India)', value: 'co.in' },
              { name: '.AU (Australia)', value: 'com.au' },
              { name: '.JP (Japan)', value: 'jp' },
              { name: '.MX (Mexico)', value: 'com.mx' },
              { name: '.BR (Brazil)', value: 'com.br' },
              { name: '.SA (Saudi Arabia)', value: 'com.sa' },
              { name: '.AE (United Arab Emirates)', value: 'ae' },
            ],
            default: 'com',
            description: 'The Indeed domain to scrape from',
          },
        ],
      },
      //
      // Redfin configuration
      //
      {
        displayName: 'Redfin API Type',
        name: 'redfinApiType',
        type: 'options',
        displayOptions: {
          show: {
            apiType: ['dataApi'],
            dataDomain: ['redfin'],
          },
        },
        options: [
          { name: 'Sale Search', value: 'saleSearch', description: 'Search Redfin homes for sale' },
          { name: 'Rent Search', value: 'rentSearch', description: 'Search Redfin rentals' },
          { name: 'Sale Detail', value: 'saleDetail', description: 'Fetch a specific home sale detail page' },
          { name: 'Rent Detail', value: 'rentDetail', description: 'Fetch a specific rental detail page' },
          { name: 'Building Detail', value: 'buildingDetail', description: 'Fetch Redfin building detail data' },
          { name: 'State Search', value: 'stateSearch', description: 'Fetch state-level data' },
          { name: 'Agent Search', value: 'agentSearch', description: 'Search for Redfin agents' },
          { name: 'Agent Profile', value: 'agentProfile', description: 'Fetch a specific Redfin agent profile' },
        ],
        default: 'saleSearch',
        description: 'Type of Redfin API endpoint to call',
      },
      {
        displayName: 'Input Type',
        name: 'redfinSaleSearchInputType',
        type: 'options',
        displayOptions: {
          show: {
            apiType: ['dataApi'],
            dataDomain: ['redfin'],
            redfinApiType: ['saleSearch'],
          },
        },
        options: [
          { name: 'Parameters', value: 'parameters', description: 'Provide city/state details manually' },
          { name: 'URL', value: 'url', description: 'Provide the full Redfin sale search URL' },
        ],
        default: 'url',
        description: 'Choose how to identify the sale search page',
      },
      {
        displayName: 'Sale Search URL',
        name: 'redfinSaleSearchUrl',
        type: 'string',
        displayOptions: {
          show: {
            apiType: ['dataApi'],
            dataDomain: ['redfin'],
            redfinApiType: ['saleSearch'],
            redfinSaleSearchInputType: ['url'],
          },
        },
        default: '',
        required: true,
        description: 'Full Redfin sale search URL',
      },
      {
        displayName: 'City ID',
        name: 'redfinSaleSearchCityId',
        type: 'string',
        displayOptions: {
          show: {
            apiType: ['dataApi'],
            dataDomain: ['redfin'],
            redfinApiType: ['saleSearch'],
            redfinSaleSearchInputType: ['parameters'],
          },
        },
        default: '',
        required: true,
        description: 'Redfin city ID (e.g., 30749)',
      },
      {
        displayName: 'State Code',
        name: 'redfinSaleSearchState',
        type: 'string',
        displayOptions: {
          show: {
            apiType: ['dataApi'],
            dataDomain: ['redfin'],
            redfinApiType: ['saleSearch'],
            redfinSaleSearchInputType: ['parameters'],
          },
        },
        default: '',
        required: true,
        description: 'State code (e.g., NY)',
      },
      {
        displayName: 'City Name',
        name: 'redfinSaleSearchCity',
        type: 'string',
        displayOptions: {
          show: {
            apiType: ['dataApi'],
            dataDomain: ['redfin'],
            redfinApiType: ['saleSearch'],
            redfinSaleSearchInputType: ['parameters'],
          },
        },
        default: '',
        required: true,
        description: 'City name (spaces allowed)',
      },
      {
        displayName: 'Input Type',
        name: 'redfinRentSearchInputType',
        type: 'options',
        displayOptions: {
          show: {
            apiType: ['dataApi'],
            dataDomain: ['redfin'],
            redfinApiType: ['rentSearch'],
          },
        },
        options: [
          { name: 'Parameters', value: 'parameters', description: 'Provide city/state details manually' },
          { name: 'URL', value: 'url', description: 'Provide the full Redfin rentals search URL' },
        ],
        default: 'url',
        description: 'Choose how to identify the rentals search page',
      },
      {
        displayName: 'Rent Search URL',
        name: 'redfinRentSearchUrl',
        type: 'string',
        displayOptions: {
          show: {
            apiType: ['dataApi'],
            dataDomain: ['redfin'],
            redfinApiType: ['rentSearch'],
            redfinRentSearchInputType: ['url'],
          },
        },
        default: '',
        required: true,
        description: 'Full Redfin rentals search URL',
      },
      {
        displayName: 'City ID',
        name: 'redfinRentSearchCityId',
        type: 'string',
        displayOptions: {
          show: {
            apiType: ['dataApi'],
            dataDomain: ['redfin'],
            redfinApiType: ['rentSearch'],
            redfinRentSearchInputType: ['parameters'],
          },
        },
        default: '',
        required: true,
        description: 'Redfin city ID',
      },
      {
        displayName: 'State Code',
        name: 'redfinRentSearchState',
        type: 'string',
        displayOptions: {
          show: {
            apiType: ['dataApi'],
            dataDomain: ['redfin'],
            redfinApiType: ['rentSearch'],
            redfinRentSearchInputType: ['parameters'],
          },
        },
        default: '',
        required: true,
        description: 'State code (e.g., NY)',
      },
      {
        displayName: 'City Name',
        name: 'redfinRentSearchCity',
        type: 'string',
        displayOptions: {
          show: {
            apiType: ['dataApi'],
            dataDomain: ['redfin'],
            redfinApiType: ['rentSearch'],
            redfinRentSearchInputType: ['parameters'],
          },
        },
        default: '',
        required: true,
        description: 'City name (spaces allowed)',
      },
      {
        displayName: 'Input Type',
        name: 'redfinSaleDetailInputType',
        type: 'options',
        displayOptions: {
          show: {
            apiType: ['dataApi'],
            dataDomain: ['redfin'],
            redfinApiType: ['saleDetail'],
          },
        },
        options: [
          { name: 'URL', value: 'url', description: 'Provide the full sale detail URL' },
          { name: 'Parameters', value: 'parameters', description: 'Provide state, path, and home ID' },
        ],
        default: 'url',
        description: 'Choose how to identify the sale detail page',
      },
      {
        displayName: 'Sale Detail URL',
        name: 'redfinSaleDetailUrl',
        type: 'string',
        displayOptions: {
          show: {
            apiType: ['dataApi'],
            dataDomain: ['redfin'],
            redfinApiType: ['saleDetail'],
            redfinSaleDetailInputType: ['url'],
          },
        },
        default: '',
        required: true,
        description: 'Full Redfin sale detail URL',
      },
      {
        displayName: 'State Code',
        name: 'redfinSaleDetailState',
        type: 'string',
        displayOptions: {
          show: {
            apiType: ['dataApi'],
            dataDomain: ['redfin'],
            redfinApiType: ['saleDetail'],
            redfinSaleDetailInputType: ['parameters'],
          },
        },
        default: '',
        required: true,
        description: 'State code (e.g., NY)',
      },
      {
        displayName: 'Path',
        name: 'redfinSaleDetailPath',
        type: 'string',
        displayOptions: {
          show: {
            apiType: ['dataApi'],
            dataDomain: ['redfin'],
            redfinApiType: ['saleDetail'],
            redfinSaleDetailInputType: ['parameters'],
          },
        },
        default: '',
        required: true,
        description: 'City/address path (URL encode slashes)',
      },
      {
        displayName: 'Home ID',
        name: 'redfinSaleDetailHomeId',
        type: 'string',
        displayOptions: {
          show: {
            apiType: ['dataApi'],
            dataDomain: ['redfin'],
            redfinApiType: ['saleDetail'],
            redfinSaleDetailInputType: ['parameters'],
          },
        },
        default: '',
        required: true,
        description: 'Redfin home ID',
      },
      {
        displayName: 'Input Type',
        name: 'redfinRentDetailInputType',
        type: 'options',
        displayOptions: {
          show: {
            apiType: ['dataApi'],
            dataDomain: ['redfin'],
            redfinApiType: ['rentDetail'],
          },
        },
        options: [
          { name: 'URL', value: 'url', description: 'Provide the full rental detail URL' },
          { name: 'Parameters', value: 'parameters', description: 'Provide state, path, and property ID' },
        ],
        default: 'url',
        description: 'Choose how to identify the rental detail page',
      },
      {
        displayName: 'Rent Detail URL',
        name: 'redfinRentDetailUrl',
        type: 'string',
        displayOptions: {
          show: {
            apiType: ['dataApi'],
            dataDomain: ['redfin'],
            redfinApiType: ['rentDetail'],
            redfinRentDetailInputType: ['url'],
          },
        },
        default: '',
        required: true,
        description: 'Full Redfin rental detail URL',
      },
      {
        displayName: 'State Code',
        name: 'redfinRentDetailState',
        type: 'string',
        displayOptions: {
          show: {
            apiType: ['dataApi'],
            dataDomain: ['redfin'],
            redfinApiType: ['rentDetail'],
            redfinRentDetailInputType: ['parameters'],
          },
        },
        default: '',
        required: true,
        description: 'State code (e.g., NY)',
      },
      {
        displayName: 'Path',
        name: 'redfinRentDetailPath',
        type: 'string',
        displayOptions: {
          show: {
            apiType: ['dataApi'],
            dataDomain: ['redfin'],
            redfinApiType: ['rentDetail'],
            redfinRentDetailInputType: ['parameters'],
          },
        },
        default: '',
        required: true,
        description: 'City or building path (URL encode slashes)',
      },
      {
        displayName: 'Property ID',
        name: 'redfinRentDetailPropertyId',
        type: 'string',
        displayOptions: {
          show: {
            apiType: ['dataApi'],
            dataDomain: ['redfin'],
            redfinApiType: ['rentDetail'],
            redfinRentDetailInputType: ['parameters'],
          },
        },
        default: '',
        required: true,
        description: 'Redfin rental property ID',
      },
      {
        displayName: 'Input Type',
        name: 'redfinBuildingDetailInputType',
        type: 'options',
        displayOptions: {
          show: {
            apiType: ['dataApi'],
            dataDomain: ['redfin'],
            redfinApiType: ['buildingDetail'],
          },
        },
        options: [
          { name: 'URL', value: 'url', description: 'Provide the full building detail URL' },
          { name: 'Parameters', value: 'parameters', description: 'Provide state, city, building and IDs' },
        ],
        default: 'url',
        description: 'Choose how to identify the building detail page',
      },
      {
        displayName: 'Building Detail URL',
        name: 'redfinBuildingDetailUrl',
        type: 'string',
        displayOptions: {
          show: {
            apiType: ['dataApi'],
            dataDomain: ['redfin'],
            redfinApiType: ['buildingDetail'],
            redfinBuildingDetailInputType: ['url'],
          },
        },
        default: '',
        required: true,
        description: 'Full Redfin building detail URL',
      },
      {
        displayName: 'State Code',
        name: 'redfinBuildingDetailState',
        type: 'string',
        displayOptions: {
          show: {
            apiType: ['dataApi'],
            dataDomain: ['redfin'],
            redfinApiType: ['buildingDetail'],
            redfinBuildingDetailInputType: ['parameters'],
          },
        },
        default: '',
        required: true,
        description: 'State code (e.g., NY)',
      },
      {
        displayName: 'City Name',
        name: 'redfinBuildingDetailCity',
        type: 'string',
        displayOptions: {
          show: {
            apiType: ['dataApi'],
            dataDomain: ['redfin'],
            redfinApiType: ['buildingDetail'],
            redfinBuildingDetailInputType: ['parameters'],
          },
        },
        default: '',
        required: true,
        description: 'City name',
      },
      {
        displayName: 'Building Slug',
        name: 'redfinBuildingDetailBuilding',
        type: 'string',
        displayOptions: {
          show: {
            apiType: ['dataApi'],
            dataDomain: ['redfin'],
            redfinApiType: ['buildingDetail'],
            redfinBuildingDetailInputType: ['parameters'],
          },
        },
        default: '',
        required: true,
        description: 'Building slug (e.g., Beatrice)',
      },
      {
        displayName: 'Building Type',
        name: 'redfinBuildingDetailBuildingType',
        type: 'string',
        displayOptions: {
          show: {
            apiType: ['dataApi'],
            dataDomain: ['redfin'],
            redfinApiType: ['buildingDetail'],
            redfinBuildingDetailInputType: ['parameters'],
          },
        },
        default: 'apartment',
        description: 'Optional building type segment (defaults to apartment)',
      },
      {
        displayName: 'Building ID',
        name: 'redfinBuildingDetailBuildingId',
        type: 'string',
        displayOptions: {
          show: {
            apiType: ['dataApi'],
            dataDomain: ['redfin'],
            redfinApiType: ['buildingDetail'],
            redfinBuildingDetailInputType: ['parameters'],
          },
        },
        default: '',
        required: true,
        description: 'Redfin building ID',
      },
      {
        displayName: 'Input Type',
        name: 'redfinStateSearchInputType',
        type: 'options',
        displayOptions: {
          show: {
            apiType: ['dataApi'],
            dataDomain: ['redfin'],
            redfinApiType: ['stateSearch'],
          },
        },
        options: [
          { name: 'Parameters', value: 'parameters', description: 'Provide the state code' },
          { name: 'URL', value: 'url', description: 'Provide the full state page URL' },
        ],
        default: 'url',
        description: 'Choose how to identify the state search page',
      },
      {
        displayName: 'State Search URL',
        name: 'redfinStateSearchUrl',
        type: 'string',
        displayOptions: {
          show: {
            apiType: ['dataApi'],
            dataDomain: ['redfin'],
            redfinApiType: ['stateSearch'],
            redfinStateSearchInputType: ['url'],
          },
        },
        default: '',
        required: true,
        description: 'Full Redfin state page URL',
      },
      {
        displayName: 'State Code',
        name: 'redfinStateSearchState',
        type: 'string',
        displayOptions: {
          show: {
            apiType: ['dataApi'],
            dataDomain: ['redfin'],
            redfinApiType: ['stateSearch'],
            redfinStateSearchInputType: ['parameters'],
          },
        },
        default: '',
        required: true,
        description: 'State code (e.g., NY)',
      },
      {
        displayName: 'Input Type',
        name: 'redfinAgentSearchInputType',
        type: 'options',
        displayOptions: {
          show: {
            apiType: ['dataApi'],
            dataDomain: ['redfin'],
            redfinApiType: ['agentSearch'],
          },
        },
        options: [
          { name: 'Parameters', value: 'parameters', description: 'Provide city/state details manually' },
          { name: 'URL', value: 'url', description: 'Provide the full agent search URL' },
        ],
        default: 'url',
        description: 'Choose how to identify the agent search results',
      },
      {
        displayName: 'Agent Search URL',
        name: 'redfinAgentSearchUrl',
        type: 'string',
        displayOptions: {
          show: {
            apiType: ['dataApi'],
            dataDomain: ['redfin'],
            redfinApiType: ['agentSearch'],
            redfinAgentSearchInputType: ['url'],
          },
        },
        default: '',
        required: true,
        description: 'Full Redfin agent search URL',
      },
      {
        displayName: 'City ID',
        name: 'redfinAgentSearchCityId',
        type: 'string',
        displayOptions: {
          show: {
            apiType: ['dataApi'],
            dataDomain: ['redfin'],
            redfinApiType: ['agentSearch'],
            redfinAgentSearchInputType: ['parameters'],
          },
        },
        default: '',
        required: true,
        description: 'Redfin city ID',
      },
      {
        displayName: 'State Code',
        name: 'redfinAgentSearchState',
        type: 'string',
        displayOptions: {
          show: {
            apiType: ['dataApi'],
            dataDomain: ['redfin'],
            redfinApiType: ['agentSearch'],
            redfinAgentSearchInputType: ['parameters'],
          },
        },
        default: '',
        required: true,
        description: 'State code (e.g., NY)',
      },
      {
        displayName: 'City Name',
        name: 'redfinAgentSearchCity',
        type: 'string',
        displayOptions: {
          show: {
            apiType: ['dataApi'],
            dataDomain: ['redfin'],
            redfinApiType: ['agentSearch'],
            redfinAgentSearchInputType: ['parameters'],
          },
        },
        default: '',
        required: true,
        description: 'City name',
      },
      {
        displayName: 'Input Type',
        name: 'redfinAgentProfileInputType',
        type: 'options',
        displayOptions: {
          show: {
            apiType: ['dataApi'],
            dataDomain: ['redfin'],
            redfinApiType: ['agentProfile'],
          },
        },
        options: [
          { name: 'Agent Slug', value: 'agent', description: 'Provide the agent slug' },
          { name: 'URL', value: 'url', description: 'Provide the full agent profile URL' },
        ],
        default: 'url',
        description: 'Choose how to identify the agent profile',
      },
      {
        displayName: 'Agent Profile URL',
        name: 'redfinAgentProfileUrl',
        type: 'string',
        displayOptions: {
          show: {
            apiType: ['dataApi'],
            dataDomain: ['redfin'],
            redfinApiType: ['agentProfile'],
            redfinAgentProfileInputType: ['url'],
          },
        },
        default: '',
        required: true,
        description: 'Full Redfin agent profile URL',
      },
      {
        displayName: 'Agent Slug',
        name: 'redfinAgentProfileAgent',
        type: 'string',
        displayOptions: {
          show: {
            apiType: ['dataApi'],
            dataDomain: ['redfin'],
            redfinApiType: ['agentProfile'],
            redfinAgentProfileInputType: ['agent'],
          },
        },
        default: '',
        required: true,
        description: 'Agent slug (e.g., michael-kowalski)',
      },
      {
        displayName: 'Advanced Options',
        name: 'redfinApiOptions',
        type: 'collection',
        placeholder: 'Add Option',
        displayOptions: {
          show: {
            apiType: ['dataApi'],
            dataDomain: ['redfin'],
          },
        },
        default: {},
        description: 'Advanced options for Redfin API',
        options: [
          {
            displayName: 'Country',
            name: 'country',
            type: 'string',
            default: 'us',
            description: 'The 2 letter country code to scrape data from (e.g., us, ca)',
          },
          {
            displayName: 'TLD (Top Level Domain)',
            name: 'tld',
            type: 'options',
            options: [
              { name: '.COM (US)', value: 'com' },
              { name: '.CA (Canada)', value: 'ca' },
            ],
            default: 'com',
            description: 'The Redfin domain to scrape from',
          },
        ],
      },
    ];
  }

  static async execute(
    this: IExecuteFunctions,
    index: number,
    credentials: IScrapeOpsApiOptions,
  ): Promise<any> {
    const dataDomain = this.getNodeParameter('dataDomain', index) as string;
    let baseUrl = '';
    const qsParams: Record<string, any> = {};

    if (dataDomain === 'amazon') {
      const amazonApiType = this.getNodeParameter('amazonApiType', index) as string;
      const amazonApiOptions = this.getNodeParameter(
        'amazonApiOptions',
        index,
        {},
      ) as IAmazonApiOptions;

      if (amazonApiOptions.country) qsParams.country = amazonApiOptions.country;
      if (amazonApiOptions.tld) qsParams.tld = amazonApiOptions.tld;

      if (amazonApiType === 'product') {
        baseUrl = `${API_BASE_URL}/structured-data/amazon/product`;
        const inputType = this.getNodeParameter('amazonProductInputType', index) as string;

        if (inputType === 'asin') {
          const asin = this.getNodeParameter('amazonProductAsin', index) as string;
          qsParams.asin = asin;
        } else if (inputType === 'url') {
          const url = this.getNodeParameter('amazonProductUrl', index) as string;
          qsParams.url = url;
        }
      } else if (amazonApiType === 'search') {
        baseUrl = `${API_BASE_URL}/structured-data/amazon/search`;
        const inputType = this.getNodeParameter('amazonSearchInputType', index) as string;

        if (inputType === 'query') {
          const query = this.getNodeParameter('amazonSearchQuery', index) as string;
          qsParams.query = query;
        } else if (inputType === 'url') {
          const url = this.getNodeParameter('amazonSearchUrl', index) as string;
          qsParams.url = url;
        }
      } else {
        throw new NodeOperationError(
          this.getNode(),
          `Unsupported Amazon API type: ${amazonApiType}. Please select a valid API type.`,
          { itemIndex: index },
        );
      }
    } else if (dataDomain === 'ebay') {
      const ebayApiType = this.getNodeParameter('ebayApiType', index) as string;

      if (ebayApiType === 'product') {
        baseUrl = `${API_BASE_URL}/structured-data/ebay/product`;
        const inputType = this.getNodeParameter('ebayProductInputType', index) as string;

        if (inputType === 'itemId') {
          const itemId = this.getNodeParameter('ebayProductItemId', index) as string;
          qsParams.item_id = itemId;
        } else if (inputType === 'url') {
          const url = this.getNodeParameter('ebayProductUrl', index) as string;
          qsParams.url = url;
        }
      } else if (ebayApiType === 'search') {
        baseUrl = `${API_BASE_URL}/structured-data/ebay/search`;
        const inputType = this.getNodeParameter('ebaySearchInputType', index) as string;

        if (inputType === 'query') {
          const query = this.getNodeParameter('ebaySearchQuery', index) as string;
          qsParams.query = query;
        } else if (inputType === 'url') {
          const url = this.getNodeParameter('ebaySearchUrl', index) as string;
          qsParams.url = url;
        }
      } else if (ebayApiType === 'feedback') {
        baseUrl = `${API_BASE_URL}/structured-data/ebay/feedback`;
        const inputType = this.getNodeParameter('ebayFeedbackInputType', index) as string;

        if (inputType === 'username') {
          const username = this.getNodeParameter('ebayFeedbackUsername', index) as string;
          qsParams.username = username;
        } else if (inputType === 'url') {
          const url = this.getNodeParameter('ebayFeedbackUrl', index) as string;
          qsParams.url = url;
        }
      } else if (ebayApiType === 'category') {
        baseUrl = `${API_BASE_URL}/structured-data/ebay/category`;
        const inputType = this.getNodeParameter('ebayCategoryInputType', index) as string;

        if (inputType === 'categoryId') {
          const categoryId = this.getNodeParameter('ebayCategoryId', index) as string;
          qsParams.category_id = categoryId;
        } else if (inputType === 'url') {
          const url = this.getNodeParameter('ebayCategoryUrl', index) as string;
          qsParams.url = url;
        }
      } else if (ebayApiType === 'store') {
        baseUrl = `${API_BASE_URL}/structured-data/ebay/store`;
        const inputType = this.getNodeParameter('ebayStoreInputType', index) as string;

        if (inputType === 'storeName') {
          const storeName = this.getNodeParameter('ebayStoreName', index) as string;
          qsParams.store_name = storeName;
        } else if (inputType === 'url') {
          const url = this.getNodeParameter('ebayStoreUrl', index) as string;
          qsParams.url = url;
        }
      } else {
        throw new NodeOperationError(
          this.getNode(),
          `Unsupported eBay API type: ${ebayApiType}. Please select product, search, feedback, category, or store.`,
          { itemIndex: index },
        );
      }
    } else if (dataDomain === 'walmart') {
      const walmartApiType = this.getNodeParameter('walmartApiType', index) as string;
      const walmartApiOptions = this.getNodeParameter(
        'walmartApiOptions',
        index,
        {},
      ) as IWalmartApiOptions;

      if (walmartApiOptions.country) qsParams.country = walmartApiOptions.country;
      if (walmartApiOptions.tld) qsParams.tld = walmartApiOptions.tld;

      if (walmartApiType === 'product') {
        baseUrl = `${API_BASE_URL}/structured-data/walmart/product`;
        const inputType = this.getNodeParameter('walmartProductInputType', index) as string;

        if (inputType === 'productId') {
          const productId = this.getNodeParameter('walmartProductId', index) as string;
          qsParams.product_id = productId;
        } else if (inputType === 'url') {
          const url = this.getNodeParameter('walmartProductUrl', index) as string;
          qsParams.url = url;
        }
      } else if (walmartApiType === 'search') {
        baseUrl = `${API_BASE_URL}/structured-data/walmart/search`;
        const inputType = this.getNodeParameter('walmartSearchInputType', index) as string;

        if (inputType === 'query') {
          const query = this.getNodeParameter('walmartSearchQuery', index) as string;
          qsParams.query = query;
        } else if (inputType === 'url') {
          const url = this.getNodeParameter('walmartSearchUrl', index) as string;
          qsParams.url = url;
        }
      } else if (walmartApiType === 'review') {
        baseUrl = `${API_BASE_URL}/structured-data/walmart/reviews`;
        const inputType = this.getNodeParameter('walmartReviewInputType', index) as string;

        if (inputType === 'productId') {
          const productId = this.getNodeParameter('walmartReviewProductId', index) as string;
          qsParams.product_id = productId;
        } else if (inputType === 'url') {
          const url = this.getNodeParameter('walmartReviewUrl', index) as string;
          qsParams.url = url;
        }
      } else if (walmartApiType === 'shop') {
        baseUrl = `${API_BASE_URL}/structured-data/walmart/shop`;
        const inputType = this.getNodeParameter('walmartShopInputType', index) as string;

        if (inputType === 'shopId') {
          const shopId = this.getNodeParameter('walmartShopId', index) as string;
          qsParams.shop_id = shopId;
        } else if (inputType === 'url') {
          const url = this.getNodeParameter('walmartShopUrl', index) as string;
          qsParams.url = url;
        }
      } else if (walmartApiType === 'browse') {
        baseUrl = `${API_BASE_URL}/structured-data/walmart/browse`;
        const inputType = this.getNodeParameter('walmartBrowseInputType', index) as string;

        if (inputType === 'browsePath') {
          const browsePath = this.getNodeParameter('walmartBrowsePath', index) as string;
          qsParams.browse_path = browsePath;
        } else if (inputType === 'url') {
          const url = this.getNodeParameter('walmartBrowseUrl', index) as string;
          qsParams.url = url;
        }
      } else if (walmartApiType === 'category') {
        baseUrl = `${API_BASE_URL}/structured-data/walmart/category`;
        const inputType = this.getNodeParameter('walmartCategoryInputType', index) as string;

        if (inputType === 'categoryId') {
          const categoryId = this.getNodeParameter('walmartCategoryId', index) as string;
          qsParams.category_id = categoryId;
        } else if (inputType === 'url') {
          const url = this.getNodeParameter('walmartCategoryUrl', index) as string;
          qsParams.url = url;
        }
      } else {
        throw new NodeOperationError(
          this.getNode(),
          `Unsupported Walmart API type: ${walmartApiType}. Please select product, search, review, shop, browse, or category.`,
          { itemIndex: index },
        );
      }
    } else if (dataDomain === 'indeed') {
      const indeedApiType = this.getNodeParameter('indeedApiType', index) as string;

      switch (indeedApiType) {
        case 'jobSearch': {
          baseUrl = `${API_BASE_URL}/structured-data/indeed/job-search`;
          const inputType = this.getNodeParameter('indeedJobSearchInputType', index) as string;

          if (inputType === 'query') {
            const query = this.getNodeParameter('indeedJobSearchQuery', index) as string;
            qsParams.query = query;
          } else {
            const url = this.getNodeParameter('indeedJobSearchUrl', index) as string;
            qsParams.url = url;
          }
          break;
        }
        case 'jobDetail': {
          baseUrl = `${API_BASE_URL}/structured-data/indeed/job-detail`;
          const inputType = this.getNodeParameter('indeedJobDetailInputType', index) as string;

          if (inputType === 'jobId') {
            const jobId = this.getNodeParameter('indeedJobDetailJobId', index) as string;
            qsParams.job_id = jobId;
          } else {
            const url = this.getNodeParameter('indeedJobDetailUrl', index) as string;
            qsParams.url = url;
          }
          break;
        }
        case 'companySearch': {
          baseUrl = `${API_BASE_URL}/structured-data/indeed/company-search`;
          const inputType = this.getNodeParameter('indeedCompanySearchInputType', index) as string;

          if (inputType === 'query') {
            const query = this.getNodeParameter('indeedCompanySearchQuery', index) as string;
            qsParams.query = query;
          } else {
            const url = this.getNodeParameter('indeedCompanySearchUrl', index) as string;
            qsParams.url = url;
          }
          break;
        }
        case 'topCompanies': {
          baseUrl = `${API_BASE_URL}/structured-data/indeed/top-companies`;
          const inputType = this.getNodeParameter('indeedTopCompaniesInputType', index) as string;

          if (inputType === 'url') {
            const url = this.getNodeParameter('indeedTopCompaniesUrl', index) as string;
            qsParams.url = url;
          } else {
            const industry = this.getNodeParameter('indeedTopCompaniesIndustry', index, '') as string;
            if (industry) {
              qsParams.industry = industry;
            }
          }
          break;
        }
        case 'companySnapshot': {
          baseUrl = `${API_BASE_URL}/structured-data/indeed/company-snapshot`;
          const inputType = this.getNodeParameter('indeedCompanySnapshotInputType', index) as string;

          if (inputType === 'companyId') {
            const companyId = this.getNodeParameter('indeedCompanySnapshotId', index) as string;
            qsParams.company_id = companyId;
          } else {
            const url = this.getNodeParameter('indeedCompanySnapshotUrl', index) as string;
            qsParams.url = url;
          }
          break;
        }
        case 'companyAbout': {
          baseUrl = `${API_BASE_URL}/structured-data/indeed/company-about`;
          const inputType = this.getNodeParameter('indeedCompanyAboutInputType', index) as string;

          if (inputType === 'companyId') {
            const companyId = this.getNodeParameter('indeedCompanyAboutId', index) as string;
            qsParams.company_id = companyId;
          } else {
            const url = this.getNodeParameter('indeedCompanyAboutUrl', index) as string;
            qsParams.url = url;
          }
          break;
        }
        case 'companyReviews': {
          baseUrl = `${API_BASE_URL}/structured-data/indeed/company-reviews`;
          const inputType = this.getNodeParameter('indeedCompanyReviewsInputType', index) as string;

          if (inputType === 'companyId') {
            const companyId = this.getNodeParameter('indeedCompanyReviewsId', index) as string;
            qsParams.company_id = companyId;
          } else {
            const url = this.getNodeParameter('indeedCompanyReviewsUrl', index) as string;
            qsParams.url = url;
          }
          break;
        }
        case 'companyJobs': {
          baseUrl = `${API_BASE_URL}/structured-data/indeed/company-jobs`;
          const inputType = this.getNodeParameter('indeedCompanyJobsInputType', index) as string;

          if (inputType === 'companyId') {
            const companyId = this.getNodeParameter('indeedCompanyJobsId', index) as string;
            qsParams.company_id = companyId;
          } else {
            const url = this.getNodeParameter('indeedCompanyJobsUrl', index) as string;
            qsParams.url = url;
          }
          break;
        }
        default:
          throw new NodeOperationError(
            this.getNode(),
            `Unsupported Indeed API type: ${indeedApiType}`,
            { itemIndex: index },
          );
      }

      const indeedApiOptions = this.getNodeParameter('indeedApiOptions', index, {}) as IIndeedApiOptions;

      const addStringOption = (value: string | undefined, qsKey: string) => {
        if (value) qsParams[qsKey] = value;
      };

      addStringOption(indeedApiOptions.country, 'country');
      addStringOption(indeedApiOptions.tld, 'tld');
    } else if (dataDomain === 'redfin') {
      const redfinApiType = this.getNodeParameter('redfinApiType', index) as string;

      switch (redfinApiType) {
        case 'saleSearch': {
          baseUrl = `${API_BASE_URL}/structured-data/redfin/sale-search`;
          const inputType = this.getNodeParameter('redfinSaleSearchInputType', index) as string;
          if (inputType === 'url') {
            const url = this.getNodeParameter('redfinSaleSearchUrl', index) as string;
            qsParams.url = url;
          } else {
            qsParams.city_id = this.getNodeParameter('redfinSaleSearchCityId', index) as string;
            qsParams.state = this.getNodeParameter('redfinSaleSearchState', index) as string;
            qsParams.city = this.getNodeParameter('redfinSaleSearchCity', index) as string;
          }
          break;
        }
        case 'rentSearch': {
          baseUrl = `${API_BASE_URL}/structured-data/redfin/rent-search`;
          const inputType = this.getNodeParameter('redfinRentSearchInputType', index) as string;
          if (inputType === 'url') {
            const url = this.getNodeParameter('redfinRentSearchUrl', index) as string;
            qsParams.url = url;
          } else {
            qsParams.city_id = this.getNodeParameter('redfinRentSearchCityId', index) as string;
            qsParams.state = this.getNodeParameter('redfinRentSearchState', index) as string;
            qsParams.city = this.getNodeParameter('redfinRentSearchCity', index) as string;
          }
          break;
        }
        case 'saleDetail': {
          baseUrl = `${API_BASE_URL}/structured-data/redfin/sale-detail`;
          const inputType = this.getNodeParameter('redfinSaleDetailInputType', index) as string;
          if (inputType === 'url') {
            const url = this.getNodeParameter('redfinSaleDetailUrl', index) as string;
            qsParams.url = url;
          } else {
            qsParams.state = this.getNodeParameter('redfinSaleDetailState', index) as string;
            qsParams.path = this.getNodeParameter('redfinSaleDetailPath', index) as string;
            qsParams.home_id = this.getNodeParameter('redfinSaleDetailHomeId', index) as string;
          }
          break;
        }
        case 'rentDetail': {
          baseUrl = `${API_BASE_URL}/structured-data/redfin/rent-detail`;
          const inputType = this.getNodeParameter('redfinRentDetailInputType', index) as string;
          if (inputType === 'url') {
            const url = this.getNodeParameter('redfinRentDetailUrl', index) as string;
            qsParams.url = url;
          } else {
            qsParams.state = this.getNodeParameter('redfinRentDetailState', index) as string;
            qsParams.path = this.getNodeParameter('redfinRentDetailPath', index) as string;
            qsParams.property_id = this.getNodeParameter('redfinRentDetailPropertyId', index) as string;
          }
          break;
        }
        case 'buildingDetail': {
          baseUrl = `${API_BASE_URL}/structured-data/redfin/building-detail`;
          const inputType = this.getNodeParameter('redfinBuildingDetailInputType', index) as string;
          if (inputType === 'url') {
            const url = this.getNodeParameter('redfinBuildingDetailUrl', index) as string;
            qsParams.url = url;
          } else {
            qsParams.state = this.getNodeParameter('redfinBuildingDetailState', index) as string;
            qsParams.city = this.getNodeParameter('redfinBuildingDetailCity', index) as string;
            qsParams.building = this.getNodeParameter('redfinBuildingDetailBuilding', index) as string;
            const buildingType = this.getNodeParameter('redfinBuildingDetailBuildingType', index, '') as string;
            if (buildingType) {
              qsParams.building_type = buildingType;
            }
            qsParams.building_id = this.getNodeParameter('redfinBuildingDetailBuildingId', index) as string;
          }
          break;
        }
        case 'stateSearch': {
          baseUrl = `${API_BASE_URL}/structured-data/redfin/state-search`;
          const inputType = this.getNodeParameter('redfinStateSearchInputType', index) as string;
          if (inputType === 'url') {
            const url = this.getNodeParameter('redfinStateSearchUrl', index) as string;
            qsParams.url = url;
          } else {
            qsParams.state = this.getNodeParameter('redfinStateSearchState', index) as string;
          }
          break;
        }
        case 'agentSearch': {
          baseUrl = `${API_BASE_URL}/structured-data/redfin/agent-search`;
          const inputType = this.getNodeParameter('redfinAgentSearchInputType', index) as string;
          if (inputType === 'url') {
            const url = this.getNodeParameter('redfinAgentSearchUrl', index) as string;
            qsParams.url = url;
          } else {
            qsParams.city_id = this.getNodeParameter('redfinAgentSearchCityId', index) as string;
            qsParams.state = this.getNodeParameter('redfinAgentSearchState', index) as string;
            qsParams.city = this.getNodeParameter('redfinAgentSearchCity', index) as string;
          }
          break;
        }
        case 'agentProfile': {
          baseUrl = `${API_BASE_URL}/structured-data/redfin/agent-profile`;
          const inputType = this.getNodeParameter('redfinAgentProfileInputType', index) as string;
          if (inputType === 'url') {
            const url = this.getNodeParameter('redfinAgentProfileUrl', index) as string;
            qsParams.url = url;
          } else {
            const agentSlug = this.getNodeParameter('redfinAgentProfileAgent', index) as string;
            qsParams.agent = agentSlug;
          }
          break;
        }
        default:
          throw new NodeOperationError(
            this.getNode(),
            `Unsupported Redfin API type: ${redfinApiType}`,
            { itemIndex: index },
          );
      }

      const redfinApiOptions = this.getNodeParameter('redfinApiOptions', index, {}) as IRedfinApiOptions;

      if (redfinApiOptions.country) {
        qsParams.country = redfinApiOptions.country;
      }
      if (redfinApiOptions.tld) {
        qsParams.tld = redfinApiOptions.tld;
      }
    } else {
      throw new NodeOperationError(
        this.getNode(),
        `Unsupported data domain: ${dataDomain}. Please select a supported domain.`,
        { itemIndex: index },
      );
    }

    const options: IRequestOptions = {
      method: 'GET' as IHttpRequestMethods,
      url: baseUrl,
      qs: qsParams,
      json: true,
    };

    try {
      const responseData = await this.helpers.requestWithAuthentication.call(
        this,
        'scrapeOpsApi',
        options,
      );
      return responseData;
    } catch (error: any) {
      if (error.response && error.response.body) {
        const domainLabel = dataDomain
          ? `${dataDomain.charAt(0).toUpperCase()}${dataDomain.slice(1)}`
          : 'Data';
        throw new NodeOperationError(
          this.getNode(),
          `ScrapeOps ${domainLabel} API request failed: ${
            error.response.body.message || error.message
          }`,
          { itemIndex: index },
        );
      }
      throw error;
    }
  }
}

