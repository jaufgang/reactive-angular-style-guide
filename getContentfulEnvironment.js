const contentfulManagement = require("contentful-management");

module.exports = function () {
  const contentfulClient = contentfulManagement.createClient({
    accessToken: "CFPAT-nKfMjaPNyWm0-WM4uHdZgUL0o0mr7LKhM1_AKJi0aQ4",
  });

  return contentfulClient
    .getSpace('5annanashnky')
    .then((space) =>
      space.getEnvironment('master')
    );
};
