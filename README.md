## Project setup

Create a `.env.development` file.

```
REACT_APP_API_URL=http://127.0.0.1:8000
REACT_APP_WS_URL=ws://127.0.0.1:8000
```

## Product analytics

PostHog runs in production builds when `REACT_APP_POSTHOG_KEY` and `REACT_APP_POSTHOG_HOST` are configured. Use the public project token and ingestion host from the **thenewboston** project (project ID `756373`, US Cloud). No personal API key belongs in the browser. Development and test builds do not send analytics; missing configuration leaves local builds usable.

Production builds receive these values from GitHub Actions secrets `PROD_POSTHOG_KEY` and `PROD_POSTHOG_HOST`. The deployment checks they are present before building. For a local production smoke test, put the values in the ignored `.env.production.local` file, run `npm run build`, and serve `build/` with an SPA fallback.

The integration records route-based pageviews, clicks, rage/dead clicks, page leaves, web vitals, authentication prompts, and allowlisted API operation outcomes. `api_operation_started`, `api_operation_succeeded`, `api_operation_failed`, and `api_operation_cancelled` include a static operation/endpoint, HTTP method/status, and duration. Search text, request/response bodies, headers, tokens, balances, amounts, and recipient IDs are excluded. Use the `operation` property to build signup, sign-in, posting, transfer, and game-action funnels; filter failures by status and route, then open linked session replays.

Clicks are told apart by name, because their text and attributes are masked. `analyticsArea` and `analyticsTarget` from `utils/analyticsAttributes` (or the `analyticsName` prop of `Button`) add the `click_area` and `click_target` properties to every click, dead click, and rage click on or inside an element. Name new navigation items and calls to action the same way, with static names only. Scroll depth is measured in the main scrollable area. Paths that only redirect (`/exchange`, `/currencies`, `/wallets`, `/connect-five`, `/feed`) are not counted as pageviews. The referring site is reported as an origin without a path or query string, and campaign parameters are not collected.

Events from a browser that a staff member has signed in on carry `internal_traffic: true`, signed in or not. Exclude that property under "Filter out internal and test users" in the PostHog project settings to keep staff activity out of reports.

Signed-in visitors are identified only by their numeric account ID. Logout and account switches reset analytics identity. URLs omit query strings, hashes, and dynamic IDs. Autocapture masks element text/attributes and does not capture input values or clipboard contents. Replays mask all text and inputs, block images/media/file uploads, and exclude console logs, network details, and JSON-LD. Browser Do Not Track is respected. Detailed exception reporting remains in Sentry.

Session replay is enabled for a 10% sample with 30-day retention in the PostHog project settings; analytics events are not sampled. Project settings mask all text and inputs, block media, disable console/network capture, and anonymize IPs. Keep these safeguards when adjusting replay sampling. The SDK also masks attributes and strips replay URLs. The project token is public ingestion configuration; keep administrative credentials out of source control and frontend environment variables. A reverse proxy can be added at the hosting layer later if ad blockers cause gaps ([PostHog proxy documentation](https://posthog.com/docs/advanced/proxy)).

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

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
