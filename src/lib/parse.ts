import mongoose from 'mongoose';

const getString = (value: any) => (value || '').toString();

const getDateIfValid = (value: any) => {
  const date = Date.parse(value);
  return Number.isNaN(date) ? null : new Date(date);
};

const getArrayIfValid = (value: any) => (Array.isArray(value) ? value : null);

const getObjectIDIfValid = (value: any) =>
  mongoose.Types.ObjectId.isValid(value)
    ? new mongoose.Types.ObjectId(value)
    : null;

const getArrayOfObjectID = (value: any) => {
  if (Array.isArray(value) && value.length > 0) {
    return value.map((id) => getObjectIDIfValid(id)).filter((id) => !!id);
  }
  return [];
};

const isNumber = (value: any) =>
  !Number.isNaN(Number(parseFloat(value))) && Number.isFinite(Number(value));

const getNumberIfValid = (value: any) =>
  isNumber(value) ? parseFloat(value) : null;

const getNumberIfPositive = (value: any) => {
  const n = getNumberIfValid(value);
  return n && n >= 0 ? n : null;
};

const getBooleanIfValid = (value: any, defaultValue: boolean | null = null) => {
  if (value === 'true' || value === 'false') return value === 'true';
  return typeof value === 'boolean' ? value : defaultValue;
};

const getBrowser = (browser: any) =>
  browser
    ? {
        ip: getString(browser.ip),
        user_agent: getString(browser.user_agent),
      }
    : {
        ip: '',
        user_agent: '',
      };

const getCustomerAddress = (address: any) => {
  const coordinates = {
    latitude: '',
    longitude: '',
  };

  if (address && address.coordinates) {
    coordinates.latitude = address.coordinates.latitude;
    coordinates.longitude = address.coordinates.longitude;
  }

  return address
    ? {
        id: new mongoose.Types.ObjectId(),
        full_name: getString(address.full_name),
        address1: getString(address.address1),
        address2: getString(address.address2),
        city: getString(address.city),
        country: getString(address.country).toUpperCase(),
        postal_code: getString(address.postal_code),
        state: getString(address.state),
        phone: getString(address.phone),
        company: getString(address.company),
        tax_number: getString(address.tax_number),
        coordinates,
        details: address.details,
        default_billing: false,
        default_shipping: false,
      }
    : {};
};

const getOrderAddress = (address: any) => {
  const coordinates = {
    latitude: '',
    longitude: '',
  };

  if (address && address.coordinates) {
    coordinates.latitude = address.coordinates.latitude;
    coordinates.longitude = address.coordinates.longitude;
  }

  const emptyAddress = {
    full_name: '',
    address1: '',
    address2: '',
    city: '',
    country: '',
    postal_code: '',
    state: '',
    phone: '',
    company: '',
    tax_number: '',
    coordinates,
    details: null,
  };

  return address
    ? {
        full_name: getString(address.full_name),
        address1: getString(address.address1),
        address2: getString(address.address2),
        city: getString(address.city),
        country: getString(address.country).toUpperCase(),
        postal_code: getString(address.postal_code),
        state: getString(address.state),
        phone: getString(address.phone),
        company: getString(address.company),
        tax_number: getString(address.tax_number),
        coordinates,
        details: address.details,
        ...address,
      }
    : emptyAddress;
};

export default {
  getString,
  getObjectIDIfValid,
  getDateIfValid,
  getArrayIfValid,
  getArrayOfObjectID,
  getNumberIfValid,
  getNumberIfPositive,
  getBooleanIfValid,
  getBrowser,
  getCustomerAddress,
  getOrderAddress,
};
