rm -fr build
rm faceless.build faceless.zip -fr
mkdir build
echo "" > dist/build.log
cp * build/ -R 2>>dist/build.log
mv build faceless.build
mkdir dist 2>/dev/null
zip dist/faceless.zip faceless.build/* faceless.build/src/* faceless.build/sites/all.js 2>&1 > dist/build.log
python scripts/make_userscript.py
rm -fr faceless.build/
