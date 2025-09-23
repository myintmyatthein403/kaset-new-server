import * as geoip from 'geoip-lite';

export type DeviceDetails = {
  os: OSInfo;
  client: ClientInfo;
  device: DeviceInfo;
};

export type OSInfo = {
  name: string;
  version: string;
  short_name: string;
  platform: string;
  family: string;
};

export type ClientInfo = {
  type: string;
  name: string;
  short_name: string;
  version: string;
  engine: string;
  engine_version: string;
  family: string;
};

export type DeviceInfo = {
  id: string;
  type: string;
  brand: string;
  model: string;
};

export type LoginInfo = {
  ip: string;
  userAgent: string;
  deviceDetails: DeviceDetails;
  geoLocation: geoip.Lookup | null;
};

export type Payload = {
  sub: string;
  email?: string;
  status: string;
  line_user_id?: string;
  role: Role;
};

export type Role = {
  id: string;
  name: string;
}
