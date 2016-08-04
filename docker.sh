PACKAGE_VERSION=$(grep -m1 version package.json | awk -F: '{ print $2 }' | sed 's/[", ]//g')

npm run build && docker build -t hub.wulf.us/materialcalculator:$PACKAGE_VERSION . && docker push hub.wulf.us/materialcalculator:$PACKAGE_VERSION
