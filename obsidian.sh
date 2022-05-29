#!/usr/bin/env -S bash -e

find content ! -name 'content' -type d -exec rm -rf "{}" || true
if [ ! -d "./obsidian" ]; then
  git clone --depth 1 git@github.com:villasv/obsidian-personal.git ./obsidian
fi

PLATFORM=$(uname)
OBSIDIAN_EXPORT=./bin/obsidian-export-$PLATFORM

NOTE_FILES=$(find "./obsidian" -type f | grep -E "Notes/.*\md$")
while read NOTE_FILE
do
  NOTE_PATH=$(echo "${NOTE_FILE}" | perl -pe 's/\.\/obsidian\///;')
  NOTE_DIRNAME=$(dirname "${NOTE_PATH}")
  NOTE_BASENAME=$(basename "${NOTE_PATH}")
  PAGE_DIRNAME="./content/${NOTE_DIRNAME}"
  PAGE_PATH="${PAGE_DIRNAME}/${NOTE_BASENAME}"
  # Create directory structure
  mkdir -p "${PAGE_DIRNAME}"
  # Export markdown files
  $OBSIDIAN_EXPORT ./obsidian --start-at "${NOTE_FILE}" --frontmatter=always "${PAGE_PATH}"
  # Inject frontmatter metadata
  NOTE_TITLE=$(basename "${NOTE_FILE}" .md)
  SANITIZED_PATH=$(echo "${NOTE_FILE}" \
    | tr '[:upper:]' '[:lower:]' \
    | perl -pe 's/[^\w\n\/. ]//g;' -pe 's/\/ /\//g;' -pe 's/ /-/g;' \
    | perl -pe 's/notes\///;' -pe 's/\.\/obsidian\///;')
  EXTRA_FRONTMATTER="title: ${NOTE_TITLE}\nurl: ${SANITIZED_PATH}"
  perl -i -lpe "print \"${EXTRA_FRONTMATTER}\" if $. == 2" "${PAGE_PATH}"
done < <(printf '%s\n' "${NOTE_FILES}")
