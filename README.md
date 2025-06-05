# n8n-nodes-scrapeops

This community node integrates [ScrapeOps](https://scrapeops.io) services into n8n, allowing you to use their Proxy API, Parser API, and Data API directly in your workflows.

## ScrapeOps Overview

ScrapeOps provides a suite of tools to simplify web scraping operations:

- **Proxy API**: Access high-quality proxies through a single endpoint for reliable web scraping
- **Parser API**: Extract structured data from HTML content
- **Data API**: Retrieve and query data from ScrapeOps datasets

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

```bash
npm install @scrapeops/n8n-nodes-scrapeops
```

## Features

### Proxy API

- Make GET and POST requests through ScrapeOps proxies
- Configure options like JavaScript rendering, geolocation, and custom headers
- Choose between standard and premium proxies
- Control response format and advanced parameters

### Parser API

- Parse HTML from a URL or direct HTML content
- Define extraction rules for structured data

### Data API

- Retrieve complete datasets from ScrapeOps
- Execute custom queries against datasets

## Credentials

To use this node, you'll need a ScrapeOps API key. You can get one by signing up at [ScrapeOps](https://scrapeops.io/app/register/proxy/).

## Examples

### Scrape a Website with Proxy API

This example shows how to use the ScrapeOps Proxy API to scrape a website with JavaScript rendering enabled:

1. Add a ScrapeOps node
2. Select "Proxy API" and "Request" operation
3. Enter the target URL
4. Enable JavaScript rendering in Advanced Options
5. Run the workflow

### Extract Data with Parser API

This example shows how to extract structured data from a webpage:

1. Add a ScrapeOps node
2. Select "Parser API" and "Parse HTML" operation
3. Enter the target URL
4. Define extraction rules in JSON format
5. Run the workflow

## Resources

- [ScrapeOps Documentation](https://scrapeops.io/docs/intro/)
- [n8n Community Nodes Documentation](https://docs.n8n.io/integrations/community-nodes/)

## License

[MIT](LICENSE.md)
