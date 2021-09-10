import { SettingStore, DataStore } from '../../stores';
// -- https://github.com/fingerprintjs/fingerprintjs
import  FingerprintJS  from '@fingerprintjs/fingerprintjs'

class FingerPrinter {
    constructor(prop) {
        this.visitorId = null;
    }
    load = async () => {
        // Get the visitor identifier when you need it.
        const fpPromise = FingerprintJS.load();
        const fp = await fpPromise
        const result = await fp.get()
        
        // This is the visitor identifier:
        this.visitorId = result.visitorId
        return this.visitorId;
        console.log('a->', this.visitorId)
    }
}

export default FingerPrinter;