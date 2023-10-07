if [ ! -d "extensions" ]; then
    mkdir extensions
fi
cd extensions

if [ ! -d "oops-plugin-excel-to-json" ]; then
    git clone -b oops-moba https://gitee.com/dgflash/oops-plugin-excel-to-json.git
else
    cd oops-plugin-excel-to-json
    git pull
fi
