import {
  IExecuteFunctions,
  NodeOperationError,
  IHttpRequestMethods,
  IRequestOptions,
  INodeProperties,
} from 'n8n-workflow';
import { IAmazonApiOptions, IWalmartApiOptions, IScrapeOpsApiOptions } from './types';

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
        ],
        default: 'amazon',
        description: 'Domain data to retrieve',
      },
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
        default: 'asin',
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
        default: 'query',
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
        displayName: 'Amazon API Options',
        name: 'amazonApiOptions',
        type: 'collection',
        displayOptions: {
          show: {
            apiType: ['dataApi'],
            dataDomain: ['amazon'],
          },
        },
        default: {},
        description: 'Additional options for Amazon API',
        placeholder: 'Add Option',
        options: [
          {
            displayName: 'Country',
            name: 'country',
            type: 'string',
            default: 'us',
            description: 'The 2 letter country code where you want the product data to be scraped from (e.g., us, uk, ca, de, fr)',
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
      {
        displayName: 'eBay API Type',
        name: 'ebayApiType',
        displayName: 'Walmart API Type',
        name: 'walmartApiType',
        type: 'options',
        displayOptions: {
          show: {
            apiType: ['dataApi'],
            dataDomain: ['ebay'],
            dataDomain: ['walmart'],
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
            name: 'Browse API',
            value: 'browse',
            description: 'Retrieve data for a Walmart browse page by Browse Path or URL',
          },
          {
            name: 'Category API',
            value: 'category',
            description: 'Retrieve data for a Walmart category by Category ID or URL',
          },
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
            dataDomain: ['ebay'],
            ebayApiType: ['product'],
            dataDomain: ['walmart'],
            walmartApiType: ['product'],
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
        default: 'itemId',
        description: 'Type of input for the eBay Product API request',
      },
      {
        displayName: 'Item ID',
        name: 'ebayProductItemId',
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
        default: 'productId',
        description: 'Type of input for Walmart Product API',
      },
      {
        displayName: 'Product ID',
        name: 'walmartProductId',
        type: 'string',
        displayOptions: {
          show: {
            apiType: ['dataApi'],
            dataDomain: ['ebay'],
            ebayApiType: ['product'],
            ebayProductInputType: ['itemId'],
            dataDomain: ['walmart'],
            walmartApiType: ['product'],
            walmartProductInputType: ['productId'],
          },
        },
        default: '',
        required: true,
        description: 'eBay item ID for the product you want to retrieve',
      },
      {
        displayName: 'Product URL',
        name: 'ebayProductUrl',
        description: 'Walmart Product ID of the product to retrieve',
      },
      {
        displayName: 'Product URL',
        name: 'walmartProductUrl',
        type: 'string',
        displayOptions: {
          show: {
            apiType: ['dataApi'],
            dataDomain: ['ebay'],
            ebayApiType: ['product'],
            ebayProductInputType: ['url'],
            dataDomain: ['walmart'],
            walmartApiType: ['product'],
            walmartProductInputType: ['url'],
          },
        },
        default: '',
        required: true,
        description: 'Full eBay product URL (remember to URL encode before sending)',
      },
      {
        displayName: 'Input Type',
        name: 'ebaySearchInputType',
        description: 'Full URL of the Walmart product page',
      },
      {
        displayName: 'Input Type',
        name: 'walmartReviewInputType',
        type: 'options',
        displayOptions: {
          show: {
            apiType: ['dataApi'],
            dataDomain: ['ebay'],
            ebayApiType: ['search'],
            dataDomain: ['walmart'],
            walmartApiType: ['review'],
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
        default: 'query',
        description: 'Type of input for the eBay Search API request',
      },
      {
        displayName: 'Search Query',
        name: 'ebaySearchQuery',
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
        default: 'productId',
        description: 'Type of input for Walmart Review API',
      },
      {
        displayName: 'Product ID',
        name: 'walmartReviewProductId',
        type: 'string',
        displayOptions: {
          show: {
            apiType: ['dataApi'],
            dataDomain: ['ebay'],
            ebayApiType: ['search'],
            ebaySearchInputType: ['query'],
            dataDomain: ['walmart'],
            walmartApiType: ['review'],
            walmartReviewInputType: ['productId'],
          },
        },
        default: '',
        required: true,
        description: 'Keyword or phrase to search for on eBay (e.g., laptop, sneakers)',
      },
      {
        displayName: 'Search URL',
        name: 'ebaySearchUrl',
        description: 'Walmart Product ID of the item whose reviews should be retrieved',
      },
      {
        displayName: 'Review URL',
        name: 'walmartReviewUrl',
        type: 'string',
        displayOptions: {
          show: {
            apiType: ['dataApi'],
            dataDomain: ['ebay'],
            ebayApiType: ['search'],
            ebaySearchInputType: ['url'],
            dataDomain: ['walmart'],
            walmartApiType: ['review'],
            walmartReviewInputType: ['url'],
          },
        },
        default: '',
        required: true,
        description: 'Full eBay search page URL (remember to URL encode before sending)',
      },
      {
        displayName: 'Input Type',
        name: 'ebayFeedbackInputType',
        description: 'Full URL of the Walmart review page',
      },
      {
        displayName: 'Input Type',
        name: 'walmartShopInputType',
        type: 'options',
        displayOptions: {
          show: {
            apiType: ['dataApi'],
            dataDomain: ['ebay'],
            ebayApiType: ['feedback'],
            dataDomain: ['walmart'],
            walmartApiType: ['shop'],
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
        default: 'username',
        description: 'Type of input for the eBay Feedback API request',
      },
      {
        displayName: 'Username',
        name: 'ebayFeedbackUsername',
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
        default: 'shopId',
        description: 'Type of input for Walmart Shop API',
      },
      {
        displayName: 'Shop ID',
        name: 'walmartShopId',
        type: 'string',
        displayOptions: {
          show: {
            apiType: ['dataApi'],
            dataDomain: ['ebay'],
            ebayApiType: ['feedback'],
            ebayFeedbackInputType: ['username'],
            dataDomain: ['walmart'],
            walmartApiType: ['shop'],
            walmartShopInputType: ['shopId'],
          },
        },
        default: '',
        required: true,
        description: 'Exact eBay username to retrieve feedback for',
      },
      {
        displayName: 'Feedback URL',
        name: 'ebayFeedbackUrl',
        description: 'Walmart Shop ID to retrieve',
      },
      {
        displayName: 'Shop URL',
        name: 'walmartShopUrl',
        type: 'string',
        displayOptions: {
          show: {
            apiType: ['dataApi'],
            dataDomain: ['ebay'],
            ebayApiType: ['feedback'],
            ebayFeedbackInputType: ['url'],
            dataDomain: ['walmart'],
            walmartApiType: ['shop'],
            walmartShopInputType: ['url'],
          },
        },
        default: '',
        required: true,
        description: 'Full eBay feedback page URL (remember to URL encode before sending)',
      },
      {
        displayName: 'Input Type',
        name: 'ebayCategoryInputType',
        description: 'Full URL of the Walmart shop page',
      },
      {
        displayName: 'Input Type',
        name: 'walmartBrowseInputType',
        type: 'options',
        displayOptions: {
          show: {
            apiType: ['dataApi'],
            dataDomain: ['ebay'],
            ebayApiType: ['category'],
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
        default: 'browsePath',
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
        description: 'Full URL of the Walmart browse page',
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
            description: 'eBay numeric category ID (e.g. 1648276), The Id after bn_ in the URL (https://www.ebay.com/b/Laptops/bn_1648276) is 1648276',
          },
          {
            name: 'Category URL',
            value: 'url',
            description: 'Full eBay category page URL (URL encode before sending)',
          },
        ],
        default: 'categoryId',
        description: 'Type of input for the eBay Category API request',
      },
      {
        displayName: 'Category ID',
        name: 'ebayCategoryId',
            description: 'Walmart Category ID',
          },
          {
            name: 'URL',
            value: 'url',
            description: 'Full Walmart category URL',
          },
        ],
        default: 'categoryId',
        description: 'Type of input for Walmart Category API',
      },
      {
        displayName: 'Category ID',
        name: 'walmartCategoryId',
        type: 'string',
        displayOptions: {
          show: {
            apiType: ['dataApi'],
            dataDomain: ['ebay'],
            ebayApiType: ['category'],
            ebayCategoryInputType: ['categoryId'],
            dataDomain: ['walmart'],
            walmartApiType: ['category'],
            walmartCategoryInputType: ['categoryId'],
          },
        },
        default: '',
        required: true,
        description: 'The eBay category identifier you want to scrape',
      },
      {
        displayName: 'Category URL',
        name: 'ebayCategoryUrl',
        description: 'Walmart Category ID to retrieve',
      },
      {
        displayName: 'Category URL',
        name: 'walmartCategoryUrl',
        type: 'string',
        displayOptions: {
          show: {
            apiType: ['dataApi'],
            dataDomain: ['ebay'],
            ebayApiType: ['category'],
            ebayCategoryInputType: ['url'],
            dataDomain: ['walmart'],
            walmartApiType: ['category'],
            walmartCategoryInputType: ['url'],
          },
        },
        default: '',
        required: true,
        description: 'Full eBay category page URL (remember to URL encode before sending)',
      },
      {
        displayName: 'Input Type',
        name: 'ebayStoreInputType',
        description: 'Full URL of the Walmart category page',
      },
      {
        displayName: 'Walmart API Options',
        name: 'walmartApiOptions',
        type: 'collection',
        displayOptions: {
          show: {
            apiType: ['dataApi'],
            dataDomain: ['walmart'],
          },
        },
        default: {},
        description: 'Additional options for Walmart API',
        placeholder: 'Add Option',
        options: [
          {
            displayName: 'Country',
            name: 'country',
            type: 'string',
            default: 'us',
            description: 'The 2 letter country code where you want the product data to be scraped from (e.g., us, ca, mx)',
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
      {
        displayName: 'Input Type',
        name: 'walmartSearchInputType',
        type: 'options',
        displayOptions: {
          show: {
            apiType: ['dataApi'],
            dataDomain: ['ebay'],
            ebayApiType: ['store'],
            dataDomain: ['walmart'],
            walmartApiType: ['search'],
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
        default: 'storeName',
        description: 'Type of input for the eBay Store API request',
      },
      {
        displayName: 'Store Name',
        name: 'ebayStoreName',
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
        default: 'query',
        description: 'Type of input for Walmart Product Search API',
      },
      {
        displayName: 'Search Query',
        name: 'walmartSearchQuery',
        type: 'string',
        displayOptions: {
          show: {
            apiType: ['dataApi'],
            dataDomain: ['ebay'],
            ebayApiType: ['store'],
            ebayStoreInputType: ['storeName'],
            dataDomain: ['walmart'],
            walmartApiType: ['search'],
            walmartSearchInputType: ['query'],
          },
        },
        default: '',
        required: true,
        description: 'Exact eBay storefront name you want to retrieve data for',
      },
      {
        displayName: 'Store URL',
        name: 'ebayStoreUrl',
        description: 'Search query for Walmart products',
      },
      {
        displayName: 'Search URL',
        name: 'walmartSearchUrl',
        type: 'string',
        displayOptions: {
          show: {
            apiType: ['dataApi'],
            dataDomain: ['ebay'],
            ebayApiType: ['store'],
            ebayStoreInputType: ['url'],
            dataDomain: ['walmart'],
            walmartApiType: ['search'],
            walmartSearchInputType: ['url'],
          },
        },
        default: '',
        required: true,
        description: 'Full eBay store page URL (remember to URL encode before sending)',
        description: 'Full Walmart search URL',
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
      const amazonApiOptions = this.getNodeParameter('amazonApiOptions', index, {}) as IAmazonApiOptions;

      if (amazonApiOptions.country) qsParams.country = amazonApiOptions.country;
      if (amazonApiOptions.tld) qsParams.tld = amazonApiOptions.tld;

      if (amazonApiType === 'product') {
        baseUrl = 'https://proxy.scrapeops.io/v1/structured-data/amazon/product';

        const inputType = this.getNodeParameter('amazonProductInputType', index) as string;


      if (amazonApiOptions.country) qsParams.country = amazonApiOptions.country;
      if (amazonApiOptions.tld) qsParams.tld = amazonApiOptions.tld;

      if (amazonApiType === 'product') {
        baseUrl = 'https://proxy.scrapeops.io/v1/structured-data/amazon/product';

        const inputType = this.getNodeParameter('amazonProductInputType', index) as string;

        if (inputType === 'asin') {
          const asin = this.getNodeParameter('amazonProductAsin', index) as string;
          qsParams.asin = asin;
        } else if (inputType === 'url') {
          const url = this.getNodeParameter('amazonProductUrl', index) as string;
          qsParams.url = url;
        }
      } else if (amazonApiType === 'search') {
        baseUrl = 'https://proxy.scrapeops.io/v1/structured-data/amazon/search';

        const inputType = this.getNodeParameter('amazonSearchInputType', index) as string;

        if (inputType === 'query') {
          const query = this.getNodeParameter('amazonSearchQuery', index) as string;
          qsParams.query = query;
        } else if (inputType === 'url') {
          const url = this.getNodeParameter('amazonSearchUrl', index) as string;
          qsParams.url = url;
        }
      }
    } else if (dataDomain === 'ebay') {
      const ebayApiType = this.getNodeParameter('ebayApiType', index) as string;

      if (ebayApiType === 'product') {
        baseUrl = 'https://proxy.scrapeops.io/v1/structured-data/ebay/product';

        const inputType = this.getNodeParameter('ebayProductInputType', index) as string;

        if (inputType === 'itemId') {
          const itemId = this.getNodeParameter('ebayProductItemId', index) as string;
          qsParams.item_id = itemId;
        } else if (inputType === 'url') {
          const url = this.getNodeParameter('ebayProductUrl', index) as string;
          qsParams.url = url;
        }
      } else if (ebayApiType === 'search') {
        baseUrl = 'https://proxy.scrapeops.io/v1/structured-data/ebay/search';

        const inputType = this.getNodeParameter('ebaySearchInputType', index) as string;

        if (inputType === 'query') {
          const query = this.getNodeParameter('ebaySearchQuery', index) as string;
          qsParams.query = query;
        } else if (inputType === 'url') {
          const url = this.getNodeParameter('ebaySearchUrl', index) as string;
          qsParams.url = url;
        }
      } else if (ebayApiType === 'feedback') {
        baseUrl = 'https://proxy.scrapeops.io/v1/structured-data/ebay/feedback';

        const inputType = this.getNodeParameter('ebayFeedbackInputType', index) as string;

        if (inputType === 'username') {
          const username = this.getNodeParameter('ebayFeedbackUsername', index) as string;
          qsParams.username = username;
        } else if (inputType === 'url') {
          const url = this.getNodeParameter('ebayFeedbackUrl', index) as string;
          qsParams.url = url;
        }
      } else if (ebayApiType === 'category') {
        baseUrl = 'https://proxy.scrapeops.io/v1/structured-data/ebay/category';

        const inputType = this.getNodeParameter('ebayCategoryInputType', index) as string;

      if (inputType === 'categoryId') {  
          const categoryId = this.getNodeParameter('ebayCategoryId', index) as string;
          qsParams.category_id = categoryId;
        } else if (inputType === 'url') {
          const url = this.getNodeParameter('ebayCategoryUrl', index) as string;
          qsParams.url = url;
        }
      } else if (ebayApiType === 'store') {
        baseUrl = 'https://proxy.scrapeops.io/v1/structured-data/ebay/store';

        const inputType = this.getNodeParameter('ebayStoreInputType', index) as string;

        if (inputType === 'storeName') {
          const storeName = this.getNodeParameter('ebayStoreName', index) as string;
          qsParams.store_name = storeName;
        } else if (inputType === 'url') {
          const url = this.getNodeParameter('ebayStoreUrl', index) as string;
      } else {
        throw new NodeOperationError(
          this.getNode(),
          `Unsupported Amazon API type: ${amazonApiType}. Please select a valid API type.`,
          { itemIndex: index },
        );
      }
    } else if (dataDomain === 'walmart') {
      const walmartApiType = this.getNodeParameter('walmartApiType', index) as string;
      const walmartApiOptions = this.getNodeParameter('walmartApiOptions', index, {}) as IWalmartApiOptions;

      if (walmartApiOptions.country) qsParams.country = walmartApiOptions.country;
      if (walmartApiOptions.tld) qsParams.tld = walmartApiOptions.tld;

      if (walmartApiType === 'product') {
        baseUrl = 'https://proxy.scrapeops.io/v1/structured-data/walmart/product';

        const inputType = this.getNodeParameter('walmartProductInputType', index) as string;

        if (inputType === 'productId') {
          const productId = this.getNodeParameter('walmartProductId', index) as string;
          qsParams.product_id = productId;
        } else if (inputType === 'url') {
          const url = this.getNodeParameter('walmartProductUrl', index) as string;
          qsParams.url = url;
        }
      } else if (walmartApiType === 'search') {
        baseUrl = 'https://proxy.scrapeops.io/v1/structured-data/walmart/search';

        const inputType = this.getNodeParameter('walmartSearchInputType', index) as string;

        if (inputType === 'query') {
          const query = this.getNodeParameter('walmartSearchQuery', index) as string;
          qsParams.query = query;
        } else if (inputType === 'url') {
          const url = this.getNodeParameter('walmartSearchUrl', index) as string;
          qsParams.url = url;
        }
      } else if (walmartApiType === 'review') {
        baseUrl = 'https://proxy.scrapeops.io/v1/structured-data/walmart/reviews';

        const inputType = this.getNodeParameter('walmartReviewInputType', index) as string;

        if (inputType === 'productId') {
          const productId = this.getNodeParameter('walmartReviewProductId', index) as string;
          qsParams.product_id = productId;
        } else if (inputType === 'url') {
          const url = this.getNodeParameter('walmartReviewUrl', index) as string;
          qsParams.url = url;
        }
      } else if (walmartApiType === 'shop') {
        baseUrl = 'https://proxy.scrapeops.io/v1/structured-data/walmart/shop';

        const inputType = this.getNodeParameter('walmartShopInputType', index) as string;

        if (inputType === 'shopId') {
          const shopId = this.getNodeParameter('walmartShopId', index) as string;
          qsParams.shop_id = shopId;
        } else if (inputType === 'url') {
          const url = this.getNodeParameter('walmartShopUrl', index) as string;
          qsParams.url = url;
        }
      } else if (walmartApiType === 'browse') {
        baseUrl = 'https://proxy.scrapeops.io/v1/structured-data/walmart/browse';

        const inputType = this.getNodeParameter('walmartBrowseInputType', index) as string;

        if (inputType === 'browsePath') {
          const browsePath = this.getNodeParameter('walmartBrowsePath', index) as string;
          qsParams.browse_path = browsePath;
        } else if (inputType === 'url') {
          const url = this.getNodeParameter('walmartBrowseUrl', index) as string;
          qsParams.url = url;
        }
      } else if (walmartApiType === 'category') {
        baseUrl = 'https://proxy.scrapeops.io/v1/structured-data/walmart/category';

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
          `Unsupported eBay API type: ${ebayApiType}. Please select product, search, feedback, category, or store.`,
          { itemIndex: index },
        );
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
      const responseData = await this.helpers.requestWithAuthentication.call(this, 'scrapeOpsApi', options);
      return responseData;
    } catch (error) {
      if (error.response && error.response.body) {
        const domainLabel = dataDomain ? `${dataDomain.charAt(0).toUpperCase()}${dataDomain.slice(1)}` : 'Data';
        throw new NodeOperationError(
          this.getNode(),
          `ScrapeOps ${domainLabel} API request failed: ${error.response.body.message || error.message}`,
          { itemIndex: index }
        );
      }
      throw error;
    }
  }
}
