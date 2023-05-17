#!/bin/bash
#Stopping existing node servers
echo "Stopping any existing admin servers"
pkill -f "node agora-admin/index.js"