# 1.4 Run Application

In this lab section we are going to build and run the React-Native application with ios.

## Build ios
Access to `./ios` directory.
```bash
npm run build:ios
```

## Pod install
Access to `./ios` directory.
```bash
pod install
```

## Start the Apollo Server
Access to `/1_3_queries_and_mutations/final/src`.
```bash
npm start
```
OR
Access to `/1_3_queries_and_mutations/final`.
```bash
docker build -t hkjc-demo-grapqh-server .
```
```bash
docker run --rm -p 4001:4001 -e PORT=4001 hkjc-demo-grapqh-server
```

## Run the application in ios
Access to the frontend root directory - `/frontend-demo/demo/`.
```bash
npx react-native run-ios --port 8082
```

XCode Simulator will be opened and install the application.

You have completed this section

[< prev](./1_2_create_queries_mutations.md) | [home](../readme.md)