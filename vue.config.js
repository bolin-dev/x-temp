module.exports = {
	chainWebpack: config => {
		config.optimization.minimizer("terser").tap(args => {
			const compress = args[0].terserOptions.compress;
			compress.warnings = false;
			compress.drop_console = true;
			compress.drop_debugger = true;
			compress.pure_funcs = ["__f__", "console.debug", "console.log"];
			return args;
		});
	},
};
