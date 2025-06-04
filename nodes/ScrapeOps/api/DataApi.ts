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
    ];
  }

  static async execute(
    this: IExecuteFunctions,
    index: number,
    credentials: IScrapeOpsApiOptions,
  ): Promise<any> {
    const amazonApiType = this.getNodeParameter('amazonApiType', index) as string;
    const amazonApiOptions = this.getNodeParameter('amazonApiOptions', index, {}) as IAmazonApiOptions;

    let baseUrl = '';
    let queryParams = `api_key=${credentials.apiKey}`;

    if (amazonApiOptions.country) queryParams += `&country=${amazonApiOptions.country}`;
    if (amazonApiOptions.tld) queryParams += `&tld=${amazonApiOptions.tld}`;

    if (amazonApiType === 'product') {
      baseUrl = 'https://proxy.scrapeops.io/v1/structured-data/amazon/product';

      const inputType = this.getNodeParameter('amazonProductInputType', index) as string;

      if (inputType === 'asin') {
        const asin = this.getNodeParameter('amazonProductAsin', index) as string;
        queryParams += `&asin=${asin}`;
      } else if (inputType === 'url') {
        const url = this.getNodeParameter('amazonProductUrl', index) as string;
        queryParams += `&url=${url}`;
      }
    } else if (amazonApiType === 'search') {
      baseUrl = 'https://proxy.scrapeops.io/v1/structured-data/amazon/search';

      const inputType = this.getNodeParameter('amazonSearchInputType', index) as string;

      if (inputType === 'query') {
        const query = this.getNodeParameter('amazonSearchQuery', index) as string;
        queryParams += `&query=${query}`;
      } else if (inputType === 'url') {
        const url = this.getNodeParameter('amazonSearchUrl', index) as string;
        queryParams += `&url=${url}`;
      }
    }

    const finalUrl = `${baseUrl}?${queryParams}`;

    const options: IRequestOptions = {
      method: 'GET' as IHttpRequestMethods,
      url: finalUrl,
      json: true,
    };

    try {
      const responseData = await this.helpers.request(options);
      return responseData;
    } catch (error) {
      if (error.response && error.response.body) {
        throw new NodeOperationError(
          this.getNode(),
          `ScrapeOps Amazon API request failed: ${error.response.body.message || error.message}`,
          { itemIndex: index }
        );
      }
      throw error;
    }
  }
}
