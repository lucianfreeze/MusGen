#!/bin/bash
MIDI_PATH=/var/www/html/midi # /improv_rnn/generated
PDF_PATH=/var/www/html/pdf

export QT_QPA_PLATFORM=offscreen

# find ${FILE_PATH} -maxdepth 1 -type f -exec rm -v {} \; >> /dev/null

BUNDLE_PATH='/magenta/chord_pitches_improv.mag'
CONFIG='chord_pitches_improv'

improv_rnn_generate \
--config=${CONFIG} \
--bundle_file=${BUNDLE_PATH} \
--output_dir=${MIDI_PATH} \
--num_outputs=1 \
--primer_melody="" \
--backing_chords="$1" \
--render_chords \
>> /dev/null

NEWFILE="$(ls -t ${MIDI_PATH} | head -1)"

mscore -f "/var/www/html/midi/${NEWFILE}" -o "/var/www/html/pdf/${NEWFILE%mid}pdf"

echo ${NEWFILE}

chmod -R 755 "${MIDI_PATH}"
chmod -R 755 "${PDF_PATH}"