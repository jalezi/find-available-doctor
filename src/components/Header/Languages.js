import { useNavigate, useLocation } from 'react-router-dom';
import i18next, { languages } from '@/i18n';

const Languages = function Languages() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleChangeLocale = e => {
    e.preventDefault();
    const lang = e.target.value;
    i18next.changeLanguage(lang);
    navigate(`/${lang}/${location.pathname.substring(4)}`);
  };

  return (
    <select onChange={handleChangeLocale} value={i18next.language} style={{ marginRight: '24px' }}>
      {languages.map(({ name, code }) => (
        <option key={code} value={code}>
          {name}
        </option>
      ))}
    </select>
  );
};

export default Languages;
