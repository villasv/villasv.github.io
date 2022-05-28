#!/usr/bin/env bash

if [ ! -d "./obsidian" ]; then
  git clone --depth 1 git@github.com:villasv/obsidian-personal.git ./obsidian
fi

NOTE_FILES=$(find . -type f | grep -E "Notes/.*\md$")
while read NOTE_FILE
do
  SANITIZED_PATH=$(echo "${NOTE_FILE}" \
    | tr '[:upper:]' '[:lower:]' \
    | perl -pe 's/[^\w\n\/. ]//g;' -pe 's/\/ /\//g;' -pe 's/ /-/g;' \
    | perl -pe 's/notes\///;' -pe 's/\.\/obsidian/notes/;')
  SANITIZED_DIRNAME=$(dirname ${SANITIZED_PATH})
  SANITIZED_BASENAME=$(basename ${SANITIZED_PATH})
  TARGET_DIRNAME="./content/${SANITIZED_DIRNAME}"
  TARGET_PATH="${TARGET_DIRNAME}/${SANITIZED_BASENAME}"
  # Create directory structure
  mkdir -p "${TARGET_DIRNAME}"
  echo "" > "${TARGET_PATH}"
  # Add frontmatter variables
  NOTE_TITLE=$(basename "${NOTE_FILE}" .md)
  echo "---" >> "${TARGET_PATH}"
  echo "title: ${NOTE_TITLE}" >> "${TARGET_PATH}"
  echo "---" >> "${TARGET_PATH}"
  # Copy base files
  cat "${NOTE_FILE}" >> "${TARGET_PATH}"
done < <(printf '%s\n' "${NOTE_FILES}")
