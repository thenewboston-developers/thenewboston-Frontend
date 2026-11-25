## Project setup

Create a `.env.development` file.

```
REACT_APP_API_URL=http://127.0.0.1:8000
REACT_APP_WS_URL=ws://127.0.0.1:8000
```

## Product analytics

PostHog runs in production builds when `REACT_APP_POSTHOG_KEY`, `REACT_APP_POSTHOG_HOST`, and `REACT_APP_POSTHOG_UI_HOST` are configured. Use the public project token from the **thenewboston** project (project ID `756373`, US Cloud), `https://e.thenewboston.net` as the managed proxy ingestion host, and `https://us.posthog.com` as the UI host for PostHog links and the toolbar. No personal API key belongs in the browser. Development and test builds do not send analytics; missing configuration leaves local builds usable.

Production builds receive these values from GitHub Actions secrets `PROD_POSTHOG_KEY` and `PROD_POSTHOG_HOST`, and repository variable `PROD_POSTHOG_UI_HOST`. The deployment checks they are present before building. Keep `https://thenewboston.net` in the project's authorized URLs so the toolbar can launch on the production site. The proxy's DNS record must match PostHog's reverse proxy setup; wait for its ready status and valid certificate before changing the ingestion host. For a local production smoke test, put the values in the ignored `.env.production.local` file, run `npm run build`, and serve `build/` with an SPA fallback.

Before uploading a build to S3, the deployment fetches the proxy's SDK configuration and feature flags. These checks validate HTTPS, cross-origin access from the production site, and expected response formats without capturing analytics events. Run the same check with `python3 .github/scripts/verify_posthog_proxy.py` when troubleshooting; it reads `REACT_APP_POSTHOG_HOST` and `REACT_APP_POSTHOG_KEY` from the environment.

The integration records route-based pageviews, clicks, rage/dead clicks, page leaves, web vitals, authentication prompts, and allowlisted API operation outcomes. `api_operation_started`, `api_operation_succeeded`, `api_operation_failed`, and `api_operation_cancelled` include a static operation/endpoint, HTTP method/status, and duration. These generic API events exclude search text, request/response bodies, headers, tokens, balances, amounts, and recipient IDs. Use the `operation` property to investigate API failures; use the dedicated game events below to measure gameplay and rewards.

### Game analytics

The browser records `games_viewed`, `game_selected`, `game_lobby_viewed`, `game_match_viewed`, `game_start_requested` (computer-play intent), `game_challenge_requested`, `game_reward_offer_viewed`, `game_signup_clicked`, `signup_started`, and fund contribution attempts/failures. Reward-offer exposure means at least half of the message entered the viewport; polling and rerenders do not create additional exposures. Browsers without IntersectionObserver do not report impressions. A guest-win offer is hypothetical and is never counted as a payment.

The backend owns `game_started`, `game_engaged`, `game_completed`, `game_reward_decided`, `game_reward_paid`, `game_fund_deposited`, and `signup_completed`. `game_started` means a match became active; `game_engaged` means the participant made their first successful human move, distinguishing opening a match from actually playing. Use these committed events for completions, earners, contributors and amounts, not browser request success or a viewed result. A human match has a lifecycle event for each participant; count distinct `(game, match_id)` for matches, events for participant plays, and unique persons for players. Game names use underscore slugs (for example `connect_five` and `dots_and_boxes`). Game analytics deliberately includes numeric match/account IDs, reward/deposit amounts and currency; server person properties may include public username/profile links so recipients can be identified. It does not include wallet credentials or balances.

Only requests to the configured API origin and `/api/` path receive the browser's PostHog distinct/session IDs, internal-traffic flag and bounded game-attribution headers. Disabled analytics, browser Do Not Track and SDK opt-out send `X-POSTHOG-OPT-OUT: 1` instead. Attribution is limited to the current tab, current anonymous identity and 30 minutes since the last game-related touch. The last game/match and offer/click flags accompany signup; login, signup and logout clear that context. Signup identifies the same anonymous visitor with the numeric account ID before further authenticated requests. These links measure observed conversion, not the causal effect of coin incentives; that requires a controlled experiment.

Clicks are told apart by name, because their text and attributes are masked. `analyticsArea` and `analyticsTarget` from `utils/analyticsAttributes` (or the `analyticsName` prop of `Button`) add the `click_area` and `click_target` properties to every click, dead click, and rage click on or inside an element. Name new navigation items and calls to action the same way, with static names only. Scroll depth is measured in the main scrollable area. Paths that only redirect (`/exchange`, `/currencies`, `/wallets`, `/connect-five`, `/feed`) are not counted as pageviews. The referring site is reported as an origin without a path or query string, and campaign parameters are not collected.

Events from a browser that a staff member has signed in on carry `internal_traffic: true`, signed in or not. Exclude that property under "Filter out internal and test users" in the PostHog project settings to keep staff activity out of reports.

Signed-in visitors use their numeric account ID as the analytics identity. Logout and account switches reset analytics identity. Browser-captured URLs omit query strings, hashes, and dynamic IDs; explicit game metadata may include numeric match IDs. Autocapture masks element text/attributes and does not capture input values or clipboard contents. Replays mask all text and inputs, block images/media/file uploads, and exclude console logs, network details, and JSON-LD. Browser Do Not Track is respected. Detailed exception reporting remains in Sentry.

Session replay is enabled for a 10% sample with 30-day retention in the PostHog project settings; analytics events are not sampled. Project settings mask all text and inputs, block media, disable console/network capture, and anonymize IPs. Keep these safeguards when adjusting replay sampling. The SDK also masks attributes and strips replay URLs. The project token is public ingestion configuration; keep administrative credentials out of source control and frontend environment variables. Browser traffic uses the PostHog-managed reverse proxy to reduce ad-blocker gaps while preserving the existing Do Not Track and opt-out handling ([PostHog proxy documentation](https://posthog.com/docs/advanced/proxy)).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Casino game pages

Slots and Roulette have independent page modules at `src/pages/Slots` and `src/pages/Roulette`, with canonical routes `/slots/home` and `/roulette/home`. Each game owns its stage, rules presentation, and game-specific controls. The Games catalog uses their thumbnails alongside the existing card conventions, with a separate section labeled for TNB wagers.

Shared wallet handling, wager requests and recovery, fund controls, receipt verification, and history remain in `src/components/Casino`, `src/api/casino.ts`, and the casino utilities/types. The `/api/casino` contract and user-scoped pending-request storage keys are unchanged. Legacy `/casino/slots` and `/casino/roulette` links redirect to the canonical game pages while preserving query strings and hashes.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
