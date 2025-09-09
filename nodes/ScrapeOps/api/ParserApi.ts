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
