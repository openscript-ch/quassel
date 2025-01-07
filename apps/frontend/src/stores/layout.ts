import { map } from "nanostores";

type Layout = {
  admin?: boolean;
  fullscreen?: boolean;
};

export const $layout = map<Layout>({});
