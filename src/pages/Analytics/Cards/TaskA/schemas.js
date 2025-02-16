import { z } from 'zod';

export const doctorTypesMap = Object.freeze({
  'Boljša dostopnost': 'betterAccessibility',
  'Spl. dejavnost': 'gp',
  Ginekologija: 'gyn',
  DSO: 'dso',
  Zobozdravstvo: 'den',
});

export const dejavnostSchema = z.enum([
  'Boljša dostopnost',
  'Spl. dejavnost',
  'Ginekologija',
  'DSO',
  'Zobozdravstvo',
]);
export const dataSchema = z.object({
  dejavnost: dejavnostSchema,
  leto: z.number(),
  ioz_ratio: z.number(),
  naziv_obcine_zav_osebe: z.string(),
  obcina: z.string(),
  st_zavarovanih_oseb: z.number(),
  st_zavarovanih_oseb_z_ioz: z.number(),
  starostna_skupina: z.number(),
});

export const overviewSchemaTransformed = dataSchema.transform(item => ({
  doctorType: doctorTypesMap[item.dejavnost],
  year: item.leto,
  iozRatio: item.ioz_ratio,
  municipality: item.obcina,
  insuredPeopleCount: item.st_zavarovanih_oseb,
  insuredPeopleCountWithIOZ: item.st_zavarovanih_oseb_z_ioz,
  insuredPeopleCountWithoutIOZ: item.st_zavarovanih_oseb - item.st_zavarovanih_oseb_z_ioz,
}));

export const detailSchemaTransformed = dataSchema.transform(item => ({
  doctorType: doctorTypesMap[item.dejavnost],
  year: item.leto,
  ageGroup: item.starostna_skupina,
  iozRatio: item.ioz_ratio,
  municipality: item.obcina,
  insuredPeopleCount: item.st_zavarovanih_oseb,
  insuredPeopleCountWithIOZ: item.st_zavarovanih_oseb_z_ioz,
  insuredPeopleCountWithoutIOZ: item.st_zavarovanih_oseb - item.st_zavarovanih_oseb_z_ioz,
}));
