# IhsanReactNative

React Native Bootstrap

## Environment

- Node 14.16.0, Npm 6.4.1 [source](https://medium.com/@katopz/how-to-install-specific-nodejs-version-c6e1cec8aa11)
  - Used to match AWS Elastic Beanstalk max version as of 4/19/2020
  - (Recommended) Using Node Version Manager
    - Install [NVM](https://github.com/nvm-sh/nvm) with `brew install nvm`. Follow the post-install directions to update your `~/.bash_profile`.
    - Install Node Version 14.16.0 with `nvm install 14.16.0`
    - Installing [avn](https://www.npmjs.com/package/avn)
      - Now when you open a new terminal window, it will respect the .nvmrc
    - If avn isn't working, run `nvm use` and then follow instructions.
  - Specific Node version in your system
    - `brew install node@14`
    - `brew link node@14`
    - Follow brew instruction, like having to `--force` and `--overwrite`
- watchman 4.9.0
  - `brew install watchman`
- Cocoapods 1.10.1
  - `sudo gem install cocoapods`
- xcode-select version 2373
  - `xcode-select --install`
- JDK 8
  - `brew install --cask adoptopenjdk/openjdk/adoptopenjdk8`
- Setup local env variables.
  - Follow step [3. Configure the ANDROID_HOME environment variable](https://reactnative.dev/docs/environment-setup)
- Setup Environment
  - Run `yarn android-fingerprint`. Take the output `SHA1` string and give it to admins to add to Firebase
  - Run `AWS_ACCESS_KEY_ID=<INSERT VALUE> AWS_SECRET_ACCESS_KEY=<INSERT VALUE> WS_CERT_BUCKET=<INSERT VALUE> yarn setup`. Get the key values from admin and replace the `<INSERT VALUE>`s

### References

- https://reactnative.dev/docs/environment-setup

## Local Development for iOS

1. Make sure environment dependencies like Node, Cocoapods, xcode-select, and watchman are installed
1. In terminal, run `yarn setup`
1. Run `yarn install`
1. Run `yarn ios`

### Debugging app not building/running

- If running iOS, manually delete the dev apps from the simulator
- Run `yarn clean`
- Run `yarn setup`

## Redux Developer Tools

- [Install redux developer tools using `brew`](https://dev.to/piscespieces/how-to-debug-redux-in-a-react-native-app-4b19)
- `brew install --cask react-native-debugger`
- `yarn debug`
- on iOS Simulator: `cmd+d` then choose 'Debug'
- on Android Emulator: `cmd+m` then choose 'Debug'

## Updating libraries
 - Use `yarn updgrade --latest` to update all the libraries to latest
 - Possibly need to upgrade Android `minSdkVersion`: Bump the number.
 - Possibly need to update iOS Minimum Deployment Target: In Podfile the `platform` method
 - Possibly need to run `cd ios && pod outdated` and then update Podfile with versions accordingly
 - Upgrade the [Flipper](https://fbflipper.com/docs/getting-started/react-native/#using-the-latest-flipper-sdk) version. For ios update in Podfile
## Git Commit Flow

You can...

- Commit the "normal" way: `git add . && git commit -m "added a new feature"`
- Or you can commit with more meaningful commit messages: `git add . && git cz`
  - this will take you through an interactive process of writing commit messages.
  - Only the type of change and the short description are mandatory fields.
