const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  // ...
  typescript: {
    enableTypeChecking: true /* (default value) */,
  },
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      // 使用TerserPlugin进行代码压缩
      webpackConfig.optimization.minimizer = [
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_console: true, // 移除console.log语句
            },
          },
        }),
      ];

      // 使用CompressionPlugin进行gzip压缩
      webpackConfig.plugins.push(
        new CompressionPlugin({
          test: /\.(js|css)$/,
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          threshold: 10240, // 10KB以上的文件进行压缩
          minRatio: 0.8,
        })
      );

      // 使用BundleAnalyzerPlugin分析打包后的模块大小
      if (env === 'production') {
        webpackConfig.plugins.push(new BundleAnalyzerPlugin());
      }

      return webpackConfig;
    },
  },
};
