const replace = require("replace-in-file");

exports.onPostBuild = (_, pluginOptions) => {
  const defaultOptions = {
    files: ["public/**/amp/*.html"]
  };
  const { files } = { ...defaultOptions, ...pluginOptions };
  const options = {
    files: files,
    from: /!important/g,
    to: ""
  };
  try {
    const changes = replace.sync(options);
    console.log("Modified files:", changes.join(", "));
  } catch (error) {
    console.error("Error occurred:", error);
  }
};
