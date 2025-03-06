/* Based on https://kilianvalkhof.com/2019/electron/notarizing-your-electron-application/ */

const { notarize } = require('electron-notarize');

exports.default = async function notarizing(context) {
  const { electronPlatform, appOutDir } = context;
  if (
    electronPlatform !== 'darwin' ||
    process.env.CSC_IDENTITY_AUTO_DISCOVERY === 'true'
  ) {
    return;
  }

  const app = context.packager.appInfo.productFile;

  return await notarize({
    appBundleId: 'org.jupyter.jupyterlab-desktop',
    appPath: `${appOutDir}/${app}.app`,
    appleId: process.env.APPLEID,
    appleIdPassword: process.env.APPLEIDPASS,
    tool: 'notarytool',
    teamId: process.env.APPLE_TEAM_ID
  });
};
