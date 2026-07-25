#!/usr/bin/env bash
# deploy.sh — mirror the local site to the under-a-rock.org document root over SFTP.
#
# Spaceship has interactive shell disabled, so we use lftp (SFTP) instead of rsync.
# It uploads only changed files and deletes files on the server that no longer
# exist locally, keeping the docroot an exact mirror of this folder.
#
# usage: ./deploy.sh          real deploy
#        ./deploy.sh --dry    preview changes, upload/delete nothing
set -euo pipefail

# --- config -----------------------------------------------------------------
SSH_ALIAS="underarock"                        # ~/.ssh/config alias (host/port/user/key)
KEY="$HOME/.ssh/underarock_deploy"            # private key
REMOTE_DIR="/home/kqpagvjiqs/under-a-rock.org"
LOCAL_DIR="$(cd "$(dirname "$0")" && pwd)"
# ----------------------------------------------------------------------------

MIRROR_OPTS="--reverse --delete --verbose --no-perms"
[[ "${1:-}" == "--dry" ]] && MIRROR_OPTS="$MIRROR_OPTS --dry-run" && echo ">> DRY RUN — nothing will be uploaded or deleted"

lftp -c "
set sftp:connect-program 'ssh -a -x -i $KEY';
set net:max-retries 2;
set net:timeout 15;
open sftp://$SSH_ALIAS;
mirror $MIRROR_OPTS \
  --exclude-glob .git/ \
  --exclude-glob .claude/ \
  --exclude .DS_Store \
  --exclude-glob CLAUDE.md \
  --exclude-glob README.md \
  --exclude-glob Dockerfile \
  --exclude-glob .dockerignore \
  --exclude-glob .gitignore \
  --exclude-glob .nojekyll \
  --exclude-glob deploy.sh \
  --exclude-glob ship.sh \
  --exclude-glob preview.sh \
  --exclude-glob '*.aux.xml' \
  --exclude-glob 'f557c2abd*' \
  --exclude-glob underarock-site.zip \
  '$LOCAL_DIR' '$REMOTE_DIR';
bye
"

echo ">> done. https://under-a-rock.org"
