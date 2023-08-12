#!/bin/bash

. "`dirname \"$0\"`/functions.sh"

cd $MY_PATH
cd ..

echo "--  --------------------------------------------------- --"
echo "--- Rebuilding"

step JAMSTACKCMS 'cp -vr project-template/ built-project-templates/jamstack-cms'

