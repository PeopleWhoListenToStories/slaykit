// import { Toast } from '@douyinfe/semi-ui';

import _copy from './copy-to-clipboard'

export function copy(text: string | { text: string; format: string }[], callback: () => void) {
  return _copy(text, callback)
}
