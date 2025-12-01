const { FusesPlugin } = require('@electron-forge/plugin-fuses');
const { FuseV1Options, FuseVersion } = require('@electron/fuses');
const fs = require('fs');
const { exec } = require('child_process');
const path = require('path');

module.exports = {
  packagerConfig: {
    asar: true,
	icon: './assets/logo256.ico'
  },
  rebuildConfig: {"blockMap": true,
		  "blockMapSize": 80 * 1024 * 1024,
		  "setup_icon": "./assets/installation.ico",
		  "loadingGif": "./assets/installation.gif",
		  "ignore": [
			"\\.git",
			"\\.vs",
			"\\*.py",
			/(?!package\.json|node_modules|dist-electron)/,
	  ]},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
		  "blockMap": true,
		  "blockMapSize": 80 * 1024 * 1024,
		  "setup_icon": "./assets/installation.ico",
		  "loadingGif": "./assets/installation.gif",
		  "ignore": [
			"\\.git",
			"\\.vs",
			"\\*.py",
			/(?!package\.json|node_modules|dist-electron)/,
	  ]
	  },
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
    {
      name: '@electron-forge/maker-deb',
      config: {"blockMap": true,
		  "blockMapSize": 80 * 1024 * 1024,
		  "setup_icon": "./assets/installation.ico",
		  "loadingGif": "./assets/installation.gif",
		  "ignore": [
			"\\.git",
			"\\.vs",
			"\\*.py",
			/(?!package\.json|node_modules|dist-electron)/,
	  ]},
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {"blockMap": true,
		  "blockMapSize": 80 * 1024 * 1024,
		  "setup_icon": "./assets/installation.ico",
		  "loadingGif": "./assets/installation.gif",
		  "ignore": [
			"\\.git",
			"\\.vs",
			"\\*.py",
			/(?!package\.json|node_modules|dist-electron)/,
	  ]},
    },
  ],
  plugins: [
    {
      name: '@electron-forge/plugin-auto-unpack-natives',
      config: {},
    },
    // Fuses are used to enable/disable various Electron functionality
    // at package time, before code signing the application
    new FusesPlugin({
      version: FuseVersion.V1,
      [FuseV1Options.RunAsNode]: false,
      [FuseV1Options.EnableCookieEncryption]: true,
      [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
      [FuseV1Options.EnableNodeCliInspectArguments]: false,
      [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
      [FuseV1Options.OnlyLoadAppFromAsar]: true,
    }),
	],
	hooks: {
		postMake: async () => {
			fs.readFile('./package.json', 'utf8', (err, data) => {
		const assetsPath = './out/make/squirrel.windows/x64';
		let files = fs.readdirSync(assetsPath);
		console.log(files.map(d => path.join(assetsPath, d)).join(' '));
		console.log(files);
		if (err) {
			console.log('error', err)
			console.error('error', err);
			return
		};
		let jsonData = JSON.parse(data);
		let currentVersion = jsonData.version;
		console.log('Текущая версия приложения: ', currentVersion);
		console.log('Отправляю релиз на гит');
		
		exec(`gh release edit v${currentVersion} --title "Version v${currentVersion}" --notes "Release of v${currentVersion}" "${files.map(d => path.join(assetsPath, d.replace(' ', '\ '))).join('" "')}"`,
			(error, stdout, stderr) => {
				if (error) {
					console.error('EXEC ', error);
					return;
				}
				console.log('STDOUT', stdout);
				console.log('STDERR', stderr);
			})
			})
		}
	}
};
