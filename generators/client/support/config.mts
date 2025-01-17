import { clientFrameworkTypes } from '../../../jdl/index.js';
import { getFrontendAppName } from '../../base/support/basename.mjs';
import { CLIENT_MAIN_SRC_DIR, CLIENT_TEST_SRC_DIR } from '../../generator-constants.mjs';

const { ANGULAR, REACT, VUE, NO: CLIENT_FRAMEWORK_NO } = clientFrameworkTypes;

/**
 * Load client configs into application.
 */
export const loadClientConfig = ({ config, application }: { config: any; application: any }) => {
  (application as any).clientPackageManager = config.clientPackageManager;
  application.clientFramework = config.clientFramework;
  (application as any).clientTheme = config.clientTheme;
  (application as any).clientThemeVariant = config.clientThemeVariant;
  (application as any).devServerPort = config.devServerPort;

  (application as any).clientSrcDir = config.clientSrcDir ?? CLIENT_MAIN_SRC_DIR;
  (application as any).clientTestDir = config.clientTestDir ?? CLIENT_TEST_SRC_DIR;
};

/**
 * Load client derived properties.
 */
export const loadDerivedClientConfig = ({ application }: { application: any }) => {
  application.clientFrameworkAngular = application.clientFramework === ANGULAR;
  application.clientFrameworkReact = application.clientFramework === REACT;
  application.clientFrameworkVue = application.clientFramework === VUE;
  application.clientFrameworkNo = !application.clientFramework || application.clientFramework === CLIENT_FRAMEWORK_NO;
  application.clientFrameworkAny = !application.clientFrameworkNo;
  if ((application as any).microfrontend === undefined) {
    if ((application as any).applicationTypeMicroservice) {
      (application as any).microfrontend = application.clientFrameworkAny;
    } else if ((application as any).applicationTypeGateway) {
      (application as any).microfrontend = (application as any).microfrontends && (application as any).microfrontends.length > 0;
    }
  }
  (application as any).clientThemeNone = (application as any).clientTheme === 'none';
  (application as any).clientThemePrimary = (application as any).clientThemeVariant === 'primary';
  (application as any).clientThemeLight = (application as any).clientThemeVariant === 'light';
  (application as any).clientThemeDark = (application as any).clientThemeVariant === 'dark';

  if ((application as any).baseName) {
    (application as any).frontendAppName = getFrontendAppName({ baseName: (application as any).baseName });
  }
};
