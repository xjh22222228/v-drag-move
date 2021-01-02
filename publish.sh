#/bin/bash

# sudo ./publish.sh

yarn build

sed -i.bak 's!/dist!/placeholder!' .gitignore

npm publish

sed -i.bak 's!/placeholder!/dist!' .gitignore

rm -rf .gitignore.*
