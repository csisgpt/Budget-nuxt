#!/bin/sh
if [ -z "$husky_skip_init" ]; then
  debug () {
    [ "$HUSKY_DEBUG" = "1" ] && echo "husky (debug) $1"
  }
  readonly husky_skip_init=1
  export husky_skip_init
  debug "Reading .husky/_/husky.sh"
  export PATH="$PATH:/usr/local/bin"
fi
