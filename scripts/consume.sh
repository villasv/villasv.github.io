#!/usr/bin/env -S bash -u

jqr() { jq -r "$2" <(echo "$1"); }
yqr() { yq "$2" <(echo "$1"); }

function handle_issues() {
    while read -r line; do
        handle_issue "$line"
    done
}

function handle_issue() {
    label=$(jqr "$1" '.labels[].name')
    echo "<$label>"
    case $label in
    "check-in") handle_checkin "$1" ;;
    esac
}

function handle_checkin() {
    body="$(jqr "$1" '.body')"
    datetime=$(yqr "$body" ".Timestamp" | sed 's/[-:T]//g')
    initials=$(yqr "$body" ".CheckInID" | tr '[:lower:]' '[:upper:]')
    file_name="${datetime:0:15}${initials:0:8}"
    yqr "$body" '.' >"./database/check-in/$file_name.yml"
}

function close_issue() {
    issue_number=$(jq -r '.number' <(echo "$1"))
    gh issue close "$issue_number"
}

gh issue list --author "$GITHUB_REPOSITORY_OWNER" --state open --limit 100 --json number,body,labels |
    jq -r --compact-output '.[]' | handle_issues
