#!/usr/bin/env -S bash -u
set -o nounset

open_issues="$(curl -L \
    -H "Accept: application/vnd.github+json" \
    -H "X-GitHub-Api-Version: 2022-11-28" \
    -H "Authorization: Bearer ${GITHUB_TOKEN}" \
    -H "per_page: 100" -H "state: open" \
    "https://api.github.com/repos/${GITHUB_REPOSITORY}/issues")"

jq --compact-output '.[]' <(echo "$open_issues") |
    cat
