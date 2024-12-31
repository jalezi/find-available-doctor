import slugify from 'slugify';

import { DOCTORS, MAP } from '@/const';

const { GEO_LOCATION } = MAP;

const trimString = str => str.replace(/\s+/g, ' ').trim();

const getAddressObject = (doctor, institution) => {
  const post = doctor.post || institution.post;
  const [postalCode, ...postalName] = post.split(' ');
  return {
    street: doctor.address || institution.address,
    city: doctor.city || institution.city,
    municipalityPart: doctor.municipalityPart || institution.municipalityPart,
    municipality: doctor.municipality || institution.municipality,
    postalCode,
    post: postalName.join(' '),
  };
};

const DUMMY_INST = {
  unit: '',
  name: '',
  website: '',
  phone: '',
  lat: GEO_LOCATION.SL_CENTER[0],
  lon: GEO_LOCATION.SL_CENTER[1],
  address: '',
  city: '',
  post: '0000 Neznan',
  municipalityPart: '',
  municipality: '',
};

export function createDoctor(doctor, inst) {
  const institution = inst ?? DUMMY_INST;

  const name = trimString(doctor.doctor);
  const nameSlug = slugify(name.toLowerCase());
  const instId = trimString(doctor.id_inst);

  const munUnit = trimString(institution.unit);
  const provider = trimString(institution.name);
  const website = trimString(doctor.website || institution.website);
  const phone = trimString(doctor.phone || institution.phone);

  let geoLocation = {
    lat: parseFloat(doctor.lat || institution.lat),
    lon: parseFloat(doctor.lon || institution.lon),
  };

  if (Number.isNaN(geoLocation.lat) || Number.isNaN(geoLocation.lon)) {
    // instead if throwing an error, we'll just use the center of Slovenia
    // eslint-disable-next-line no-console
    console.error(`Invalid geoLocation for ${name} (${doctor.key}),`, { institution, doctor });
    const [lat, lon] = GEO_LOCATION.SL_CENTER;
    geoLocation = { lat, lon };
  }

  const addressObject = getAddressObject(doctor, institution);
  const isExtra = doctor.type.match(/-x$/);
  const isFloating = doctor.type.match(/-f$/);

  const {
    accepts: acceptsZZZS,
    accepts_override: acceptsOverride,
    availability: availabilityZZZS,
    availability_override: availabilityOverride,
    date_override: dateOverride,
    email,
    load,
    note_override: noteOverride,
    orderform,
  } = doctor;

  const accepts = acceptsOverride || acceptsZZZS;

  const formatUpdatedAt = (lng = 'sl') => {
    const lngTranslate = {
      sl: 'sl-SL',
      en: 'en-GB',
      de: 'de-DE',
      it: 'it-IT',
      hr: 'hr-HR',
      hu: 'hu-HU',
    };

    return new Intl.DateTimeFormat(lngTranslate[lng]).format(new Date(dateOverride));
  };

  return Object.freeze({
    get accepts() {
      return accepts;
    },
    get acceptsOverride() {
      return acceptsOverride;
    },
    get acceptsZZZS() {
      return acceptsZZZS;
    },
    get availability() {
      return availabilityOverride || availabilityZZZS;
    },
    get availabilityOverride() {
      return availabilityOverride;
    },
    get availabilityZZZS() {
      return availabilityZZZS;
    },
    get email() {
      return email;
    },
    get fullAddress() {
      return `${addressObject.street}, ${addressObject.postalCode} ${addressObject.post}`;
    },
    get geoLocation() {
      return geoLocation;
    },
    get hasInstitution() {
      return !!inst;
    },
    get instId() {
      return instId;
    },
    get key() {
      return doctor.key;
    },
    get load() {
      return load;
    },
    get munUnit() {
      return munUnit;
    },
    get name() {
      return name;
    },
    get nameSlug() {
      return nameSlug;
    },
    get note() {
      return noteOverride;
    },
    get orderform() {
      return orderform;
    },
    get phone() {
      return phone;
    },
    get provider() {
      return provider;
    },
    get searchAddress() {
      return `${addressObject.street}, ${addressObject.postalCode} ${addressObject.city} ${addressObject.municipalityPart} ${addressObject.municipality}`;
    },
    get isExtra() {
      return isExtra;
    },
    get isFloating() {
      return isFloating;
    },
    get type() {
      return doctor.type;
    },
    get typeClean() {
      if (isExtra || isFloating) {
        return doctor.type.replace(/-x|f$/, '');
      }
      return doctor.type;
    },
    get updatedAt() {
      return dateOverride;
    },
    get website() {
      return website;
    },
    formatUpdatedAt,
  });
}

export default function createDoctors({ doctorsDict, institutionsDict }) {
  const instKey = DOCTORS.INSTITUTION_KEY;

  const doctors = Object.entries(doctorsDict).reduce((acc, [doctorId, doctorData]) => {
    const institution = institutionsDict[doctorData[instKey]];

    const doctor = createDoctor(doctorData, institution);
    acc[doctorId] = doctor;
    return acc;
  }, {});

  const doctorValues = Object.values(doctors);
  const doctorsValues = Intl.Collator
    ? doctorValues.sort((a, b) => new Intl.Collator('sl').compare(a.name, b.name))
    : doctorValues.sort((a, b) => a.name.localeCompare(b.name, 'sl'));
  const filterByType = type => doctorsValues.filter(doctor => doctor.type === type);

  const byType = DOCTORS.TYPES.reduce((acc, type) => {
    acc[type] = filterByType(type);
    return acc;
  }, {});

  const filterByTypeAndAccepts = (type, accepts) => {
    let tmpByType = byType[type];
    let reSort = false;
    if (type === 'gp') {
      if (byType['gp-x']) {
        tmpByType = tmpByType.concat(byType['gp-x']);
        reSort = true;
      }
      if (byType['gp-f']) {
        tmpByType = tmpByType.concat(byType['gp-f']);
        reSort = true;
      }
    } else if (type === 'ped' && byType['ped-x']) {
      tmpByType = tmpByType.concat(byType['ped-x']);
      reSort = true;
    }

    if (reSort) {
      tmpByType = Intl.Collator
        ? tmpByType.sort((a, b) => new Intl.Collator('sl').compare(a.name, b.name))
        : tmpByType.sort((a, b) => a.name.localeCompare(b.name, 'sl'));
    }

    if (accepts !== 'y' && accepts !== 'n') {
      return tmpByType;
    }

    return tmpByType.filter(doctor => doctor.accepts === accepts);
  };

  const findByTypeAndNameSlug = (type, nameSlug, instId) =>
    byType[type].find(doctor => doctor.nameSlug === nameSlug && doctor.instId === instId);

  return Object.freeze({
    all: doctorsValues,
    filterByTypeAndAccepts,
    findByTypeAndNameSlug,
  });
}
