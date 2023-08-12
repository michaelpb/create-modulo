#!/bin/bash

. "`dirname \"$0\"`/functions.sh"

cd $MY_PATH
cd ..

MODULO_VERSION="0.0.53"
CREATE_MODULO_VERSION="0.0.27"

HOST_PREFIX="https://unpkg.com"
MODULO_URL="$HOST_PREFIX/mdu.js@$MODULO_VERSION/src/Modulo.js"
CREATE_URL="$HOST_PREFIX/create-modulo@$CREATE_MODULO_VERSION/lib"

echo "--  "
echo "--  --------------------------------------------------- --"
echo "--- Cleaning old build"
touch build/tmp # ensure write privs
step CLEAN 'rm -r build/*'
step CLEAN 'rm -r lib/*'
step CLEAN 'rmdir lib'

echo "--  "
echo "--  --------------------------------------------------- --"
echo "--- Refreshing main / kitchen-sink template, building lib"
step REFRESH "curl $MODULO_URL > project-template/src/static/js/Modulo.js"
step LIB 'cp -r project-template/src/static/ lib/'
step LIB 'rm -r lib/js lib/css'

echo "--  "
echo "--- Building variants"
step JAMSTACKCMS 'cp -r project-template/ build/jamstack-cms'
step JAMSTACKCMS 'zip -qr build/modulo-jamstack-cms.zip build/jamstack-cms'


echo "--  "
echo "--  --------------------------------------------------- --"
echo "--- Building Jamstack MD"
D="build/jamstack-md"
L="JamStack_Markdown"
step $L "cp -r project-template/ $D"
step $L "rm -r $D/src/static/cms/admin/"
step $L "rm -r $D/src/static/cms/uploads/"
step $L "zip -qr build/modulo-jamstack-md.zip $D"


echo "--  --------------------------------------------------- --"
echo "--- Building QUICK Jamstack"
D="build/quick-jamstack-md"
L="QUICK_JAMSTACKCMS"
step $L "cp -r build/jamstack-md/src/ $D"
step $L "rm  $D/static/js/Modulo.js $D/static/index.html $D/static/cms/index.html"
step $L "rm -r $D/static/components/  $D/static/data/"

echo "--- Building Replacements for Quick style"
stre $L $D "s|src=\"/static/js/Modulo.js\"|src=\"$MODULO_URL\"|"
stre $L $D "s|-src=\"/static/cms/\"|-src=\"$CREATE_URL/cms/index.html\"|"
stre $L $D "s|-src=\"/static/\"|-src=\"$CREATE_URL/index.html\"|"

echo "--- Zipping / finalizing for Quick style"
step $L "zip -qr build/modulo-jamstack-cms-quick-start.zip $D"


