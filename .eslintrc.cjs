module.exports = {
	"env": {
		"browser": true,
		"es2021": true
	},
	"ignorePatterns": ['!src/**/*.ts'],
	"extends": [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended"
	],
	"overrides": [
		{
			files: ['src/**/*.ts'],
		}
	],
	"parser": "@typescript-eslint/parser",
	"parserOptions": {
		"ecmaVersion": "latest",
		"sourceType": "module"
	},
	"plugins": [
		"@typescript-eslint"
	],
	"rules": {
		"semi": [
			"error",
			"always"
		]
	}
};
