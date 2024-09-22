// detox.config.js
module.exports = {
  testRunner: 'jest',
  runnerConfig: 'e2e/config.json',
  configurations: {
    "android.emulator": {
      "binaryPath": "C:/apk/app-debug.apk", // Substitua pelo caminho do seu APK
      "build": "cd android && ./gradlew assembleDebug assembleAndroidTest -DtestBuildType=debug",
      "type": "android.emulator",
      "device": {
        "avdName": "NameOfYourEmulator" // Substitua pelo nome do seu emulador
      }
    },
    "ios.sim.debug": {
      "binaryPath": "C:/apk/app-debug.apk", // Substitua pelo caminho do seu app
      "build": "xcodebuild -project ios/YourProject.xcodeproj -scheme YourScheme -configuration Debug -derivedDataPath ios/build",
      "type": "ios.simulator",
      "device": {
        "type": "iPhone 11" // Altere para o dispositivo desejado
      }
    }
  }
};
