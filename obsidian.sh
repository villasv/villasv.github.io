#!/usr/bin/env bash -ex

find content ! -name 'content' -type d -exec rm -r {} +
if [ ! -d "./obsidian" ]; then
  git clone --depth 1 git@github.com:villasv/obsidian-personal.git ./obsidian
fi

PLATFORM=$(uname)
OBSIDIAN_EXPORT=./bin/obsidian-export-$PLATFORM

NOTE_FILES=$(find "./obsidian" -type f | grep -E "Notes/.*\md$")
while read NOTE_FILE
do
  SANITIZED_PATH=$(echo "${NOTE_FILE}" \
    | tr '[:upper:]' '[:lower:]' \
    | perl -pe 's/[^\w\n\/. ]//g;' -pe 's/\/ /\//g;' -pe 's/ /-/g;' \
    | perl -pe 's/notes\///;' -pe 's/\.\/obsidian\///;')
  SANITIZED_DIRNAME=$(dirname ${SANITIZED_PATH})
  SANITIZED_BASENAME=$(basename ${SANITIZED_PATH})
  TARGET_DIRNAME="./content/${SANITIZED_DIRNAME}"
  TARGET_PATH="${TARGET_DIRNAME}/${SANITIZED_BASENAME}"
  # Create directory structure
  mkdir -p "${TARGET_DIRNAME}"
  # Export markdown files
  $OBSIDIAN_EXPORT ./obsidian --start-at "${NOTE_FILE}" --frontmatter=always "${TARGET_PATH}"
  # Inject frontmatter metadata
  NOTE_TITLE=$(basename "${NOTE_FILE}" .md)
  EXTRA_FRONTMATTER="title: ${NOTE_TITLE}"
  perl -i -lpe "print \"${EXTRA_FRONTMATTER}\" if $. == 2" "${TARGET_PATH}"
done < <(printf '%s\n' "${NOTE_FILES}")
