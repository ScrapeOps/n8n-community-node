import {  ICredentialDataDecryptedObject } from 'n8n-workflow';

export interface IScrapeOpsApiOptions extends ICredentialDataDecryptedObject {
  apiKey: string;
}

export interface IProxyAdvancedOptions {
  render_js?: boolean;
  country?: string;
  follow_redirects?: boolean;
  initial_status_code?: boolean;
  final_status_code?: boolean;
  optimize_request?: boolean;
  max_request_cost?: number;
  customHeaders?: string;
  customCookies?: string;
  wait?: number;
  premium_proxy?: string;
  residential_proxy?: boolean;
  mobile_proxy?: boolean;
  bypass?: string;
  wait_for?: string;
  scroll?: number;
  file_type?: string;
  screenshot?: boolean;
  js_scenario?: string;
  keep_headers?: boolean;
  device_type?: string;
  session_number?: number;
  llm_extract?: boolean;
  llm_extract_response_type?: string;
  llm_data_schema?: string;
}

export interface IAmazonApiOptions {
  country?: string;
  tld?: string;
}

export interface IWalmartApiOptions {
  country?: string;
  tld?: string;
}
