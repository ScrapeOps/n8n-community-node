import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class ScrapeOpsApi implements ICredentialType {
	// eslint-disable-next-line n8n-nodes-base/cred-class-field-name-uppercase-first-char
	name = 'ScrapeOpsApi';
	displayName = 'ScrapeOps API';
	documentationUrl = 'https://scrapeops.io/app/register/proxy/';
	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			qs: {
				'api_key': '={{$credentials.apiKey}}'
			}
		},
	};

	// credential test request
	test: ICredentialTestRequest = {
		request: {
			method: 'GET',
			baseURL: 'https://proxy.scrapeops.io/v1/',
			url: '',
			qs: {
				'api_key': '={{$credentials.apiKey}}',
				'url': 'https://httpbin.org/ip'
			}
		},
	};
}
