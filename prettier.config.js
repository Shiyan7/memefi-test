import vercelConfig from '@vercel/style-guide/prettier';
import organizeAttrs from '@xeonlink/prettier-plugin-organize-attributes';

export default {
  ...vercelConfig,
  plugins: [organizeAttrs],
};
