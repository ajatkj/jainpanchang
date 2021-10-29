# jainpanchang-api
A simple API to return sunrise, sunset, navkarsi, other values as per the Jain Panchang

## Environment
1. set environment variable `PORT` 
1. set environment variable `CONNECTION_STRING` for mongodb connection string

## Provides

1. addRec service as POST request
```
http://host:5006/api/jainpanchang/addRec
```
1. fetchRec service as GET request
```
http://host:5006/api/jainpanchang/fetchRec?location=mumbai&date=today
```

## Examples
```
http://host:5006/api/jainpanchang/fetchRec?location=mumbai&date=today
http://host:5006/api/jainpanchang/fetchRec?location=mumbai&date=tomorrow
http://host:5006/api/jainpanchang/fetchRec?location=mumbai&date=dayafter
http://host:5006/api/jainpanchang/fetchRec?location=mumbai&date=20210128
```

## Note
Currently only available for Mumbai location
