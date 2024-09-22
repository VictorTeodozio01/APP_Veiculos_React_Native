module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./app'], // Defina a raiz do seu projeto
          extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'], // Adicione outras extensões que você está usando
        },
      ],
    ],
  };
};