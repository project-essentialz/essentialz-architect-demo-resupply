export REACT_APP_SLICE=driver
npm run build
mv build driver

export REACT_APP_SLICE=captain
npm run build
mv build captain

export REACT_APP_SLICE=donor
npm run build
mv build donor

export REACT_APP_SLICE=charity
npm run build
mv build charity

scp -r driver ubuntu@3.142.94.95:/home/ubuntu/rspl
scp -r captain ubuntu@3.142.94.95:/home/ubuntu/rspl
scp -r donor ubuntu@3.142.94.95:/home/ubuntu/rspl
scp -r charity ubuntu@3.142.94.95:/home/ubuntu/rspl

rm -rf driver
rm -rf captain
rm -rf donor
rm -rf charity
