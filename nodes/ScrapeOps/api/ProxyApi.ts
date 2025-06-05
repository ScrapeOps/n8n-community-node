import {
  IExecuteFunctions,
  INodeExecutionData,
  NodeOperationError,
  IHttpRequestMethods,
  IRequestOptions,
  INodeProperties,
} from 'n8n-workflow';
import { IProxyAdvancedOptions, IScrapeOpsApiOptions } from './types';

export class ProxyApi {
  static getNodeProperties(): INodeProperties[] {
    return [
      {
        displayName: 'URL',
        name: 'url',
        type: 'string',
        displayOptions: {
          show: {
            apiType: ['proxyApi'],
          },
        },
        default: '',
        required: true,
        description: 'The URL to scrape',
      },
      {
        displayName: 'Method',
        name: 'method',
        type: 'options',
        displayOptions: {
          show: {
            apiType: ['proxyApi'],
          },
        },
        options: [
          {
            name: 'GET',
            value: 'GET',
          },
          {
            name: 'POST',
            value: 'POST',
          },
        ],
        default: 'GET',
        description: 'The HTTP method to use for the request',
      },
      {
        displayName: 'Advanced Options',
        name: 'advancedOptions',
        type: 'collection',
        displayOptions: {
          show: {
            apiType: ['proxyApi'],
          },
        },
        default: {},
        description: 'Advanced options for proxy API',
        placeholder: 'Add Option',
        options: [
          {
            displayName: 'Country',
            name: 'country',
            type: 'options',
            options: [
              { name: 'Australia', value: 'au' },
              { name: 'Brazil', value: 'br' },
              { name: 'Canada', value: 'ca' },
              { name: 'France', value: 'fr' },
              { name: 'Germany', value: 'de' },
              { name: 'India', value: 'in' },
              { name: 'Italy', value: 'it' },
              { name: 'Japan', value: 'jp' },
              { name: 'Netherlands', value: 'nl' },
              { name: 'Spain', value: 'es' },
              { name: 'United Kingdom', value: 'gb' },
              { name: 'United States', value: 'us' },
            ],
            default: 'us',
            description: 'Country for geo-targeting',
          },
          {
            displayName: 'Custom Cookies',
            name: 'customCookies',
            type: 'json',
            default: '{}',
            description: 'Custom cookies as JSON object',
          },
          {
            displayName: 'Custom Headers',
            name: 'customHeaders',
            type: 'json',
            default: '{}',
            description: 'Custom headers as JSON object',
          },
          {
            displayName: 'Final Status Code',
            name: 'final_status_code',
            type: 'boolean',
            default: false,
            description: 'Whether to return the final status code in response headers',
          },
          {
            displayName: 'Follow Redirects',
            name: 'follow_redirects',
            type: 'boolean',
            default: true,
            description: 'Whether to follow redirects',
          },
          {
            displayName: 'Initial Status Code',
            name: 'initial_status_code',
            type: 'boolean',
            default: false,
            description: 'Whether to return the initial status code in response headers',
          },
          {
            displayName: 'Mobile Proxies',
            name: 'mobile_proxy',
            type: 'boolean',
            default: false,
            description: 'Whether to use mobile proxies for better success rates on mobile-optimized websites',
          },
          {
            displayName: 'Optimize Request',
            name: 'optimize_request',
            type: 'boolean',
            default: false,
            description: 'Whether to let ScrapeOps optimize the request settings for best performance',
          },
          {
            displayName: 'Premium',
            name: 'premium_proxy',
            type: 'options',
            options: [
              { name: 'Level 1', value: 'level_1' },
              { name: 'Level 2', value: 'level_2' },
            ],
            default: 'level_1',
            description: 'Premium proxy level to use for better performance and success rates',
          },
          {
            displayName: 'Render JavaScript',
            name: 'render_js',
            type: 'boolean',
            default: false,
            description: 'Whether to render JavaScript before returning the response',
          },
          {
            displayName: 'Residential Proxies',
            name: 'residential_proxy',
            type: 'boolean',
            default: false,
            description: 'Whether to use residential proxies for better success rates on challenging websites',
          },
          {
            displayName: 'Wait Time',
            name: 'wait',
            type: 'number',
            default: 0,
            description: 'Time to wait in milliseconds before collecting page data',
          },
        ],
      },
      {
        displayName: 'Return Type',
        name: 'returnType',
        type: 'options',
        displayOptions: {
          show: {
            apiType: ['proxyApi'],
          },
        },
        options: [
          {
            name: 'Target Server Response (Default)',
            value: 'default',
            description: 'Return the original response from the target server',
          },
          {
            name: 'JSON Response',
            value: 'json',
            description: 'Return the response in JSON format',
          },
        ],
        default: 'default',
        description: 'The format in which to return the response',
      },
    ];
  }

  static async execute(
    this: IExecuteFunctions,
    index: number,
    items: INodeExecutionData[],
    credentials: IScrapeOpsApiOptions,
  ): Promise<any> {
    const url = this.getNodeParameter('url', index) as string;
    const method = this.getNodeParameter('method', index) as string;
    const returnType = this.getNodeParameter('returnType', index) as string;
    const advancedOptions = this.getNodeParameter('advancedOptions', index, {}) as IProxyAdvancedOptions;

    const apiKey = credentials.apiKey;
    const baseUrl = 'https://proxy.scrapeops.io/v1/';

    const queryParams: Record<string, any> = {
      api_key: apiKey,
      url: url,
    };

    if (advancedOptions.render_js !== undefined) queryParams.render_js = advancedOptions.render_js;
    if (advancedOptions.country) queryParams.country = advancedOptions.country;
    if (advancedOptions.follow_redirects !== undefined) queryParams.follow_redirects = advancedOptions.follow_redirects;
    if (advancedOptions.initial_status_code !== undefined) queryParams.initial_status_code = advancedOptions.initial_status_code;
    if (advancedOptions.final_status_code !== undefined) queryParams.final_status_code = advancedOptions.final_status_code;
    if (advancedOptions.optimize_request !== undefined) queryParams.optimize_request = advancedOptions.optimize_request;
    if (advancedOptions.wait) queryParams.wait = advancedOptions.wait;

    // Include premium parameter if specified, default to level_1
    queryParams.premium = advancedOptions.premium_proxy || 'level_1';

    if (advancedOptions.residential_proxy !== undefined) queryParams.residential = advancedOptions.residential_proxy;
    if (advancedOptions.mobile_proxy !== undefined) queryParams.mobile = advancedOptions.mobile_proxy;

    if (returnType === 'json') {
      queryParams.response_format = 'json';
    }

    if (advancedOptions.customHeaders) {
      try {
        const headers = JSON.parse(advancedOptions.customHeaders);
        queryParams.headers = headers;
      } catch (error) {
        throw new NodeOperationError(this.getNode(), 'Invalid JSON in Custom Headers', { itemIndex: index });
      }
    }

    if (advancedOptions.customCookies) {
      try {
        const cookies = JSON.parse(advancedOptions.customCookies);
        queryParams.cookies = cookies;
      } catch (error) {
        throw new NodeOperationError(this.getNode(), 'Invalid JSON in Custom Cookies', { itemIndex: index });
      }
    }

    const options: IRequestOptions = {
      method: method as IHttpRequestMethods,
      url: baseUrl,
      qs: queryParams,
    };

    if (method === 'POST') {
      options.body = items[index].json;
      options.json = true;
    }

    try {
      let responseData = await this.helpers.request(options);

      if (typeof responseData === 'string' && returnType === 'json') {
        try {
          responseData = JSON.parse(responseData);
        } catch (error) {
          // Failed to parse as JSON, return as is
        }
      }

      return responseData;
    } catch (error) {
      let errorMessage = `ScrapeOps Proxy API request failed: ${error.message}`;

      if (error.response && error.response.body) {
        try {
          const errorBody = typeof error.response.body === 'string'
            ? JSON.parse(error.response.body)
            : error.response.body;

          if (errorBody.status) {
            errorMessage = `ScrapeOps Proxy API request failed: ${errorBody.status}`;

            if (errorBody.status.includes('Failed to get successful response from website')) {
              errorMessage += ` - This usually indicates the target website is blocking requests or is temporarily unavailable. Try using residential proxies, enabling JavaScript rendering, or adding a wait time.`;
            }
          }
        } catch (e) {
          // Error parsing error body, use original error message
        }
      }

      throw new NodeOperationError(this.getNode(), errorMessage, { itemIndex: index });
    }
  }
}
