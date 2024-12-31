import ToggleGroup from '@/components/Shared/ToggleGroup';

import { useFilter } from '@/context/filterContext';
import { t } from 'i18next';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { IconToggleButton } from './Shared';

function withToggleGroup(Component) {
  return function ToggleDoctorType(props) {
    const { state } = useLocation();

    const { type: stateType, ageGroup: stateAgeGroup } = state ?? {
      type: 'gp',
      ageGroup: 'adults',
    };

    const { doctorType, setDoctorType } = useFilter();
    const [drType, setDrType] = useState(stateType ?? 'gp');
    const [ageGroup, setAgeGroup] = useState(stateAgeGroup ?? 'adults');

    const injectedPropsDrType = {
      ...props,
      value: drType,
      setValue: setDrType,
      sx: { gridArea: 'doctor-type' },
    };
    const injectedPropsAgeGroup = {
      ...props,
      value: ageGroup,
      setValue: setAgeGroup,
      sx: { gridArea: 'age-group' },
    };

    useEffect(() => {
      const typeTranslate = {
        gp_adults: 'gp',
        gp_youth: 'gp',
        gp_students: 'gp',
        ped_adults: 'ped',
        ped_students: 'ped',
        ped_youth: 'ped',
        den_adults: 'den',
        den_students: 'den-s',
        den_youth: 'den-y',
        gyn_adults: 'gyn',
        gyn_students: 'gyn',
        gyn_youth: 'gyn',
      };

      const type = `${drType}_${ageGroup}`;

      if (!typeTranslate[type]) {
        setAgeGroup('adults');
      }

      if (doctorType !== type) setDoctorType(typeTranslate[type]);
    }, [drType, ageGroup, doctorType, setDoctorType]);

    return (
      <>
        <Component {...injectedPropsDrType}>
          <IconToggleButton
            isMainToggle
            value="gp"
            aria-label="general practitioner"
            accept={drType}
            text={t('generalPractitioner')}
            iconNames={['FamilyDrWhite', 'Family']}
          />
          <IconToggleButton
            isMainToggle
            value="ped"
            aria-label="pediatrician"
            accept={drType}
            text={t('pediatrician')}
            iconNames={['KidsWhite', 'Kids']}
          />
          <IconToggleButton
            isMainToggle
            value="gyn"
            aria-label="gynecologist"
            accept={drType}
            text={t('gynecologist')}
            iconNames={['GynoWhite', 'Gyno']}
          />
          <IconToggleButton
            isMainToggle
            value="den"
            aria-label="dentist"
            accept={drType}
            text={t('dentist')}
            iconNames={['DentistWhite', 'Dentist']}
          />
        </Component>
        {drType === 'den' && (
          <Component {...injectedPropsAgeGroup}>
            <IconToggleButton
              value="adults"
              aria-label="adults"
              accept={ageGroup}
              text={t('adults')}
              iconNames={['AdultsWhite', 'Adults']}
            />
            <IconToggleButton
              value="youth"
              aria-label="youth"
              accept={ageGroup}
              text={t('youth')}
              iconNames={['KidsWhite', 'Kids']}
            />
            <IconToggleButton
              value="students"
              aria-label="students"
              accept={ageGroup}
              text={t('students')}
              iconNames={['StudentsWhite', 'Students']}
            />
          </Component>
        )}
      </>
    );
  };
}

export default withToggleGroup(ToggleGroup);
