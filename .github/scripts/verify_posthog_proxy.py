"""Check the browser's PostHog proxy before deploying, without capturing events."""

import json
import os
import sys
from urllib.error import HTTPError, URLError
from urllib.parse import quote, urlsplit
from urllib.request import Request, urlopen

# This script checks the production deployment, including its cross-origin browser requests.
SITE_ORIGIN = "https://thenewboston.net"
REQUEST_HEADERS = {"Origin": SITE_ORIGIN, "User-Agent": "thenewboston-deployment-healthcheck/1.0"}


def read_response(request, expected_host):
    with urlopen(request, timeout=15) as response:
        if response.status != 200 or urlsplit(response.url).netloc != expected_host:
            raise ValueError("The proxy must return HTTP 200 without redirecting to another host")
        if response.headers.get("Access-Control-Allow-Origin") not in {"*", SITE_ORIGIN}:
            raise ValueError("The proxy must allow cross-origin requests from the production site")
        body = response.read(2_000_001)
        if not body or len(body) > 2_000_000:
            raise ValueError("The proxy returned an empty or oversized response")
        return response.headers.get_content_type(), body


def main():
    host = os.environ["REACT_APP_POSTHOG_HOST"].rstrip("/")
    token = os.environ["REACT_APP_POSTHOG_KEY"]
    parsed_host = urlsplit(host)
    if (
        parsed_host.scheme != "https"
        or not parsed_host.hostname
        or parsed_host.username
        or parsed_host.password
        or parsed_host.path
        or parsed_host.query
        or parsed_host.fragment
        or not token
    ):
        raise ValueError("Configure a valid HTTPS proxy origin and a public project token")

    config_request = Request(f"{host}/array/{quote(token, safe='')}/config.js", headers=REQUEST_HEADERS)
    content_type, body = read_response(config_request, parsed_host.netloc)
    if content_type not in {"application/javascript", "text/javascript"} or body.lstrip().startswith(b"<"):
        raise ValueError("The proxy config.js endpoint must return JavaScript")

    flags_request = Request(
        f"{host}/flags/?v=2",
        data=json.dumps({"api_key": token, "distinct_id": "posthog-proxy-healthcheck"}).encode(),
        headers={**REQUEST_HEADERS, "Content-Type": "application/json"},
        method="POST",
    )
    content_type, body = read_response(flags_request, parsed_host.netloc)
    if content_type != "application/json":
        raise ValueError("The proxy flags endpoint must return JSON")
    flags = json.loads(body)
    if not isinstance(flags, dict) or not isinstance(flags.get("flags"), dict):
        raise ValueError("The proxy flags response must contain a flags object")

    print("PostHog proxy checks passed: SDK configuration and feature flags are reachable.")


if __name__ == "__main__":
    try:
        main()
    except (HTTPError, URLError, TimeoutError, ValueError, KeyError) as error:
        print(f"PostHog proxy check failed: {error}", file=sys.stderr)
        sys.exit(1)
