export REACT_APP_SLICE=charity
npm run build
mv build charity

scp -r charity ubuntu@3.142.94.95:/home/ubuntu/rspl

rm -rf charity
