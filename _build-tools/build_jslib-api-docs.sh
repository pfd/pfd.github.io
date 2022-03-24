#!/usr/bin/env bash -x

ARCHIVE_URL=$1
TEMP_DIR=$2
TARGET_DIR=jslib-api-docs

if [ -z $ARCHIVE_URL ]; then
    (>&2 echo "Error: no archive URL to fetch")
    exit 1
fi

if [ -z $TEMP_DIR ]; then
    TEMP_DIR=_temp
elif [ ! -d $TEMP_DIR ]; then
    (>&2 echo "Error: temp dir does not exist")
    exit 1
fi

# Cleanup just in case whoever came before didn't do so
rm -rf $TEMP_DIR
mkdir $TEMP_DIR

# Fetch the archive to temp dir
curl -s "$ARCHIVE_URL" > $TEMP_DIR/jslib.zip

# Check if it is valid zip file
if ! unzip -t $TEMP_DIR/jslib.zip; then
    (>&2 echo "Error: invalid zip file")
    rm -rf $TEMP_DIR
    exit 1
fi

# Unarchive it to temp dir
unzip $TEMP_DIR/jslib.zip -d $TEMP_DIR/js-lib

# Clean out the target directory
rm -rf $TARGET_DIR
mkdir $TARGET_DIR

# Transform each file
for source_file in $( find $TEMP_DIR/js-lib -type f ); do
    target_file=$( echo $source_file | sed s!$TEMP_DIR/js-lib!$TARGET_DIR! )
    mkdir -p $(dirname $target_file)
    if [[ $source_file == *.html ]]; then
        cat $source_file | sed -e's!</style>!.tsd-sources {display: none;}</style>!g' > $target_file
    else
        cp $source_file $target_file
    fi
done

# Cleanup
rm -rf $TEMP_DIR
