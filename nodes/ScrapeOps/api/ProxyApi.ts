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
          // Alphabetized by displayName
          {
            displayName: 'Bypass',
            name: 'bypass',
            type: 'options',
            options: [
              { name: 'Cloudflare Level 1', value: 'cloudflare_level_1' },
              { name: 'Cloudflare Level 2', value: 'cloudflare_level_2' },
              { name: 'Cloudflare Level 3', value: 'cloudflare_level_3' },
              { name: 'DataDome', value: 'datadome' },
              { name: 'Generic Level 1', value: 'generic_level_1' },
              { name: 'Generic Level 2', value: 'generic_level_2' },
              { name: 'Generic Level 3', value: 'generic_level_3' },
              { name: 'Generic Level 4', value: 'generic_level_4' },
              { name: 'Incapsula', value: 'incapsula' },
              { name: 'PerimeterX', value: 'perimeterx' },
            ],
            default: 'generic_level_1',
            description: 'Enable a specific anti-bot bypass',
          },
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
            displayName: 'Device Type',
            name: 'device_type',
            type: 'options',
            options: [
              { name: 'Desktop', value: 'desktop' },
              { name: 'Mobile', value: 'mobile' },
            ],
            default: 'desktop',
            description: 'Use desktop or mobile user-agents',
          },
          {
            displayName: 'File Type',
            name: 'file_type',
            type: 'options',
            options: [
              { name: 'CSV', value: 'csv' },
              { name: 'GIF', value: 'gif' },
              { name: 'JPEG', value: 'jpeg' },
              { name: 'PDF', value: 'pdf' },
              { name: 'PNG', value: 'png' },
              { name: 'SVG', value: 'svg' },
              { name: 'WEBP', value: 'webp' },
              { name: 'XLSX', value: 'xlsx' },
              { name: 'XML', value: 'xml' },
            ],
            default: 'pdf',
            description: 'Specify file type to optimize proxy selection',
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
            displayName: 'JS Scenario (JSON Array of Steps)',
            name: 'js_scenario',
            type: 'string',
            typeOptions: {
              rows: 4,
            },
            default: '',
            description: 'Sequence of headless browser actions to run before returning the response',
          },
          {
            displayName: 'Keep Headers',
            name: 'keep_headers',
            type: 'boolean',
            default: false,
            description: 'Whether to use your custom headers when making the request',
          },
          {
            displayName: 'Max Request Cost',
            name: 'max_request_cost',
            type: 'number',
            default: 0,
            description: 'Maximum API credits a request can use when optimize_request is enabled',
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
            description: 'Whether to let ScrapeOps optimize the request settings for best performance at lowest cost',
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
            displayName: 'Screenshot',
            name: 'screenshot',
            type: 'boolean',
            default: false,
            description: 'Whether to return a base64 screenshot (requires render_js and json_response)',
          },
          {
            displayName: 'Scroll (Pixels)',
            name: 'scroll',
            type: 'number',
            default: 0,
            description: 'Scroll the page a number of pixels before returning the response (enables JS rendering)',
          },
          {
            displayName: 'Session Number',
            name: 'session_number',
            type: 'number',
            default: 0,
            description: 'Sticky session number to reuse same IP across requests',
          },
          {
            displayName: 'Wait For (CSS Selector)',
            name: 'wait_for',
            type: 'string',
            default: '',
            description: 'Wait for a specific element before returning the response (enables JS rendering)',
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

    const baseUrl = 'https://proxy.scrapeops.io/v1/';

    const queryParams: Record<string, any> = {
      url: url,
    };

    if (advancedOptions.render_js !== undefined) queryParams.render_js = advancedOptions.render_js;
    if (advancedOptions.country) queryParams.country = advancedOptions.country;
    if (advancedOptions.follow_redirects !== undefined) queryParams.follow_redirects = advancedOptions.follow_redirects;
    if (advancedOptions.initial_status_code !== undefined) queryParams.initial_status_code = advancedOptions.initial_status_code;
    if (advancedOptions.final_status_code !== undefined) queryParams.final_status_code = advancedOptions.final_status_code;
    if (advancedOptions.optimize_request !== undefined) queryParams.optimize_request = advancedOptions.optimize_request;
    if (advancedOptions.max_request_cost && advancedOptions.optimize_request) queryParams.max_request_cost = advancedOptions.max_request_cost;
    if (advancedOptions.bypass) queryParams.bypass = advancedOptions.bypass;
    if (advancedOptions.wait_for) queryParams.wait_for = advancedOptions.wait_for;
    if (advancedOptions.scroll) queryParams.scroll = advancedOptions.scroll;
    if (advancedOptions.file_type) queryParams.file_type = advancedOptions.file_type;
    if (advancedOptions.screenshot !== undefined) {
      queryParams.screenshot = advancedOptions.screenshot;
      if (advancedOptions.screenshot === true) {
        queryParams.render_js = true;
        queryParams.json_response = true;
      }
    }
    if (advancedOptions.js_scenario) queryParams.js_scenario = advancedOptions.js_scenario;
    if (advancedOptions.wait) queryParams.wait = advancedOptions.wait;

    // Include premium parameter if specified, default to level_1
    queryParams.premium = advancedOptions.premium_proxy || 'level_1';

    if (advancedOptions.residential_proxy !== undefined) queryParams.residential = advancedOptions.residential_proxy;
    if (advancedOptions.mobile_proxy !== undefined) queryParams.mobile = advancedOptions.mobile_proxy;
    if (advancedOptions.keep_headers !== undefined) queryParams.keep_headers = advancedOptions.keep_headers;
    if (advancedOptions.device_type) queryParams.device_type = advancedOptions.device_type;
    if (advancedOptions.session_number) queryParams.session_number = advancedOptions.session_number;

    if (returnType === 'json') {
      queryParams.json_response = true;
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
      let responseData = await this.helpers.requestWithAuthentication.call(this, 'scrapeOpsApi', options);

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
