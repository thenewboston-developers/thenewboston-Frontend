## Trade page fails for asset pairs beyond first page

**What happens**  
- Navigating to `/exchange/trade/:assetPairId` (e.g., `/exchange/trade/45`) results in an empty/partially broken trade view when that `assetPairId` is not included in the first page of `/api/asset-pairs`. Components get `activeAssetPair = null`, so Chart/OrderTools/OrderBook/WebSockets do not render data.

**Why it happens (root cause)**  
- The trade page (`src/pages/Exchange/MainArea/Trade/index.tsx`) calls `_getAssetPairs()` with no params, so it only fetches the first page from `/api/asset-pairs`.  
- The backend paginates with a default `page_size = 20` (`CustomPageNumberPagination` using `DEFAULT_PAGE_SIZE = 20`), so any asset pair beyond the first 20 is not returned.  
- The dispatcher (`src/dispatchers/assetPairs.ts`) dispatches only `responseData.results`, and the reducer (`src/store/assetPairs.ts`) replaces state with that single page instead of merging. There is no follow-up fetch for the specific `assetPairId`, so IDs outside the first page are absent and resolve to `null`.  
- Currency detail pages avoid the issue by filtering for the exact pair using ticker params, which returns the relevant asset pair even when it is not on page one.

**Impact**  
- Trade pages for asset pairs beyond the first page are non-functional; sockets never subscribe and the trading UI remains empty.

**Proposed fix (recommended)**  
- On load of the trade page, fetch the specific asset pair by id (e.g., `/api/asset-pairs/:id` or a filtered call by id) before rendering. This guarantees `activeAssetPair` is populated regardless of pagination. Keep or separately fetch a paginated list for the selector as needed, but the primary path should load the requested pair directly.
