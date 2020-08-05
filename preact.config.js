export default {
  webpack(config, env, helpers, options) {
    // const { GITHUB_PAGES } = process.env;
    const GITHUB_PAGES = process.env.NODE_ENV === 'development' ? '' : 'Credit-Calculation';
    const publicPath = GITHUB_PAGES
      ? `/${GITHUB_PAGES}/`
      : '/';
    const ghEnv = GITHUB_PAGES
      && JSON.stringify(`${GITHUB_PAGES}`);

    config.output.publicPath = publicPath;
    const { plugin } = helpers.getPluginsByName(config, 'DefinePlugin')[0];
    Object.assign(
      plugin.definitions,
      { ['process.env.GITHUB_PAGES']: ghEnv }
    );

  },
};