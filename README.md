
# Typed AdWords Scripts!

This module exposes TypeScript type definitions to the AdWords script APIs. Statically typed scripts
allow you to catch typos at compile time, and help your editor to understand the AdWords API.



## Installation

To install this project I recommend you use [typings](https://github.com/typings/typings) which is
installed through [NodeJS](https://nodejs.org/en/). In your project folder run :

`typings install --save --global github:OutshineLabs/typed-adwords`

This will install the AdWords TypeScript package into a directory called `typings`. At the top of
the `typings` directory is a `index.d.ts` file. This should be included in your projects
`tsconfig.json`.

## Dependencies

This module requires the global Google Apps Script dependencies which can be installed via

```
typings install --save --global \
  registry:dt/google-apps-script/google-apps-script.base#0.0.0+20160316171810 \
  registry:dt/google-apps-script/google-apps-script.charts#0.0.0+20160316171810 \
  registry:dt/google-apps-script/google-apps-script.drive#0.0.0+20160316171810 \
  registry:dt/google-apps-script/google-apps-script.spreadsheet#0.0.0+20160316171810 \
  registry:dt/google-apps-script/google-apps-script.types#0.0.0+20160316171810 \
  registry:dt/google-apps-script/google-apps-script.ui#0.0.0+20160316171810 \
  registry:dt/google-apps-script/google-apps-script.utilities#0.0.0+20160316171810
```

## Authors

- Dawson Reid <@ddaws on Github>
