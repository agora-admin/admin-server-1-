#!/bin/bash
#Stopping existing node servers
echo "Stopping any existing admin servers"
sudo kill -9 $(sudo lsof -t -i:3001)
