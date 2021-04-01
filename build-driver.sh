export REACT_APP_SLICE=driver
npm run build
mv build driver

scp -r driver ubuntu@3.142.94.95:/home/ubuntu/rspl

rm -rf driver
