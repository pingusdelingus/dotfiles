/usr/bin/env zsh

sketchybar --set $NAME label="$(date '+%d' | sed s/^0//)"
