import { createBrowserHistory } from "history";

const history = createBrowserHistory({
  forceRefresh: true
});

export const historyPush = (route: string): any => {
  history.push(route);
};

export default history;
