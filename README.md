# ScrapeOps n8n Community Node

[![npm version](https://badge.fury.io/js/%40scrapeops%2Fn8n-nodes-scrapeops.svg)](https://badge.fury.io/js/%40scrapeops%2Fn8n-nodes-scrapeops)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

The **[ScrapeOps n8n node](https://n8n.io/integrations/scrapeops/)** is a powerful integration that brings ScrapeOps' web scraping capabilities directly into your n8n workflows. This node allows you to leverage ScrapeOps' proxy aggregation, HTML parsing, and structured data extraction services without writing complex code.

![ScrapeOps N8N Node](https://scrapeops-assets-2.nyc3.cdn.digitaloceanspaces.com/Docs/n8n/n8n-scrapeops-node-integration.png)

## What is ScrapeOps?

[ScrapeOps](https://scrapeops.io) provides a suite of tools to simplify web scraping operations:

- **🔀 Proxy API**: Access high-quality proxies through a single endpoint for reliable web scraping
- **📊 Parser API**: Extract structured data from HTML content of popular websites
- **💾 Data API**: Retrieve and query data from ScrapeOps datasets

## ✨ Key Features

### 🔀 Proxy API
- Smart proxy rotation across multiple providers
- [JavaScript rendering support](https://scrapeops.io/docs/web-scraping-proxy-api-aggregator/advanced-functionality/headless-browser/) for dynamic sites
- [Anti-bot bypass capabilities](https://scrapeops.io/docs/web-scraping-proxy-api-aggregator/advanced-functionality/anti-bot-bypass/) (Cloudflare, DataDome, etc.)
- [Geo-targeting options](https://scrapeops.io/docs/web-scraping-proxy-api-aggregator/advanced-functionality/country-geotargeting/)
- [Mobile and residential proxy support](https://scrapeops.io/docs/web-scraping-proxy-api-aggregator/advanced-functionality/residential-proxies/)
- [Session management](https://scrapeops.io/docs/web-scraping-proxy-api-aggregator/advanced-functionality/sticky-sessions/) for multi-step scraping

### 📊 Parser API
- Extract structured data from popular websites without maintaining your own parsers
- **Supported Sites**: [Amazon](https://scrapeops.io/docs/parser-api/parsers/amazon-product-parser/), [eBay](https://scrapeops.io/docs/parser-api/parsers/ebay-product-parser/), [Walmart](https://scrapeops.io/docs/parser-api/parsers/walmart-product-parser/), [Indeed](https://scrapeops.io/docs/parser-api/parsers/indeed-product-parser/), [Redfin](https://scrapeops.io/docs/parser-api/parsers/redfin-product-parser/)
- **Page Types**: Product pages, search results, reviews, categories
- Returns clean, structured JSON data

### 💾 Data API
- Direct access to structured data endpoints
- **[Amazon Product API](https://scrapeops.io/docs/data-api/amazon-product-api/)**: Get product details by ASIN or URL
- **[Amazon Search API](https://scrapeops.io/docs/data-api/amazon-product-search-api/)**: Search products and get structured results
- No HTML scraping required - get data in a single request

---

## 📦 Installation

### Method 1: Install via n8n Cloud UI (Recommended)

If you're using n8n Cloud, you can easily install the ScrapeOps node directly from the UI:

1. **Sign in to n8n**, open the editor, and click **+** in the top right to open the Nodes panel

![Plus Sign in n8n](https://scrapeops-assets-2.nyc3.cdn.digitaloceanspaces.com/Docs/n8n/click_plus_n8n_scrapeops.png)

2. **Search for "ScrapeOps"** node using the search bar. Look for the version marked by a badge ☑. Then, select **install**.

![Type ScrapeOps](https://scrapeops-assets-2.nyc3.cdn.digitaloceanspaces.com/Docs/n8n/type_scrapeops-n8n.png)

3. The ScrapeOps node will be installed and appear in your node palette automatically.

### Method 2: Install via n8n Settings (Self-Hosted)

For self-hosted n8n instances:

1. Open your n8n instance
2. Navigate to **Settings** → **Community Nodes**
3. Click **Install a community node**
4. Enter the package name: `@scrapeops/n8n-nodes-scrapeops`
5. Click **Install**
6. Restart your n8n instance when prompted

### Method 3: Manual Installation (Self-Hosted)

```bash
# Navigate to your n8n installation directory
cd ~/.n8n

# Install the ScrapeOps node
npm install @scrapeops/n8n-nodes-scrapeops

# Restart n8n
n8n start
```

### Method 4: Docker Installation

For Docker users, add the node to your `docker-compose.yml`:

```yaml
version: '3.8'
services:
  n8n:
    image: n8nio/n8n
    environment:
      - N8N_COMMUNITY_NODES_ENABLED=true
      - NODE_FUNCTION_ALLOW_EXTERNAL=n8n-nodes-scrapeops
    volumes:
      - ~/.n8n:/home/node/.n8n
```

Then install the node:

```bash
docker exec -it <container_name> npm install @scrapeops/n8n-nodes-scrapeops
docker restart <container_name>
```

---

## 🔑 Authentication

### Getting Your ScrapeOps API Key

To use the ScrapeOps node, you'll need a **ScrapeOps API key** which you can get by signing up for a [free account here](https://scrapeops.io/app/register/proxy).

**Steps to get your API key:**

1. **Sign up for a free account** at [ScrapeOps](https://scrapeops.io/app/register/proxy)
2. **Verify your email address** (required to activate your API key)
3. **Visit your dashboard** at [ScrapeOps Dashboard](https://scrapeops.io/app/dashboard)
4. **Copy your API key** from the dashboard

![Get The API Key](./images/scrapeops-dashboard.png)

> ⚠️ **Important:** You must confirm your email address to activate your API key. Check your inbox for a verification email from ScrapeOps.

### Configure Credentials in n8n

1. In n8n, go to **Credentials** → **Add Credential**.

![Create Credentials](https://scrapeops-assets-2.nyc3.cdn.digitaloceanspaces.com/Docs/n8n/create_credential_n8n.png)

2. Search for **"ScrapeOps API"** and enter your API key.

![Enter API Key](https://scrapeops-assets-2.nyc3.cdn.digitaloceanspaces.com/Docs/n8n/add_key_save.png)

3. Save and test the credentials.

---

## 🎯 Quick Start

### Adding the Node to a Workflow

1. Create a new workflow in n8n.
2. Click Add to Workflow **"ScrapeOps"** node from the palette.

![Add to Workflow](https://scrapeops-assets-2.nyc3.cdn.digitaloceanspaces.com/Docs/n8n/add%20to%20workflow%20n8n%20scrapeops.png)

3. Select an API (Proxy, Parser, or Data) and configure parameters.

![Choose API Type](https://scrapeops-assets-2.nyc3.cdn.digitaloceanspaces.com/Docs/n8n/3%20types%20of%20API.png)


You can monitor your usage in the [ScrapeOps Dashboard](https://scrapeops.io/app/dashboard).

---

## 📚 API Documentation

### 🔀 Proxy API

Route GET/POST requests through proxies to scrape blocked sites.

**Basic Parameters:**
- **URL:** Target URL to scrape (required)
- **Method:** GET or POST (default: GET)  
- **Return Type:** Default (raw response) or JSON

**Advanced Options:**

| Option | Type | Description | Default | Example Values |
|--------|------|-------------|---------|----------------|
| **[Follow Redirects](https://scrapeops.io/docs/web-scraping-proxy-api-aggregator/advanced-functionality/follow-redirects/)** | Boolean | Follow HTTP redirects | true | `true`, `false` |
| **[Keep Headers](https://scrapeops.io/docs/web-scraping-proxy-api-aggregator/advanced-functionality/custom-headers/)** | Boolean | Use your custom headers | false | `true`, `false` |
| **[Initial Status Code](https://scrapeops.io/docs/web-scraping-proxy-api-aggregator/advanced-functionality/transparent-status-codes/)** | Boolean | Return initial status code | false | `true`, `false` |
| **[Final Status Code](https://scrapeops.io/docs/web-scraping-proxy-api-aggregator/advanced-functionality/transparent-status-codes/)** | Boolean | Return final status code | false | `true`, `false` |
| **[Optimize Request](https://scrapeops.io/docs/web-scraping-proxy-api-aggregator/advanced-functionality/optimize-request/)** | Boolean | Auto-optimize settings | false | `true`, `false` |
| **[Max Request Cost](https://scrapeops.io/docs/web-scraping-proxy-api-aggregator/advanced-functionality/optimize-request/)** | Number | Max credits to use (with optimize) | 0 | `10`, `50`, `100` |
| **[Render JavaScript](https://scrapeops.io/docs/web-scraping-proxy-api-aggregator/advanced-functionality/headless-browser/)** | Boolean | Enable headless browser | false | `true`, `false` |
| **[Wait Time](https://scrapeops.io/docs/web-scraping-proxy-api-aggregator/advanced-functionality/wait-time/)** | Number | Wait before capture (ms) | 0 | `3000`, `5000` |
| **[Wait For](https://scrapeops.io/docs/web-scraping-proxy-api-aggregator/advanced-functionality/wait-for/)** | String | CSS selector to wait for | - | `.product-title`, `#content` |
| **[Scroll](https://scrapeops.io/docs/web-scraping-proxy-api-aggregator/advanced-functionality/scroll-page/)** | Number | Scroll pixels before capture | 0 | `1000`, `2000` |
| **[Screenshot](https://scrapeops.io/docs/web-scraping-proxy-api-aggregator/advanced-functionality/screenshot/)** | Boolean | Return base64 screenshot | false | `true`, `false` |
| **[Device Type](https://scrapeops.io/docs/web-scraping-proxy-api-aggregator/advanced-functionality/device-type/)** | String | Device emulation | desktop | `desktop`, `mobile` |
| **[Premium Proxies](https://scrapeops.io/docs/web-scraping-proxy-api-aggregator/advanced-functionality/premium-proxies/)** | String | Premium level | level_1 | `level_1`, `level_2` |
| **[Residential Proxies](https://scrapeops.io/docs/web-scraping-proxy-api-aggregator/advanced-functionality/residential-proxies/)** | Boolean | Use residential IPs | false | `true`, `false` |
| **[Mobile Proxies](https://scrapeops.io/docs/web-scraping-proxy-api-aggregator/advanced-functionality/mobile-proxies/)** | Boolean | Use mobile IPs | false | `true`, `false` |
| **[Session Number](https://scrapeops.io/docs/web-scraping-proxy-api-aggregator/advanced-functionality/sticky-sessions/)** | Number | Sticky session ID | 0 | `12345`, `67890` |
| **[Country](https://scrapeops.io/docs/web-scraping-proxy-api-aggregator/advanced-functionality/country-geotargeting/)** | String | Geo-targeting country | - | `us`, `gb`, `de`, `fr`, `ca`, `au`, `jp`, `in` |
| **[Bypass](https://scrapeops.io/docs/web-scraping-proxy-api-aggregator/advanced-functionality/anti-bot-bypass/)** | String | Anti-bot bypass level | - | `cloudflare_level_1`, `cloudflare_level_2`, `cloudflare_level_3`, `datadome`, `perimeterx`, `incapsula`, `generic_level_1` to `generic_level_4` |

**Example Configuration:**
```
API Type: Proxy API
URL: https://example.com
Method: GET
Render JavaScript: true
Wait Time: 3000
Country: us
```

### 📊 Parser API

Parse HTML into structured JSON for supported domains.

**Parameters:**
- **Domain:** [Amazon](https://scrapeops.io/docs/parser-api/parsers/amazon-product-parser/), [eBay](https://scrapeops.io/docs/parser-api/parsers/ebay-product-parser/), [Walmart](https://scrapeops.io/docs/parser-api/parsers/walmart-product-parser/), [Indeed](https://scrapeops.io/docs/parser-api/parsers/indeed-product-parser/), [Redfin](https://scrapeops.io/docs/parser-api/parsers/redfin-product-parser/)
- **URL:** Page URL (required)
- **HTML Content:** Raw HTML to parse (required)

**Example Configuration:**
```
API Type: Parser API
Domain: Amazon
URL: https://www.amazon.com/dp/B08N5WRWNW
HTML Content: {{ $node["Proxy_API"].json.body }}
```

### 💾 Data API

Tap into pre-scraped datasets for commerce, jobs, and real estate without maintaining your own crawlers or parsers.

**Workflow basics**

- **Domain**: Choose `Amazon`, `eBay`, `Walmart`, `Indeed`, or `Redfin`.
- **API Type**: Select the dataset endpoint that matches the data you need (product, search, reviews, etc.).
- **Input Type**: Decide whether you want to identify the record via ID, query, or URL.
- **Advanced Options**: Provide localization parameters (`country`, `tld`) when available to scope the dataset to a specific market.
- All Data API calls are `GET` requests to `https://proxy.scrapeops.io/v1/structured-data/<domain>/<endpoint>` authenticated with your ScrapeOps API key.

**Quick n8n example**

```
API Type: Data API
Domain: Amazon
API Endpoint: Product API
Input Type: ASIN
ASIN: B08N5WRWNW
Advanced Options: Country = us, TLD = com
```

```
curl -G "https://proxy.scrapeops.io/v1/structured-data/amazon/product" \
  --data-urlencode "api_key=YOUR_API_KEY" \
  --data-urlencode "asin=B08N5WRWNW" \
  --data-urlencode "country=us" \
  --data-urlencode "tld=com"
```

#### Amazon Data API

Get normalized product details or search result summaries for any Amazon locale.

**Endpoints**

| Endpoint | Path | Input Types | Description |
|----------|------|-------------|-------------|
| Product API | `/structured-data/amazon/product` | `asin`, `url` | Returns product attributes, pricing, inventory, variations, media, and buy box metadata. |
| Product Search API | `/structured-data/amazon/search` | `query`, `url` | Returns paginated search results including summary cards, pricing, badges, and sponsored flags. |

**Advanced options**

| Option | Details |
|--------|---------|
| `country` | Two-letter locale that controls the market being scraped (e.g. `us`, `uk`, `ca`, `de`, `fr`, `it`, `es`, `nl`, `pl`, `in`, `jp`, `au`, `mx`, `br`, `sa`, `ae`). |
| `tld` | Amazon domain to target: `com`, `co.uk`, `de`, `fr`, `es`, `it`, `nl`, `pl`, `com.au`, `com.br`, `com.mx`, `co.jp`, `ae`, `sa`, `ca`, `in`, `com.tr`. |

**Sample request**

```
curl -G "https://proxy.scrapeops.io/v1/structured-data/amazon/search" \
  --data-urlencode "api_key=YOUR_API_KEY" \
  --data-urlencode "query=wireless earbuds" \
  --data-urlencode "country=us" \
  --data-urlencode "tld=com"
```

#### eBay Data API

Retrieve listing, search, feedback, and storefront data from eBay without touching the site.

**Endpoints**

| Endpoint | Path | Input Types | Description |
|----------|------|-------------|-------------|
| Product API | `/structured-data/ebay/product` | `item_id`, `url` | Detailed listing data including price history, seller stats, and media. |
| Search API | `/structured-data/ebay/search` | `query`, `url` | Aggregated search results with pagination and sorting metadata. |
| Feedback API | `/structured-data/ebay/feedback` | `username`, `url` | Seller/buyer feedback profiles and the underlying entries. |
| Category API | `/structured-data/ebay/category` | `category_id`, `url` | Structured product grids for any eBay category page. |
| Store API | `/structured-data/ebay/store` | `store_name`, `url` | Highlights and featured products for public storefronts. |

Inputs that contain URLs should be URL encoded before sending (n8n handles this automatically when you paste a URL into the field).

**Sample request**

```
curl -G "https://proxy.scrapeops.io/v1/structured-data/ebay/product" \
  --data-urlencode "api_key=YOUR_API_KEY" \
  --data-urlencode "item_id=155555555555"
```

#### Walmart Data API

Access Walmart structured datasets for products, search results, reviews, shops, browse paths, and categories. All endpoints support optional `country` and `tld` parameters to localize the response (`country` examples: `us`, `ca`, `mx`; `tld` options: `com`, `ca`, `com.mx`, `cl`, `com.br`).

**Endpoints**

| Endpoint | Path | Input Types |
|----------|------|-------------|
| Product API | `/structured-data/walmart/product` | `product_id`, `url` |
| Product Search API | `/structured-data/walmart/search` | `query`, `url` |
| Review API | `/structured-data/walmart/reviews` | `product_id`, `url` |
| Shop API | `/structured-data/walmart/shop` | `shop_id`, `url` |
| Browse API | `/structured-data/walmart/browse` | `browse_path`, `url` |
| Category API | `/structured-data/walmart/category` | `category_id`, `url` |

##### Walmart Product API

Leverage the dedicated `walmart/product` endpoint to retrieve structured data for any public Walmart product page.

**Request Examples**

```
curl -GET "https://proxy.scrapeops.io/v1/structured-data/walmart/product?api_key=YOUR_API_KEY&product_id=405234096&country=us"
```

```
curl -GET "https://proxy.scrapeops.io/v1/structured-data/walmart/product?api_key=YOUR_API_KEY&url=https%3A%2F%2Fwww.walmart.com%2Fip%2F405234096"
```

**Authentication**

You must supply your ScrapeOps `api_key` with every request (see the Authentication section above). Requests without a valid key return `403 Forbidden`.

**Parameters**

| Parameter   | Description |
|-------------|-------------|
| `api_key`   | **Required.** ScrapeOps API key used for authentication. |
| `product_id`| Walmart Product ID you want to fetch. |
| `url`       | Encoded Walmart product URL. If present, URL takes precedence over `product_id`. |
| `country`   | Two-letter country code that controls the locale to scrape from (e.g. `us`, `ca`, `mx`). |
| `tld`       | Walmart top-level domain such as `com`, `ca`, `com.mx`, `cl`, `com.br`. |

| TLD | Domain |
|-----|--------|
| `com` | `walmart.com` |
| `ca` | `walmart.ca` |
| `com.mx` | `walmart.com.mx` |
| `cl` | `walmart.cl` |
| `com.br` | `walmart.com.br` |

##### Walmart Product Search API

Search Walmart’s catalog with the `walmart/search` endpoint using either a text query or an existing search results URL.

**Request Examples**

```
curl -GET "https://proxy.scrapeops.io/v1/structured-data/walmart/search?api_key=YOUR_API_KEY&query=laptop&country=us"
```

```
curl -GET "https://proxy.scrapeops.io/v1/structured-data/walmart/search?api_key=YOUR_API_KEY&url=https%3A%2F%2Fwww.walmart.com%2Fsearch%3Fq%3Dlaptop"
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `api_key` | **Required.** ScrapeOps API key used for authentication. |
| `query`   | Search keyword/phrase you want Walmart to return results for. |
| `url`     | Encoded Walmart search URL. Overrides `query` if supplied. |
| `country` | Two-letter ISO country code for localized search (e.g. `us`, `ca`, `mx`). |
| `tld`     | Walmart top-level domain such as `com`, `ca`, `com.mx`, `cl`, `com.br`. |

Use the same TLD mapping table from the Product API section to choose the correct domain.

##### Walmart Review API

Gather structured review data for any Walmart product via the `walmart/reviews` endpoint.

**Request Examples**

```
curl -GET "https://proxy.scrapeops.io/v1/structured-data/walmart/reviews?api_key=YOUR_API_KEY&product_id=1833409885&country=us"
```

```
curl -GET "https://proxy.scrapeops.io/v1/structured-data/walmart/reviews?api_key=YOUR_API_KEY&url=https%3A%2F%2Fwww.walmart.com%2Fip%2F1833409885"
```

**Parameters**

| Parameter   | Description |
|-------------|-------------|
| `api_key`   | **Required.** ScrapeOps API key used for authentication. |
| `product_id`| Walmart Product ID whose reviews you want to retrieve. |
| `url`       | Encoded Walmart review page URL. Overrides `product_id` when provided. |
| `country`   | Two-letter ISO country code controlling localization. |
| `tld`       | Walmart top-level domain such as `com`, `ca`, `com.mx`, `cl`, `com.br`. |

##### Walmart Shop API

Fetch data for Walmart brand and seller pages using the `walmart/shop` endpoint.

**Request Examples**

```
curl -GET "https://proxy.scrapeops.io/v1/structured-data/walmart/shop?api_key=YOUR_API_KEY&shop_id=12345&country=us"
```

```
curl -GET "https://proxy.scrapeops.io/v1/structured-data/walmart/shop?api_key=YOUR_API_KEY&url=https%3A%2F%2Fwww.walmart.com%2Fbrand%2F10027886"
```

**Parameters**

| Parameter | Description |
|-----------|-------------|
| `api_key` | **Required.** ScrapeOps API key used for authentication. |
| `shop_id` | Walmart Shop ID (brand or seller identifier). |
| `url`     | Encoded Walmart shop page URL. Overrides `shop_id` when supplied. |
| `country` | Two-letter ISO country code controlling localization. |
| `tld`     | Walmart top-level domain such as `com`, `ca`, `com.mx`, `cl`, `com.br`. |

##### Walmart Browse API

Get structured category/browse listings using the `walmart/browse` endpoint. Supply either the browse path hierarchy or a URL.

**Request Examples**

```
curl -GET "https://proxy.scrapeops.io/v1/structured-data/walmart/browse?api_key=YOUR_API_KEY&browse_path=3944_1060825_447913&country=us"
```

```
curl -GET "https://proxy.scrapeops.io/v1/structured-data/walmart/browse?api_key=YOUR_API_KEY&url=https%3A%2F%2Fwww.walmart.com%2Fbrowse%2Felectronics%2F3944_1060825_447913"
```

**Parameters**

| Parameter     | Description |
|---------------|-------------|
| `api_key`     | **Required.** ScrapeOps API key used for authentication. |
| `browse_path` | Walmart browse hierarchy (e.g. `3944_1060825_447913`). |
| `url`         | Encoded Walmart browse URL. Overrides `browse_path` when provided. |
| `country`     | Two-letter ISO country code controlling localization. |
| `tld`         | Walmart top-level domain such as `com`, `ca`, `com.mx`, `cl`, `com.br`. |

##### Walmart Category API

Query Walmart category pages via the `walmart/category` endpoint using a numeric category ID or a full URL.

**Request Examples**

```
curl -GET "https://proxy.scrapeops.io/v1/structured-data/walmart/category?api_key=YOUR_API_KEY&category_id=1007039&country=us"
```

```
curl -GET "https://proxy.scrapeops.io/v1/structured-data/walmart/category?api_key=YOUR_API_KEY&url=https%3A%2F%2Fwww.walmart.com%2Fcp%2Felectronics%2F1007039"
```

**Parameters**

| Parameter     | Description |
|---------------|-------------|
| `api_key`     | **Required.** ScrapeOps API key used for authentication. |
| `category_id` | Walmart Category ID you want to fetch. |
| `url`         | Encoded Walmart category URL. Overrides `category_id` when present. |
| `country`     | Two-letter ISO country code controlling localization. |
| `tld`         | Walmart top-level domain such as `com`, `ca`, `com.mx`, `cl`, `com.br`. |

#### Indeed Data API

Automate research across Indeed job listings and company profiles.

**Endpoints**

| Endpoint | Path | Input Types | Description |
|----------|------|-------------|-------------|
| Job Search | `/structured-data/indeed/job-search` | `query`, `url` | Returns search result listings plus pagination metadata. |
| Job Detail | `/structured-data/indeed/job-detail` | `job_id`, `url` | Returns a structured snapshot of an individual job posting. |
| Company Search | `/structured-data/indeed/company-search` | `query`, `url` | Search for companies by keyword or copy/paste a company search URL. |
| Top Companies | `/structured-data/indeed/top-companies` | `industry`, `url` | Returns Indeed's curated top-companies listings filtered by industry or URL. |
| Company Snapshot | `/structured-data/indeed/company-snapshot` | `company_id`, `url` | Retrieves the high-level snapshot tile for a company. |
| Company About | `/structured-data/indeed/company-about` | `company_id`, `url` | Returns the long-form company about data. |
| Company Reviews | `/structured-data/indeed/company-reviews` | `company_id`, `url` | Fetches review aggregates plus the underlying review entries. |
| Company Jobs | `/structured-data/indeed/company-jobs` | `company_id`, `url` | Lists the currently advertised jobs for a company profile. |

All Indeed endpoints honor optional `country` and `tld` advanced options so that you can mirror regional subdomains (e.g. `co.uk`, `ca`, `fr`, `in`). The `Top Companies` endpoint accepts either a free-text industry filter or a direct URL copied from Indeed.

**Sample requests**

```
curl -G "https://proxy.scrapeops.io/v1/structured-data/indeed/job-search" \
  --data-urlencode "api_key=YOUR_API_KEY" \
  --data-urlencode "query=frontend engineer" \
  --data-urlencode "country=us" \
  --data-urlencode "tld=com"
```

```
curl -G "https://proxy.scrapeops.io/v1/structured-data/indeed/job-detail" \
  --data-urlencode "api_key=YOUR_API_KEY" \
  --data-urlencode "job_id=1234567890" \
  --data-urlencode "country=us"
```

#### Redfin Data API

Pull structured residential real estate data from Redfin for both sale and rental markets.

**Endpoints**

| Endpoint | Path | Input Types | Description |
|----------|------|-------------|-------------|
| Sale Search | `/structured-data/redfin/sale-search` | `parameters` (city_id, state, city) or `url` | Returns listings for homes for sale in a city. |
| Rent Search | `/structured-data/redfin/rent-search` | `parameters` (city_id, state, city) or `url` | Returns rental listings for a city or metro. |
| Sale Detail | `/structured-data/redfin/sale-detail` | `parameters` (state, path, home_id) or `url` | Fetches the detail page for a specific for-sale property. |
| Rent Detail | `/structured-data/redfin/rent-detail` | `parameters` (state, path, property_id) or `url` | Fetches the detail page for a rental. |
| Building Detail | `/structured-data/redfin/building-detail` | `parameters` (state, city, building, building_type, building_id) or `url` | Returns amenity and unit data for multi-unit buildings. |
| State Search | `/structured-data/redfin/state-search` | `state`, `url` | Returns market-level data for a Redfin state page. |
| Agent Search | `/structured-data/redfin/agent-search` | `parameters` (city_id, state, city) or `url` | Lists Redfin agents for a given geography. |
| Agent Profile | `/structured-data/redfin/agent-profile` | `agent`, `url` | Fetches a single agent profile. |

Optional Redfin advanced options mirror the `country` and `tld` fields in the node (currently `us`/`ca` and `com`/`ca`). When using the `parameters` input type, make sure to provide all required fields surfaced in the node UI (e.g., City ID + State Code + City Name for city-based searches).

**Sample request**

```
curl -G "https://proxy.scrapeops.io/v1/structured-data/redfin/sale-search" \
  --data-urlencode "api_key=YOUR_API_KEY" \
  --data-urlencode "city_id=30749" \
  --data-urlencode "state=NY" \
  --data-urlencode "city=New York" \
  --data-urlencode "country=us"
```

---

## 🎯 Common Use Cases

### 1. **Price Monitoring**
- Track product prices across multiple e-commerce sites
- Set up alerts for price drops
- Generate competitive pricing reports

### 2. **Market Research**
- Collect product reviews and ratings
- Monitor competitor inventory
- Track market trends

### 3. **Lead Generation**
- Extract business information from directories
- Collect job postings from career sites
- Find real estate listings

### 4. **Content Aggregation**
- Collect news articles
- Monitor social media mentions
- Aggregate product descriptions

---

## 🛠️ Best Practices

### 1. Start Simple
Begin with basic requests and add complexity:
```
1. Basic GET request
2. Add JavaScript rendering if needed
3. Add wait conditions
4. Enable anti-bot bypass if blocked
```

### 2. Optimize for Cost
- Use [`optimize_request: true`](https://scrapeops.io/docs/web-scraping-proxy-api-aggregator/advanced-functionality/optimize-request/) for automatic optimization
- Set `max_request_cost` to control spending
- Only enable features you need

### 3. Handle Dynamic Content
For JavaScript-heavy sites:
```
Render JavaScript: true
Wait Time: 3000
Wait For: .main-content
Scroll: 1000
```

### 4. Session Management
For multi-step scraping:
```
Session Number: 12345
// Use same number across requests
```

---

## 🐛 Troubleshooting

### Node Not Appearing
**Problem:** ScrapeOps node doesn't show up after installation

**Solution:**
1. Ensure n8n was restarted after installation
2. Check that community nodes are enabled
3. Verify the installation with: `npm list @scrapeops/n8n-nodes-scrapeops`

### Authentication Failures
**Problem:** "Invalid API Key" error

**Solution:**
1. Verify API key is copied correctly (no extra spaces)
2. Check if API key is active in ScrapeOps dashboard
3. Ensure you're using the correct credential in the node

### Connection Timeouts
**Problem:** Requests timing out

**Solution:**
1. Check your firewall settings
2. Verify n8n can make external HTTP requests
3. Test with a simple URL first (like httpbin.org)

---

## 📖 Resources

- **[ScrapeOps Documentation](https://scrapeops.io/docs/intro/)** - Complete API documentation
- **[ScrapeOps n8n Node Documentation](https://scrapeops.io/docs/n8n/overview)** - Complete ScrapeOps n8n Node documentation
- **[n8n Community Nodes Documentation](https://docs.n8n.io/integrations/community-nodes/)** - n8n integration guide
- **[ScrapeOps Dashboard](https://scrapeops.io/app/dashboard)** - Monitor usage and performance
- **[n8n Community Forum](https://community.n8n.io/)** - Get help from the community

---

## 🤝 Support

- **ScrapeOps Support:** support@scrapeops.io
- **n8n Community Forum:** [community.n8n.io](https://community.n8n.io)
- **GitHub Issues:** [Report bugs or request features](https://github.com/ScrapeOps/n8n-community-node/issues)

---

## 📄 License

[MIT](LICENSE.md)

---

**Ready to automate your web scraping?** Get started with the [ScrapeOps n8n integration](https://n8n.io/integrations/scrapeops/) today!
