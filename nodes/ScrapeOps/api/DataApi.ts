import {
  IExecuteFunctions,
  NodeOperationError,
  IHttpRequestMethods,
  IRequestOptions,
  INodeProperties,
} from 'n8n-workflow';
import { IAmazonApiOptions, IScrapeOpsApiOptions } from './types';

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
        default: 'itemId',
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
        default: 'query',
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
        default: 'username',
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
        default: 'storeName',
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
        const domainLabel = dataDomain === 'amazon' ? 'Amazon' : dataDomain === 'ebay' ? 'eBay' : 'Data';
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
