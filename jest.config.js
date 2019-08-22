module.exports = {
  preset: "react-native",
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
  transform: {
    "^.+\\.js(x)$": "babel-jest"
  },
  setupFiles: [require.resolve("./src/test/setupFiles")],
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(j|t)s(x)?$"
};
