npm run build;
cp -r dist build
cp index.html build
cp styles.css build
rsync -av build/ rex@rex.timkaechele.me:www
