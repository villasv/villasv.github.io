#!/usr/bin/env -S bash -u

jqr() { jq -r "$2" <(echo "$1"); }
yqr() { yq "$2" <(echo "$1"); }
re1() { [[ "$1" =~ $2 ]] && printf '%s\n' "${BASH_REMATCH[1]}"; }

function handle_issue() {
    issue="$(</dev/stdin)"
    label=$(jqr "$issue" '.labels[].name')
    case $label in
    "check-in") handle_checkin "$issue" ;;
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
    jq --compact-output '.[]' | handle_issue
