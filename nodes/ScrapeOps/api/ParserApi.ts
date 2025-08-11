import {
  IExecuteFunctions,
  NodeOperationError,
  IHttpRequestMethods,
  IRequestOptions,
  INodeProperties,
} from 'n8n-workflow';
import { IScrapeOpsApiOptions } from './types';

export class ParserApi {
  static getNodeProperties(): INodeProperties[] {
    return [
      {
        displayName: 'Domain',
        name: 'parserDomain',
        type: 'options',
        displayOptions: {
          show: {
            apiType: ['parserApi'],
          },
        },
        options: [
          { name: 'Amazon', value: 'amazon' },
          { name: 'eBay', value: 'ebay' },
          { name: 'Indeed', value: 'indeed' },
          { name: 'Redfin', value: 'redfin' },
          { name: 'Walmart', value: 'walmart' },
        ],
        default: 'amazon',
        description: 'Domain to parse or select Custom Domain for custom parsing',
      },
      {
        displayName: 'Page Type',
        name: 'parserPageType',
        type: 'options',
        displayOptions: {
          show: {
            apiType: ['parserApi'],
            parserDomain: ['amazon'],
          },
        },
        options: [
          { name: 'Product Page', value: 'product' },
          { name: 'Reviews Page', value: 'reviews' },
          { name: 'Search Page', value: 'search' },
        ],
        default: 'product',
        description: 'Type of Amazon page to parse',
      },
      {
        displayName: 'Page Type',
        name: 'ebayParserPageType',
        type: 'options',
        displayOptions: {
          show: {
            apiType: ['parserApi'],
            parserDomain: ['ebay'],
          },
        },
        options: [
          { name: 'Category Page', value: 'category' },
          { name: 'Feedback Page', value: 'feedback' },
          { name: 'Product Page', value: 'product' },
          { name: 'Search Page', value: 'search' },
          { name: 'Store Page', value: 'store' },
        ],
        default: 'product',
        description: 'Type of eBay page to parse',
      },
      {
        displayName: 'Page Type',
        name: 'walmartParserPageType',
        type: 'options',
        displayOptions: {
          show: {
            apiType: ['parserApi'],
            parserDomain: ['walmart'],
          },
        },

        options: [
          { name: 'Browse Page', value: 'browse' },
          { name: 'Category Page', value: 'category' },
          { name: 'Product Page', value: 'product' },
          { name: 'Reviews Page', value: 'reviews' },
          { name: 'Search Page', value: 'search' },
          { name: 'Shop Page', value: 'shop' },
        ],
        default: 'product',
        description: 'Type of Walmart page to parse',
      },
      {
        displayName: 'Page Type',
        name: 'indeedParserPageType',
        type: 'options',
        displayOptions: {
          show: {
            apiType: ['parserApi'],
            parserDomain: ['indeed'],
          },
        },
        options: [
          { name: 'Company Page', value: 'company' },
          { name: 'Job Detail Page', value: 'job' },
          { name: 'Search Page', value: 'search' },
        ],
        default: 'job',
        description: 'Type of Indeed page to parse',
      },
      {
        displayName: 'Page Type',
        name: 'redfinParserPageType',
        type: 'options',
        displayOptions: {
          show: {
            apiType: ['parserApi'],
            parserDomain: ['redfin'],
          },
        },
        options: [
          { name: 'Agent Page', value: 'agent' },
          { name: 'Property Page', value: 'property' },
          { name: 'Search Page', value: 'search' },
        ],
        default: 'property',
        description: 'Type of Redfin page to parse',
      },
      {
        displayName: 'URL',
        name: 'parserUrl',
        type: 'string',
        displayOptions: {
          show: {
            apiType: ['parserApi'],
          },
        },
        default: '',
        required: true,
        description: 'URL of the page being parsed',
      },
      {
        displayName: 'HTML Content',
        name: 'parserHtml',
        type: 'string',
        typeOptions: {
          rows: 8,
        },
        displayOptions: {
          show: {
            apiType: ['parserApi'],
          },
        },
        default: '',
        required: true,
        description: 'HTML content to parse',
      },
    ];
  }

  static async execute(
    this: IExecuteFunctions,
    index: number,
    credentials: IScrapeOpsApiOptions,
  ): Promise<any> {
    const parserDomain = this.getNodeParameter('parserDomain', index) as string;
    const url = this.getNodeParameter('parserUrl', index) as string;
    const html = this.getNodeParameter('parserHtml', index) as string;

    let parserEndpoint = '';

    switch (parserDomain) {
      case 'amazon':
        parserEndpoint = 'https://parser.scrapeops.io/v2/amazon';
        break;
      case 'ebay':
        parserEndpoint = 'https://parser.scrapeops.io/v2/ebay';
        break;
      case 'walmart':
        parserEndpoint = 'https://parser.scrapeops.io/v2/walmart';
        break;
      case 'indeed':
        parserEndpoint = 'https://parser.scrapeops.io/v2/indeed';
        break;
      case 'redfin':
        parserEndpoint = 'https://parser.scrapeops.io/v2/redfin';
        break;
      default:
        throw new NodeOperationError(this.getNode(), `Unsupported parser domain: ${parserDomain}`, { itemIndex: index });
    }

    const requestBody = {
      url: url,
      html: html,
    };

    const options: IRequestOptions = {
      method: 'POST' as IHttpRequestMethods,
      url: parserEndpoint,
      body: requestBody,
      json: true,
    };

    try {
      const responseData = await this.helpers.requestWithAuthentication.call(this, 'scrapeOpsApi', options);
      return responseData;
    } catch (error) {
      if (error.response && error.response.body) {
        throw new NodeOperationError(
          this.getNode(),
          `ScrapeOps Parser API request failed: ${error.response.body.message || error.message}`,
          { itemIndex: index }
        );
      }
      throw error;
    }
  }
}
