import { QueryMock } from "graphql-query-test-mock";
import { GRAPHQL_URL } from "../relay/fetchQuery";

const queryMock = new QueryMock();
queryMock.setup(GRAPHQL_URL);

export { queryMock };
