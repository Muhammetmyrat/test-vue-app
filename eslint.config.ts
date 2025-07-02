import vue from 'eslint-plugin-vue'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import vueParser from 'vue-eslint-parser'
import prettier from 'eslint-plugin-prettier'
import globals from 'globals'
import importPlugin from 'eslint-plugin-import'

const { browser, node } = globals

export default [
	{
		ignores: ['vite.config.ts', 'dist', 'node_modules'],
		files: ['**/*.ts', '**/*.vue'],
		languageOptions: {
			parser: vueParser,
			parserOptions: {
				parser: tsParser,
				ecmaVersion: 'latest',
				sourceType: 'module',
				project: './tsconfig.eslint.json',
				extraFileExtensions: ['.vue'],
				tsconfigRootDir: process.cwd()
			},
			globals: {
				...browser,
				...node
			}
		},
		plugins: {
			vue,
			'@typescript-eslint': tsPlugin,
			prettier,
			import: importPlugin
		},
		settings: {
			'import/resolver': {
				typescript: {
					alwaysTryTypes: true,
					project: './tsconfig.eslint.json'
				}
			}
		},
		rules: {
			'prettier/prettier': [
				'error',
				{
					indent: 'tab',
					useTabs: true,
					tabWidth: 1,
					semi: false,
					singleQuote: true,
					trailingComma: 'none',
					arrowParens: 'avoid',
					printWidth: 100,
					vueIndentScriptAndStyle: false,
					htmlWhitespaceSensitivity: 'ignore',
					endOfLine: 'auto',
					vueStrictStyle: true,
					vueSingleFileComponentIndentation: true
				}
			],
			'import/no-unresolved': 'off',
			'@typescript-eslint/no-explicit-any': 'off',
			'@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
			'@typescript-eslint/explicit-function-return-type': 'off',
			'@typescript-eslint/explicit-module-boundary-types': 'off',
			'@typescript-eslint/naming-convention': [
				'error',
				{
					selector: 'function',
					filter: '^use[A-Z]',
					format: ['camelCase']
				}
			],

			'func-style': ['error', 'declaration'],
			'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',

			'vue/html-indent': ['error', 'tab'],
			'vue/script-indent': 'off',
			'vue/multi-word-component-names': 'off',
			'vue/no-v-html': 'off',
			'vue/html-self-closing': [
				'error',
				{
					html: {
						void: 'always',
						normal: 'never',
						component: 'always'
					},
					svg: 'always',
					math: 'always'
				}
			],
			'vue/block-order': ['error', { order: ['script', 'template', 'style'] }],
			'vue/component-api-style': ['error', ['script-setup']],
			'vue/component-name-in-template-casing': ['error', 'PascalCase'],
			'vue/block-tag-newline': ['error', { singleline: 'always', multiline: 'always' }],
			'vue/padding-line-between-blocks': ['error', 'always'],
			'vue/prefer-true-attribute-shorthand': ['error', 'always'],
			'vue/attributes-order': 'error',
			'vue/order-in-components': 'error',
			'vue/attribute-hyphenation': ['error', 'always'],
			'vue/v-on-style': ['error', 'shorthand'],
			'vue/v-bind-style': ['error', 'shorthand'],
			'vue/require-style-attribute': 'off',
			'vue/no-multiple-template-root': 'off'
		}
	}
]
