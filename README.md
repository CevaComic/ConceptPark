# ConceptPark

School project

- This app is based on OpenALPR

## Requirements

- iOS 9+
- RN 0.60+

### iOS Setup

- Clone this repo
- Enter project folder
- Run:
```sh
yarn
cd ios && pod install && cd ..
react-native run-ios
```
- If this does not work , try compileing the app from Xcode by opening ios/Park.xcworkspace
- in Xcode go to Product -> Scheme -> Edit Scheme... and on Build Configuration choose Debug
- I thing i forgot to change it to Debug before upload



### TODO:

- Add takePicture method (so every car has its own picture in the park) and can correct the license plates (if wrong)
- Code cleanup

## Credits

- [Moga Amadeus](https://github.com/hecate2k/) - Mockup designer
- Special thanks to [Robert Sasak](https://github.com/RobertSasak/) for [react-native-openalpr](https://github.com/RobertSasak/react-native-openalpr)
- And all other libraries used in this project , from package.json
