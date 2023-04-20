#!/usr/bin/env -S bash -u

jqr() { jq -r "$2" <(echo "$1"); }

function handle_issue() {
    issue="$(</dev/stdin)"
    label=$(jqr "$issue" '.labels[].name')
    case $label in
    "check-in") handle_checkin "$issue" ;;
    esac
}

function handle_checkin() {
    body=$(jqr "$1" '.body')
    echo "$body"
    #TODO generate yaml from kvps
}

function close_issue() {
    issue_number=$(jq -r '.number' <(echo "$1"))
    gh issue close "$issue_number"
}

gh issue list --author "$GITHUB_REPOSITORY_OWNER" --state open --limit 100 --json number,body,labels |
    jq --compact-output '.[]' | handle_issue
