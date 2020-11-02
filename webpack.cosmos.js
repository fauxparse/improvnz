module.exports = (webpackConfig, env) => {
  webpackConfig.module.rules = [
    ...webpackConfig.module.rules,
    {
      test: /\.module\.s(a|c)ss$/,
      loader: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            modules: true,
            sourceMap: true,
          },
        },
        {
          loader: 'sass-loader',
          options: {
            sourceMap: true,
          },
        },
      ],
    },
    {
      test: /\.s(a|c)ss$/,
      exclude: /\.module.(s(a|c)ss)$/,
      loader: [
        'style-loader',
        'css-loader',
        {
          loader: 'sass-loader',
          options: {
            sourceMap: true,
          },
        },
      ],
    },
  ];

  return {
    ...webpackConfig,
    entry: './app/javascript/packs/hello_react.tsx',
  };
};
