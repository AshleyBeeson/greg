@echo off
if not exist "C:\data\db\" mkdir C:\data\db\

pushd .
cd C:\Program Files\MongoDB\Server\3.4\bin\

start mongod
start mongo
popd
break;

