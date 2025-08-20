import * as geoip from 'geoip-lite';
import { LoginInfo } from '../types/types';
const DeviceDetector = require('node-device-detector');


const detector = new DeviceDetector({
  clientIndexes: true,
  deviceIndexes: true,
  osIndexes: true,
  deviceAliasCode: false,
  deviceTrusted: false,
  deviceInfo: false,
  maxUserAgentSize: 500,
});


export function getLoginInfo(ip: string, userAgent: string): LoginInfo {
  // Geolocation lookup
  const geo = geoip.lookup(ip);

  // Device detection
  const deviceDetails = detector.detect(userAgent);

  return <LoginInfo>{
    ip,
    userAgent,
    deviceDetails,
    geoLocation: geo,
  };
}
