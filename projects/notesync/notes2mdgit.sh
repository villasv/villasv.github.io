#!/usr/bin/env bash
set -e

# Path to notes exported by container Shortcut
DEFAULT_ICLOUD_SHORTCUTS_DIR="$HOME/Library/Mobile Documents/iCloud~is~workflow~my~workflows/Documents"
NOTES_DIR="$DEFAULT_ICLOUD_SHORTCUTS_DIR/notes"

# Load Homebrew to add utilities to PATH
export PATH="/opt/homebrew/opt/libpq/bin:$PATH"
eval "$(/opt/homebrew/bin/brew shellenv)"

# Load NVM to add utilities to PATH
export NVM_DIR="$HOME/.nvm"
source "$NVM_DIR/nvm.sh"
source "$NVM_DIR/bash_completion"

for file in "$NOTES_DIR"/*; do
  # fix exported file format
  html_file="${file/txt/html}"
  mv "$file" "$html_file"
  # reconstruct semantics
  sed -i "" -E 's|<p class="p3"><br></p>||g' "$html_file"
  sed -i "" -E 's|<p class="p1"><b>(.*)</b></p>|<h1>\1</h1>|g' "$html_file"
  sed -i "" -E 's|<p class="p4"><b>(.*)</b></p>|<h2>\1</h2>|g' "$html_file"
  sed -i "" -E 's|<p class="p2"><b>(.*)</b></p>|<h3>\1</h3>|g' "$html_file"
  # convert to markdown
  md_file="${file/txt/md}"
  pandoc --from=html --to=markdown <"$html_file" >"$md_file"
done
