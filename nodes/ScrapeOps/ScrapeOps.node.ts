import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeConnectionType,
} from 'n8n-workflow';

import { ProxyApi, ParserApi, DataApi, IScrapeOpsApiOptions } from './api';

export class ScrapeOps implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'ScrapeOps',
		// eslint-disable-next-line n8n-nodes-base/node-class-description-name-miscased
		name: 'ScrapeOps',
		icon: 'file:scrapeops.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["apiType"] === "proxyApi" ? "Proxy API" : $parameter["apiType"] === "parserApi" ? "Parser API" : "Data API"}}',
		description: 'Interact with ScrapeOps Proxy, Parser and Data APIs',
		defaults: {
			name: 'ScrapeOps',
		},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		credentials: [
			{
				name: 'ScrapeOpsApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'API',
				name: 'apiType',
				type: 'options',
				options: [
					{
						name: 'Proxy API',
						value: 'proxyApi',
					},
					{
						name: 'Parser API',
						value: 'parserApi',
					},
					{
						name: 'Data API',
						value: 'dataApi',
					},
				],
				default: 'proxyApi',
				description: 'API to use',
			},
			...ProxyApi.getNodeProperties(),
			...ParserApi.getNodeProperties(),
			...DataApi.getNodeProperties(),
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		for (let i = 0; i < items.length; i++) {
			try {
				const apiType = this.getNodeParameter('apiType', i) as string;
				const credentials = await this.getCredentials('ScrapeOpsApi') as unknown as IScrapeOpsApiOptions;

				let responseData;

				if (apiType === 'proxyApi') {
					responseData = await ProxyApi.execute.call(this, i, items, credentials);
				}
				else if (apiType === 'parserApi') {
					responseData = await ParserApi.execute.call(this, i, credentials);
				}
				else if (apiType === 'dataApi') {
					responseData = await DataApi.execute.call(this, i, credentials);
				}

				returnData.push({
					json: responseData,
					pairedItem: { item: i },
				});

			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({
						json: {
							error: error.message,
						},
						pairedItem: { item: i },
					});
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
}
