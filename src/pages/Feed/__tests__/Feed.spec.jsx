import * as React from "react";
import { waitForElement } from "react-native-testing-library";

import { queryMock } from "../../../test/testUtils";
import { GRAPHQL_URL } from "../../../relay/fetchQuery";

queryMock.setup(GRAPHQL_URL);

it("render Feed", () => {
  console.log("feed");
});
