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
  customHeaders?: string;
  customCookies?: string;
  wait?: number;
  premium_proxy?: string;
  residential_proxy?: boolean;
  mobile_proxy?: boolean;
}

export interface IAmazonApiOptions {
  country?: string;
  tld?: string;
}
