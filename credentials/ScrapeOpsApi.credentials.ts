import {
	IAuthenticateGeneric,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class ScrapeOpsApi implements ICredentialType {
	// eslint-disable-next-line n8n-nodes-base/cred-class-field-name-uppercase-first-char
	name = 'ScrapeOpsApi';
	// eslint-disable-next-line n8n-nodes-base/cred-class-field-display-name-missing-oauth2
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

	// eslint-disable-next-line n8n-nodes-base/cred-class-field-authenticate-type-assertion
	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			qs: {
				'api_key': '={{$credentials.apiKey}}'
			}
		},
	};
}
