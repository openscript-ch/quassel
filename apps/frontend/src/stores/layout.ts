import { map } from "nanostores";

type Layout = {
  admin?: boolean;
};

export const $layout = map<Layout>({});
