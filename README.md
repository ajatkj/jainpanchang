# jainpanchang-api
A simple API to return sunrise, sunset, navkarsi, other values as per the Jain Panchang

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
