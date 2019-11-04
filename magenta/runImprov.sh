#!/bin/bash
FILE_PATH=/var/www/html/tmp # /improv_rnn/generated

# find ${FILE_PATH} -maxdepth 1 -type f -exec rm -v {} \; >> /dev/null

BUNDLE_PATH='/magenta/chord_pitches_improv.mag'
CONFIG='chord_pitches_improv'

improv_rnn_generate \
--config=${CONFIG} \
--bundle_file=${BUNDLE_PATH} \
--output_dir=${FILE_PATH} \
--num_outputs=1 \
--primer_melody="[60, -2]" \
--backing_chords="$1" \
--render_chords

NEWFILE="$(ls -t ${FILE_PATH} | head -1)"
echo "${NEWFILE}"

chmod -R 755 "${FILE_PATH}"