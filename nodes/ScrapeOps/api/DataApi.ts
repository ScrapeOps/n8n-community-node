import {
  IExecuteFunctions,
  NodeOperationError,
  IHttpRequestMethods,
  IRequestOptions,
  INodeProperties,
} from 'n8n-workflow';
import { IAmazonApiOptions, IIndeedApiOptions, IRedfinApiOptions, IScrapeOpsApiOptions } from './types';

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
          { name: 'Indeed', value: 'indeed' },
          { name: 'Redfin', value: 'redfin' },
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
        displayName: 'Advanced Options',
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
            displayName: 'TLD',
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
        default: 'query',
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
        default: 'jobId',
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
        displayName: 'Advanced Options',
        name: 'indeedJobDetailOptions',
        type: 'collection',
        placeholder: 'Add Option',
        displayOptions: {
          show: {
            apiType: ['dataApi'],
            dataDomain: ['indeed'],
            indeedApiType: ['jobDetail'],
          },
        },
        default: {},
        description: 'Advanced options specific to the job detail endpoint',
        options: [
          {
            displayName: 'Country',
            name: 'country',
            type: 'string',
            default: 'us',
            description: 'Two letter country code to scrape data from (e.g., us, uk, ca)',
          },
          {
            displayName: 'TLD',
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
            description: 'Indeed domain to scrape from',
          },
        ],
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
        default: 'query',
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
          { name: 'Filters', value: 'filters', description: 'Use industry/location filters' },
          { name: 'URL', value: 'url', description: 'Provide a full top companies URL' },
        ],
        default: 'filters',
        description: 'Select how to fetch the top companies data',
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
        default: 'companyId',
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
        displayName: 'Advanced Options',
        name: 'indeedCompanySnapshotOptions',
        type: 'collection',
        placeholder: 'Add Option',
        displayOptions: {
          show: {
            apiType: ['dataApi'],
            dataDomain: ['indeed'],
            indeedApiType: ['companySnapshot'],
          },
        },
        default: {},
        description: 'Advanced options specific to the company snapshot endpoint',
        options: [
          {
            displayName: 'Country',
            name: 'country',
            type: 'string',
            default: 'us',
            description: 'Two letter country code to scrape data from (e.g., us, uk, ca)',
          },
          {
            displayName: 'TLD',
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
            description: 'Indeed domain to scrape from',
          },
        ],
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
        default: 'companyId',
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
        displayName: 'Advanced Options',
        name: 'indeedCompanyAboutOptions',
        type: 'collection',
        placeholder: 'Add Option',
        displayOptions: {
          show: {
            apiType: ['dataApi'],
            dataDomain: ['indeed'],
            indeedApiType: ['companyAbout'],
          },
        },
        default: {},
        description: 'Advanced options specific to the company about endpoint',
        options: [
          {
            displayName: 'Country',
            name: 'country',
            type: 'string',
            default: 'us',
            description: 'Two letter country code to scrape data from (e.g., us, uk, ca)',
          },
          {
            displayName: 'TLD',
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
            description: 'Indeed domain to scrape from',
          },
        ],
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
        default: 'companyId',
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
        default: 'companyId',
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
        name: 'indeedJobSearchOptions',
        type: 'collection',
        placeholder: 'Add Option',
        displayOptions: {
          show: {
            apiType: ['dataApi'],
            dataDomain: ['indeed'],
            indeedApiType: ['jobSearch'],
          },
        },
        default: {},
        description: 'Advanced options specific to the job search endpoint',
        options: [
          {
            displayName: 'Country',
            name: 'country',
            type: 'string',
            default: 'us',
            description: 'Two letter country code to scrape data from (e.g., us, uk, ca)',
          },
          {
            displayName: 'TLD',
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
            description: 'Indeed domain to scrape from',
          },
          {
            displayName: 'Location',
            name: 'location',
            type: 'string',
            default: '',
            description: 'Geographic location filter (e.g., New York, San Francisco)',
          },
          {
            displayName: 'Job Type',
            name: 'job_type',
            type: 'string',
            default: '',
            description: 'Job type filter (e.g., fulltime, parttime, contract)',
          },
          {
            displayName: 'Sort',
            name: 'sort',
            type: 'string',
            default: '',
            description: 'Sort order (e.g., relevance, date, salary, rating)',
          },
          {
            displayName: 'Start',
            name: 'start',
            type: 'number',
            typeOptions: {
              minValue: 0,
              numberPrecision: 0,
            },
            default: 0,
            description: 'Pagination offset. Leave at 0 to start from the first result.',
          },
          {
            displayName: 'Radius (miles)',
            name: 'radius',
            type: 'number',
            typeOptions: {
              minValue: 0,
            },
            default: 0,
            description: 'Search radius in miles. Leave at 0 to omit.',
          },
          {
            displayName: 'Job Age (days)',
            name: 'fromage',
            type: 'number',
            typeOptions: {
              minValue: 0,
            },
            default: 0,
            description: 'Filter jobs by age in days (e.g., 1, 3, 7, 14, 30). Leave at 0 to omit.',
          },
          {
            displayName: 'Salary Filter',
            name: 'salary',
            type: 'string',
            default: '',
            description: 'Salary filter string for the job search endpoint',
          },
          {
            displayName: 'Remote Filter',
            name: 'remote',
            type: 'string',
            default: '',
            description: 'Remote work filter (e.g., remote, hybrid, onsite)',
          },
        ],
      },
      {
        displayName: 'Advanced Options',
        name: 'indeedCompanySearchOptions',
        type: 'collection',
        placeholder: 'Add Option',
        displayOptions: {
          show: {
            apiType: ['dataApi'],
            dataDomain: ['indeed'],
            indeedApiType: ['companySearch'],
          },
        },
        default: {},
        description: 'Advanced options specific to the company search endpoint',
        options: [
          {
            displayName: 'Country',
            name: 'country',
            type: 'string',
            default: 'us',
            description: 'Two letter country code to scrape data from (e.g., us, uk, ca)',
          },
          {
            displayName: 'TLD',
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
            description: 'Indeed domain to scrape from',
          },
          {
            displayName: 'Location',
            name: 'location',
            type: 'string',
            default: '',
            description: 'Geographic location filter (e.g., New York, San Francisco)',
          },
          {
            displayName: 'Sort',
            name: 'sort',
            type: 'string',
            default: '',
            description: 'Sort order (e.g., relevance, date, salary, rating)',
          },
          {
            displayName: 'Start',
            name: 'start',
            type: 'number',
            typeOptions: {
              minValue: 0,
              numberPrecision: 0,
            },
            default: 0,
            description: 'Pagination offset. Leave at 0 to start from the first result.',
          },
          {
            displayName: 'Radius (miles)',
            name: 'radius',
            type: 'number',
            typeOptions: {
              minValue: 0,
            },
            default: 0,
            description: 'Search radius in miles. Leave at 0 to omit.',
          },
        ],
      },
      {
        displayName: 'Advanced Options',
        name: 'indeedTopCompaniesOptions',
        type: 'collection',
        placeholder: 'Add Option',
        displayOptions: {
          show: {
            apiType: ['dataApi'],
            dataDomain: ['indeed'],
            indeedApiType: ['topCompanies'],
          },
        },
        default: {},
        description: 'Advanced options specific to the top companies endpoint',
        options: [
          {
            displayName: 'Country',
            name: 'country',
            type: 'string',
            default: 'us',
            description: 'Two letter country code to scrape data from (e.g., us, uk, ca)',
          },
          {
            displayName: 'TLD',
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
            description: 'Indeed domain to scrape from',
          },
          {
            displayName: 'Location',
            name: 'location',
            type: 'string',
            default: '',
            description: 'Geographic location filter (e.g., New York, San Francisco)',
          },
          {
            displayName: 'Industry',
            name: 'industry',
            type: 'string',
            default: '',
            description: 'Industry filter for the top companies endpoint (e.g., Technology)',
          },
          {
            displayName: 'Sort',
            name: 'sort',
            type: 'string',
            default: '',
            description: 'Sort order (e.g., relevance, date, salary, rating)',
          },
          {
            displayName: 'Start',
            name: 'start',
            type: 'number',
            typeOptions: {
              minValue: 0,
              numberPrecision: 0,
            },
            default: 0,
            description: 'Pagination offset. Leave at 0 to start from the first result.',
          },
          {
            displayName: 'Radius (miles)',
            name: 'radius',
            type: 'number',
            typeOptions: {
              minValue: 0,
            },
            default: 0,
            description: 'Search radius in miles. Leave at 0 to omit.',
          },
        ],
      },
      {
        displayName: 'Advanced Options',
        name: 'indeedCompanyReviewsOptions',
        type: 'collection',
        placeholder: 'Add Option',
        displayOptions: {
          show: {
            apiType: ['dataApi'],
            dataDomain: ['indeed'],
            indeedApiType: ['companyReviews'],
          },
        },
        default: {},
        description: 'Advanced options specific to the company reviews endpoint',
        options: [
          {
            displayName: 'Country',
            name: 'country',
            type: 'string',
            default: 'us',
            description: 'Two letter country code to scrape data from (e.g., us, uk, ca)',
          },
          {
            displayName: 'TLD',
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
            description: 'Indeed domain to scrape from',
          },
          {
            displayName: 'Sort',
            name: 'sort',
            type: 'string',
            default: '',
            description: 'Sort order (e.g., relevance, date, salary, rating)',
          },
          {
            displayName: 'Start',
            name: 'start',
            type: 'number',
            typeOptions: {
              minValue: 0,
              numberPrecision: 0,
            },
            default: 0,
            description: 'Pagination offset. Leave at 0 to start from the first result.',
          },
        ],
      },
      {
        displayName: 'Advanced Options',
        name: 'indeedCompanyJobsOptions',
        type: 'collection',
        placeholder: 'Add Option',
        displayOptions: {
          show: {
            apiType: ['dataApi'],
            dataDomain: ['indeed'],
            indeedApiType: ['companyJobs'],
          },
        },
        default: {},
        description: 'Advanced options specific to the company jobs endpoint',
        options: [
          {
            displayName: 'Country',
            name: 'country',
            type: 'string',
            default: 'us',
            description: 'Two letter country code to scrape data from (e.g., us, uk, ca)',
          },
          {
            displayName: 'TLD',
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
            description: 'Indeed domain to scrape from',
          },
          {
            displayName: 'Location',
            name: 'location',
            type: 'string',
            default: '',
            description: 'Geographic location filter (e.g., New York, San Francisco)',
          },
          {
            displayName: 'Job Type',
            name: 'job_type',
            type: 'string',
            default: '',
            description: 'Job type filter (e.g., fulltime, parttime, contract)',
          },
          {
            displayName: 'Sort',
            name: 'sort',
            type: 'string',
            default: '',
            description: 'Sort order (e.g., relevance, date, salary, rating)',
          },
          {
            displayName: 'Start',
            name: 'start',
            type: 'number',
            typeOptions: {
              minValue: 0,
              numberPrecision: 0,
            },
            default: 0,
            description: 'Pagination offset. Leave at 0 to start from the first result.',
          },
          {
            displayName: 'Radius (miles)',
            name: 'radius',
            type: 'number',
            typeOptions: {
              minValue: 0,
            },
            default: 0,
            description: 'Search radius in miles. Leave at 0 to omit.',
          },
          {
            displayName: 'Job Age (days)',
            name: 'fromage',
            type: 'number',
            typeOptions: {
              minValue: 0,
            },
            default: 0,
            description: 'Filter jobs by age in days (e.g., 1, 3, 7, 14, 30). Leave at 0 to omit.',
          },
          {
            displayName: 'Salary Filter',
            name: 'salary',
            type: 'string',
            default: '',
            description: 'Salary filter string for the company jobs endpoint',
          },
          {
            displayName: 'Remote Filter',
            name: 'remote',
            type: 'string',
            default: '',
            description: 'Remote work filter (e.g., remote, hybrid, onsite)',
          },
        ],
      },
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
        default: 'parameters',
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
        displayName: 'Advanced Options',
        name: 'redfinSaleSearchOptions',
        type: 'collection',
        placeholder: 'Add Option',
        displayOptions: {
          show: {
            apiType: ['dataApi'],
            dataDomain: ['redfin'],
            redfinApiType: ['saleSearch'],
          },
        },
        default: {},
        description: 'Advanced options specific to the sale search endpoint',
        options: [
          {
            displayName: 'Country',
            name: 'country',
            type: 'string',
            default: 'us',
            description: 'Proxy geotargeting country code (e.g., us, ca)',
          },
          {
            displayName: 'TLD',
            name: 'tld',
            type: 'options',
            options: [
              { name: '.COM (US)', value: 'com' },
              { name: '.CA (Canada)', value: 'ca' },
            ],
            default: 'com',
            description: 'Optional Redfin TLD override',
          },
        ],
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
        default: 'parameters',
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
        displayName: 'Advanced Options',
        name: 'redfinRentSearchOptions',
        type: 'collection',
        placeholder: 'Add Option',
        displayOptions: {
          show: {
            apiType: ['dataApi'],
            dataDomain: ['redfin'],
            redfinApiType: ['rentSearch'],
          },
        },
        default: {},
        description: 'Advanced options specific to the rent search endpoint',
        options: [
          {
            displayName: 'Country',
            name: 'country',
            type: 'string',
            default: 'us',
            description: 'Proxy geotargeting country code (e.g., us, ca)',
          },
          {
            displayName: 'TLD',
            name: 'tld',
            type: 'options',
            options: [
              { name: '.COM (US)', value: 'com' },
              { name: '.CA (Canada)', value: 'ca' },
            ],
            default: 'com',
            description: 'Optional Redfin TLD override',
          },
        ],
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
        displayName: 'Advanced Options',
        name: 'redfinSaleDetailOptions',
        type: 'collection',
        placeholder: 'Add Option',
        displayOptions: {
          show: {
            apiType: ['dataApi'],
            dataDomain: ['redfin'],
            redfinApiType: ['saleDetail'],
          },
        },
        default: {},
        description: 'Advanced options specific to the sale detail endpoint',
        options: [
          {
            displayName: 'Country',
            name: 'country',
            type: 'string',
            default: 'us',
            description: 'Proxy geotargeting country code (e.g., us, ca)',
          },
          {
            displayName: 'TLD',
            name: 'tld',
            type: 'options',
            options: [
              { name: '.COM (US)', value: 'com' },
              { name: '.CA (Canada)', value: 'ca' },
            ],
            default: 'com',
            description: 'Optional Redfin TLD override',
          },
        ],
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
        displayName: 'Advanced Options',
        name: 'redfinRentDetailOptions',
        type: 'collection',
        placeholder: 'Add Option',
        displayOptions: {
          show: {
            apiType: ['dataApi'],
            dataDomain: ['redfin'],
            redfinApiType: ['rentDetail'],
          },
        },
        default: {},
        description: 'Advanced options specific to the rent detail endpoint',
        options: [
          {
            displayName: 'Country',
            name: 'country',
            type: 'string',
            default: 'us',
            description: 'Proxy geotargeting country code (e.g., us, ca)',
          },
          {
            displayName: 'TLD',
            name: 'tld',
            type: 'options',
            options: [
              { name: '.COM (US)', value: 'com' },
              { name: '.CA (Canada)', value: 'ca' },
            ],
            default: 'com',
            description: 'Optional Redfin TLD override',
          },
        ],
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
        displayName: 'Advanced Options',
        name: 'redfinBuildingDetailOptions',
        type: 'collection',
        placeholder: 'Add Option',
        displayOptions: {
          show: {
            apiType: ['dataApi'],
            dataDomain: ['redfin'],
            redfinApiType: ['buildingDetail'],
          },
        },
        default: {},
        description: 'Advanced options specific to the building detail endpoint',
        options: [
          {
            displayName: 'Country',
            name: 'country',
            type: 'string',
            default: 'us',
            description: 'Proxy geotargeting country code (e.g., us, ca)',
          },
          {
            displayName: 'TLD',
            name: 'tld',
            type: 'options',
            options: [
              { name: '.COM (US)', value: 'com' },
              { name: '.CA (Canada)', value: 'ca' },
            ],
            default: 'com',
            description: 'Optional Redfin TLD override',
          },
        ],
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
        default: 'parameters',
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
        displayName: 'Advanced Options',
        name: 'redfinStateSearchOptions',
        type: 'collection',
        placeholder: 'Add Option',
        displayOptions: {
          show: {
            apiType: ['dataApi'],
            dataDomain: ['redfin'],
            redfinApiType: ['stateSearch'],
          },
        },
        default: {},
        description: 'Advanced options specific to the state search endpoint',
        options: [
          {
            displayName: 'Country',
            name: 'country',
            type: 'string',
            default: 'us',
            description: 'Proxy geotargeting country code (e.g., us, ca)',
          },
          {
            displayName: 'TLD',
            name: 'tld',
            type: 'options',
            options: [
              { name: '.COM (US)', value: 'com' },
              { name: '.CA (Canada)', value: 'ca' },
            ],
            default: 'com',
            description: 'Optional Redfin TLD override',
          },
        ],
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
        default: 'parameters',
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
        displayName: 'Advanced Options',
        name: 'redfinAgentSearchOptions',
        type: 'collection',
        placeholder: 'Add Option',
        displayOptions: {
          show: {
            apiType: ['dataApi'],
            dataDomain: ['redfin'],
            redfinApiType: ['agentSearch'],
          },
        },
        default: {},
        description: 'Advanced options specific to the agent search endpoint',
        options: [
          {
            displayName: 'Country',
            name: 'country',
            type: 'string',
            default: 'us',
            description: 'Proxy geotargeting country code (e.g., us, ca)',
          },
          {
            displayName: 'TLD',
            name: 'tld',
            type: 'options',
            options: [
              { name: '.COM (US)', value: 'com' },
              { name: '.CA (Canada)', value: 'ca' },
            ],
            default: 'com',
            description: 'Optional Redfin TLD override',
          },
        ],
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
        default: 'agent',
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
        name: 'redfinAgentProfileOptions',
        type: 'collection',
        placeholder: 'Add Option',
        displayOptions: {
          show: {
            apiType: ['dataApi'],
            dataDomain: ['redfin'],
            redfinApiType: ['agentProfile'],
          },
        },
        default: {},
        description: 'Advanced options specific to the agent profile endpoint',
        options: [
          {
            displayName: 'Country',
            name: 'country',
            type: 'string',
            default: 'us',
            description: 'Proxy geotargeting country code (e.g., us, ca)',
          },
          {
            displayName: 'TLD',
            name: 'tld',
            type: 'options',
            options: [
              { name: '.COM (US)', value: 'com' },
              { name: '.CA (Canada)', value: 'ca' },
            ],
            default: 'com',
            description: 'Optional Redfin TLD override',
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
      const amazonApiOptions = this.getNodeParameter('amazonApiOptions', index, {}) as IAmazonApiOptions;

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
          throw new NodeOperationError(this.getNode(), `Unsupported Indeed API type: ${indeedApiType}`, {
            itemIndex: index,
          });
      }

      const indeedApiOptions: IIndeedApiOptions = {};

      const mergeIndeedOptions = (parameterName: string) => {
        const extraOptions = this.getNodeParameter(parameterName, index, {}) as IIndeedApiOptions;
        Object.assign(indeedApiOptions, extraOptions);
      };

      switch (indeedApiType) {
        case 'jobSearch':
          mergeIndeedOptions('indeedJobSearchOptions');
          break;
        case 'jobDetail':
          mergeIndeedOptions('indeedJobDetailOptions');
          break;
        case 'companySearch':
          mergeIndeedOptions('indeedCompanySearchOptions');
          break;
        case 'topCompanies':
          mergeIndeedOptions('indeedTopCompaniesOptions');
          break;
        case 'companySnapshot':
          mergeIndeedOptions('indeedCompanySnapshotOptions');
          break;
        case 'companyAbout':
          mergeIndeedOptions('indeedCompanyAboutOptions');
          break;
        case 'companyReviews':
          mergeIndeedOptions('indeedCompanyReviewsOptions');
          break;
        case 'companyJobs':
          mergeIndeedOptions('indeedCompanyJobsOptions');
          break;
        default:
          break;
      }

      const addStringOption = (value: string | undefined, qsKey: string) => {
        if (value) {
          qsParams[qsKey] = value;
        }
      };

      const addNumberOption = (value: number | undefined, qsKey: string) => {
        if (typeof value === 'number' && value !== 0) {
          qsParams[qsKey] = value;
        }
      };

      addStringOption(indeedApiOptions.country, 'country');
      addStringOption(indeedApiOptions.tld, 'tld');

      if (['jobSearch', 'companySearch', 'topCompanies', 'companyJobs'].includes(indeedApiType)) {
        addStringOption(indeedApiOptions.location, 'location');
      }

      if (indeedApiType === 'topCompanies') {
        addStringOption(indeedApiOptions.industry, 'industry');
      }

      if (['jobSearch', 'companyJobs'].includes(indeedApiType)) {
        addStringOption(indeedApiOptions.job_type, 'job_type');
        addStringOption(indeedApiOptions.salary, 'salary');
        addStringOption(indeedApiOptions.remote, 'remote');
        addNumberOption(indeedApiOptions.fromage, 'fromage');
      }

      if (['jobSearch', 'companySearch', 'topCompanies', 'companyReviews', 'companyJobs'].includes(indeedApiType)) {
        addStringOption(indeedApiOptions.sort, 'sort');
        addNumberOption(indeedApiOptions.start, 'start');
      }

      if (['jobSearch', 'companySearch', 'topCompanies', 'companyJobs'].includes(indeedApiType)) {
        addNumberOption(indeedApiOptions.radius, 'radius');
      }
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
            qsParams.url = this.getNodeParameter('redfinSaleDetailUrl', index) as string;
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
            qsParams.url = this.getNodeParameter('redfinRentDetailUrl', index) as string;
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
            qsParams.url = this.getNodeParameter('redfinBuildingDetailUrl', index) as string;
          } else {
            qsParams.state = this.getNodeParameter('redfinBuildingDetailState', index) as string;
            qsParams.city = this.getNodeParameter('redfinBuildingDetailCity', index) as string;
            qsParams.building = this.getNodeParameter('redfinBuildingDetailBuilding', index) as string;
            qsParams.building_type = this.getNodeParameter('redfinBuildingDetailBuildingType', index) as string;
            qsParams.building_id = this.getNodeParameter('redfinBuildingDetailBuildingId', index) as string;
          }
          break;
        }
        case 'stateSearch': {
          baseUrl = `${API_BASE_URL}/structured-data/redfin/state-search`;
          const inputType = this.getNodeParameter('redfinStateSearchInputType', index) as string;
          if (inputType === 'url') {
            qsParams.url = this.getNodeParameter('redfinStateSearchUrl', index) as string;
          } else {
            qsParams.state = this.getNodeParameter('redfinStateSearchState', index) as string;
          }
          break;
        }
        case 'agentSearch': {
          baseUrl = `${API_BASE_URL}/structured-data/redfin/agent-search`;
          const inputType = this.getNodeParameter('redfinAgentSearchInputType', index) as string;
          if (inputType === 'url') {
            qsParams.url = this.getNodeParameter('redfinAgentSearchUrl', index) as string;
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
            qsParams.url = this.getNodeParameter('redfinAgentProfileUrl', index) as string;
          } else {
            qsParams.agent = this.getNodeParameter('redfinAgentProfileAgent', index) as string;
          }
          break;
        }
        default:
          throw new NodeOperationError(this.getNode(), `Unsupported Redfin API type: ${redfinApiType}`, {
            itemIndex: index,
          });
      }

      const redfinApiOptions: IRedfinApiOptions = {};

      const mergeRedfinOptions = (parameterName: string) => {
        const extraOptions = this.getNodeParameter(parameterName, index, {}) as IRedfinApiOptions;
        Object.assign(redfinApiOptions, extraOptions);
      };

      switch (redfinApiType) {
        case 'saleSearch':
          mergeRedfinOptions('redfinSaleSearchOptions');
          break;
        case 'rentSearch':
          mergeRedfinOptions('redfinRentSearchOptions');
          break;
        case 'saleDetail':
          mergeRedfinOptions('redfinSaleDetailOptions');
          break;
        case 'rentDetail':
          mergeRedfinOptions('redfinRentDetailOptions');
          break;
        case 'buildingDetail':
          mergeRedfinOptions('redfinBuildingDetailOptions');
          break;
        case 'stateSearch':
          mergeRedfinOptions('redfinStateSearchOptions');
          break;
        case 'agentSearch':
          mergeRedfinOptions('redfinAgentSearchOptions');
          break;
        case 'agentProfile':
          mergeRedfinOptions('redfinAgentProfileOptions');
          break;
        default:
          break;
      }

      if (redfinApiOptions.country) {
        qsParams.country = redfinApiOptions.country;
      }
      if (redfinApiOptions.tld) {
        qsParams.tld = redfinApiOptions.tld;
      }
    } else {
      throw new NodeOperationError(this.getNode(), `Unsupported data domain: ${dataDomain}`, { itemIndex: index });
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
        throw new NodeOperationError(
          this.getNode(),
          `ScrapeOps Data API request failed: ${error.response.body.message || error.message}`,
          { itemIndex: index }
        );
      }
      throw error;
    }
  }
}
