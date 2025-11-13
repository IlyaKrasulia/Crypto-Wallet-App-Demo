import { exportMultiWallet } from './export';
import { importMultiWallet } from './import';
import { list } from './list';
import { update } from './update';

const multiWallet = Object.freeze({
  exportMultiWallet,
  importMultiWallet,
  list,
  update,
});

export default multiWallet;
