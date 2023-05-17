#!/bin/bash

#download node and npm
sudo yum install -y gcc-c++ make 
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
. ~/.nvm/nvm.sh
nvm install node
sudo rm -R /var/cache/yum/x86_64/2/nodesource/
curl -sL https://rpm.nodesource.com/setup_16.x | sudo -E bash -
sudo yum install -y nodejs

#allow port to run
sudo yum install libcap2-bin 
sudo setcap cap_net_bind_service=+ep `readlink -f \`which node\``


#create our working directory if it doesnt exist
DIR="/home/ec2-user/agora-admin"
if [ -d "$DIR" ]; then
  echo "${DIR} exists"
else
  echo "Creating ${DIR} directory"
  mkdir ${DIR}
fi

#import env
cd /home/ec2-user/agora-admin
touch .env
echo INFURA_ENDPOINT_RINKEBY=$(aws ssm get-parameter --region us-east-2 --name "INFURA_ENDPOINT_RINKEBY" --query "Parameter.Value" --output text --with-decryption) >> /home/ec2-user/agora-admin/.env
echo INFURA_ENDPOINT_WS_RINKEBY=$(aws ssm get-parameter --region us-east-2 --name "INFURA_ENDPOINT_WS_RINKEBY" --query "Parameter.Value" --output text --with-decryption) >> /home/ec2-user/agora-admin/.env
echo ALCHEMY_ENDPOINT_MUMBAI=$(aws ssm get-parameter --region us-east-2 --name "ALCHEMY_ENDPOINT_MUMBAI" --query "Parameter.Value" --output text --with-decryption) >> /home/ec2-user/agora-admin/.env
echo ALCHEMY_ENDPOINT_RINKEBY=$(aws ssm get-parameter --region us-east-2 --name "ALCHEMY_ENDPOINT_RINKEBY" --query "Parameter.Value" --output text --with-decryption) >> /home/ec2-user/agora-admin/.env
echo ALCHEMY_ENDPOINT_POLYGON=$(aws ssm get-parameter --region us-east-2 --name "ALCHEMY_ENDPOINT_POLYGON" --query "Parameter.Value" --output text --with-decryption) >> /home/ec2-user/agora-admin/.env
echo INFURA_ENDPOINT_AURORA=$(aws ssm get-parameter --region us-east-2 --name "INFURA_ENDPOINT_AURORA" --query "Parameter.Value" --output text --with-decryption) >> /home/ec2-user/agora-admin/.env
echo ADMIN_WALLET=$(aws ssm get-parameter --region us-east-2 --name "ADMIN_WALLET" --query "Parameter.Value" --output text --with-decryption) >> /home/ec2-user/agora-admin/.env
echo ADMIN_PRIVATE_KEY=$(aws ssm get-parameter --region us-east-2 --name "ADMIN_PRIVATE_KEY" --query "Parameter.Value" --output text --with-decryption) >> /home/ec2-user/agora-admin/.env
echo ADMIN_WALLET_MAINNET=$(aws ssm get-parameter --region us-east-2 --name "ADMIN_WALLET_MAINNET" --query "Parameter.Value" --output text --with-decryption) >> /home/ec2-user/agora-admin/.env
echo ADMIN_PRIVATE_KEY_MAINNET=$(aws ssm get-parameter --region us-east-2 --name "ADMIN_PRIVATE_KEY_MAINNET" --query "Parameter.Value" --output text --with-decryption) >> /home/ec2-user/agora-admin/.env
echo DISCOURSE_CONTRACT_ADDRESS_MUMBAI=$(aws ssm get-parameter --region us-east-2 --name "DISCOURSE_CONTRACT_ADDRESS_MUMBAI" --query "Parameter.Value" --output text --with-decryption) >> /home/ec2-user/agora-admin/.env
echo DISCOURSE_CONTRACT_ADDRESS_POLYGON=$(aws ssm get-parameter --region us-east-2 --name "DISCOURSE_CONTRACT_ADDRESS_POLYGON" --query "Parameter.Value" --output text --with-decryption) >> /home/ec2-user/agora-admin/.env
echo DISCOURSE_CONTRACT_ADDRESS_AURORA=$(aws ssm get-parameter --region us-east-2 --name "DISCOURSE_CONTRACT_ADDRESS_AURORA" --query "Parameter.Value" --output text --with-decryption) >> /home/ec2-user/agora-admin/.env
echo DISCOURSE_CONTRACT_ADDRESS_RINKEBY=$(aws ssm get-parameter --region us-east-2 --name "DISCOURSE_CONTRACT_ADDRESS_RINKEBY" --query "Parameter.Value" --output text --with-decryption) >> /home/ec2-user/agora-admin/.env
echo DISCOURSE_CONTRACT_ADDRESS2=$(aws ssm get-parameter --region us-east-2 --name "DISCOURSE_CONTRACT_ADDRESS2" --query "Parameter.Value" --output text --with-decryption) >> /home/ec2-user/agora-admin/.env
echo DISCOURSE_CONTRACT_ADDRESS1=$(aws ssm get-parameter --region us-east-2 --name "DISCOURSE_CONTRACT_ADDRESS1" --query "Parameter.Value" --output text --with-decryption) >> /home/ec2-user/agora-admin/.env
echo API_ACCESS_KEY=$(aws ssm get-parameter --region us-east-2 --name "API_ACCESS_KEY" --query "Parameter.Value" --output text --with-decryption) >> /home/ec2-user/agora-admin/.env
echo CONSUMER_KEY=$(aws ssm get-parameter --region us-east-2 --name "CONSUMER_KEY" --query "Parameter.Value" --output text --with-decryption) >> /home/ec2-user/agora-admin/.env
echo CONSUMER_SECRET=$(aws ssm get-parameter --region us-east-2 --name "CONSUMER_SECRET" --query "Parameter.Value" --output text --with-decryption) >> /home/ec2-user/agora-admin/.env
echo ACCESS_TOKEN=$(aws ssm get-parameter --region us-east-2 --name "ACCESS_TOKEN" --query "Parameter.Value" --output text --with-decryption) >> /home/ec2-user/agora-admin/.env
echo ACCESS_TOKEN_SECRET=$(aws ssm get-parameter --region us-east-2 --name "ACCESS_TOKEN_SECRET" --query "Parameter.Value" --output text --with-decryption) >> /home/ec2-user/agora-admin/.env
echo MONGO_DB=$(aws ssm get-parameter --region us-east-2 --name "MONGO_DB" --query "Parameter.Value" --output text --with-decryption) >> /home/ec2-user/agora-admin/.env
echo SECRET_KEY=$(aws ssm get-parameter --region us-east-2 --name "SECRET_KEY" --query "Parameter.Value" --output text --with-decryption) >> /home/ec2-user/agora-admin/.env
echo CODE=$(aws ssm get-parameter --region us-east-2 --name "CODE" --query "Parameter.Value" --output text --with-decryption) >> /home/ec2-user/agora-admin/.env
echo NODE_ENV=$(aws ssm get-parameter --region us-east-2 --name "NODE_ENV" --query "Parameter.Value" --output text --with-decryption) >> /home/ec2-user/agora-admin/.env
echo GODWOKEN_ENDPOINT=$(aws ssm get-parameter --region us-east-2 --name "GODWOKEN_ENDPOINT" --query "Parameter.Value" --output text --with-decryption) >> /home/ec2-user/agora-admin/.env
echo ADMIN_WALLET_GODWOKEN=$(aws ssm get-parameter --region us-east-2 --name "ADMIN_WALLET_GODWOKEN" --query "Parameter.Value" --output text --with-decryption) >> /home/ec2-user/agora-admin/.env
echo ADMIN_PRIVATE_KEY_GODWOKEN=$(aws ssm get-parameter --region us-east-2 --name "ADMIN_PRIVATE_KEY_GODWOKEN" --query "Parameter.Value" --output text --with-decryption) >> /home/ec2-user/agora-admin/.env
echo DISCOURSE_CONTRACT_ADDRESS_GODWOKEN=$(aws ssm get-parameter --region us-east-2 --name "DISCOURSE_CONTRACT_ADDRESS_GODWOKEN" --query "Parameter.Value" --output text --with-decryption) >> /home/ec2-user/agora-admin/.env





