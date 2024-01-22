const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': '#3A9778', '@heading-color': '#666' },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};