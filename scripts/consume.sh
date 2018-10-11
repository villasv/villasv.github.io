#!/usr/bin/env -S bash -u

jqr() { jq -r "$2" <(echo "$1"); }
yqr() { yq "$2" <(echo "$1"); }

function handle_issues() {
    while read -r issue; do
        label=$(jqr "$issue" .labels[].name)
        case $label in
        "check-in") handle_checkin "$issue" ;;
        esac
    done
}

function handle_checkin() {
    issue=$(jqr "$1" .number)
    title=$(jqr "$1" .title)
    body=$(jqr "$1" .body)

    #TODO: materialize only if issue is newer than file
    datetime=$(yqr "$body" ".Timestamp" | sed 's/[-:T]//g')
    initials=$(yqr "$body" ".CheckInID" | tr '[:lower:]' '[:upper:]')
    file_name="${datetime:0:15}${initials:0:8}"
    file_path="./data/checkin/$file_name.yml"
    file_modified=$(git log -1 --pretty="format:%ct" "$file_path")
    echo "$file_modified -> materializing '$title'"

    # materialize
    echo "PlaceName: ${title/Check-In at /}" >"$file_path"
    echo "$body" >>"$file_path"

    # consume
    gh issue close "$issue"
}

gh issue list --author "$GITHUB_REPOSITORY_OWNER" --state open --limit 100 --json number,title,body,labels |
    jq -r --compact-output '.[]' | handle_issues
