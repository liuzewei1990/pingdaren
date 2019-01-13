
import { setStorage, getStorage } from '@src/utils/storage.js'

// 储存标识
const AGENTNO = "AGENTNO";

// 默认渠道值
const DEFAULT = "10001";

export default {
    get() {
        return getStorage(AGENTNO) || DEFAULT;
    },
    set(agentno) {
        setStorage(AGENTNO, agentno);
    }
}