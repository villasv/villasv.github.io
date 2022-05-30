#!/usr/bin/env -S bash -e

find content ! -name 'content' -type d -exec rm -rf "{}" +
if [ ! -d "./obsidian" ]; then
  git clone --depth 1 git@github.com:villasv/obsidian-personal.git ./obsidian
fi

PLATFORM=$(uname)
OBSIDIAN_EXPORT=./bin/obsidian-export-$PLATFORM

NOTE_FILES=$(find "./obsidian" -type f | grep -E "(Notes|Files|Photos)/")
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
  # Override frontmatter metadata
  NOTE_TITLE=$(basename "${NOTE_FILE}" .md)
  PERMALINK=$(echo "${NOTE_FILE}" \
    | tr '[:upper:]' '[:lower:]' \
    | perl -pe 's/[^\w\n\/. ]//g;' -pe 's/\/ /\//g;' -pe 's/ /-/g;' \
    | perl -pe 's/notes\///;' -pe 's/\.\/obsidian\///;' -pe 's/\.md//g;')
  EXTRA_FRONTMATTER="title: ${NOTE_TITLE}\nurl: ${PERMALINK}"
  perl -i -lpe "print \"${EXTRA_FRONTMATTER}\" if $. == 2" "${PAGE_PATH}"
done < <(printf '%s\n' "${NOTE_FILES}")

# Remove emoji codes from section urls
SECTIONS=$(find content ! -name 'content' -type d -maxdepth 1)
while read SECTION
do
  TITLE=$(basename "${SECTION}")
  PERMALINK=$(basename "${SECTION}" \
    | tr '[:upper:]' '[:lower:]' \
    | perl -pe 's/[^\w\n\/. ]//g;' -pe 's/^\s+//g;' -pe 's/ /-/g;')
  echo "---" >> "${SECTION}/_index.md"
  echo "title: ${TITLE}" >> "${SECTION}/_index.md"
  echo "url: ${PERMALINK}" >> "${SECTION}/_index.md"
  echo "---" >> "${SECTION}/_index.md"
done < <(printf '%s\n' "${SECTIONS}")
