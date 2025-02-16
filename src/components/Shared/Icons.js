import PropTypes from 'prop-types';

import { ReactComponent as AllWhite } from 'assets/icon-all--white.svg';
import { ReactComponent as All } from 'assets/icon-all.svg';
import { ReactComponent as BanWhite } from 'assets/icon-ban--white.svg';
import { ReactComponent as BanRed } from 'assets/icon-ban-red.svg';
import { ReactComponent as Ban } from 'assets/icon-ban.svg';
import { ReactComponent as CheckWhite } from 'assets/icon-check--white.svg';
import { ReactComponent as CheckGreen } from 'assets/icon-check-green.svg';
import { ReactComponent as Check } from 'assets/icon-check.svg';
import { ReactComponent as DentistWhite } from 'assets/icon-dentist--white.svg';
import { ReactComponent as Dentist } from 'assets/icon-dentist.svg';
import { ReactComponent as FamilyDrWhite } from 'assets/icon-family-dr--white.svg';
import { ReactComponent as Family } from 'assets/icon-family-dr.svg';
import { ReactComponent as Group } from 'assets/icon-group.svg';
import { ReactComponent as GynoWhite } from 'assets/icon-gynecologist--white.svg';
import { ReactComponent as Gyno } from 'assets/icon-gynecologist.svg';
import { ReactComponent as IdCard } from 'assets/icon-id-card.svg';
import { ReactComponent as MapMarker } from 'assets/icon-map-marker.svg';
import { ReactComponent as SearchWhite } from 'assets/icon-search--white.svg';
import { ReactComponent as Search } from 'assets/icon-search.svg';
import { ReactComponent as Logo } from 'assets/zdravniki-sledilnik-logo.svg';
import { ReactComponent as Facebook } from 'assets/icon-fb.svg';
import { ReactComponent as Share } from 'assets/icon-share.svg';
import { ReactComponent as Twitter } from 'assets/icon-tw-new-rounded.svg';
import { ReactComponent as IconCircle } from 'assets/icon-circle.svg';
import { ReactComponent as AdultsWhite } from 'assets/icon-adults--white.svg';
import { ReactComponent as Adults } from 'assets/icon-adults.svg';
import { ReactComponent as KidsWhite } from 'assets/icon-kids--white.svg';
import { ReactComponent as Kids } from 'assets/icon-kids.svg';
import { ReactComponent as StudentsWhite } from 'assets/icon-students--white.svg';
import { ReactComponent as Students } from 'assets/icon-students.svg';
import { ReactComponent as ArrowBack } from 'assets/icon-back.svg';
import { ReactComponent as Close } from 'assets/icon-close.svg';
import { ReactComponent as Link } from 'assets/icon-link.svg';
import { ReactComponent as LinkBig } from 'assets/icon-link--big.svg';
import { ReactComponent as PhoneBig } from 'assets/icon-phone--big.svg';
import { ReactComponent as NoPhoneBig } from 'assets/icon-phone-none--big.svg';
import { ReactComponent as Phone } from 'assets/icon-phone.svg';
import { ReactComponent as Copy } from 'assets/icon-copy.svg';
import { ReactComponent as ReportError } from 'assets/icon-alert.svg';
import { ReactComponent as Filter } from 'assets/icon-filter.svg';
import { ReactComponent as FilterWhite } from 'assets/icon-filter--white.svg';
import { ReactComponent as MapView } from 'assets/icon-map-view.svg';
import { ReactComponent as MapViewWhite } from 'assets/icon-map-view--white.svg';
import { ReactComponent as ListView } from 'assets/icon-list-view.svg';
import { ReactComponent as ListViewWhite } from 'assets/icon-list-view--white.svg';
import { ReactComponent as More } from 'assets/icon-more.svg';
import { ReactComponent as Booking } from 'assets/icon-booking.svg';
import { ReactComponent as Edit } from 'assets/icon-edit.svg';
import { ReactComponent as Email } from 'assets/icon-email.svg';
import { ReactComponent as ClinicViolet } from 'assets/icon-clinic--violet.svg';
import { ReactComponent as GpFloatingBlue } from 'assets/icon-gp-floating--blue.svg';
import { ReactComponent as GitHub } from 'assets/icon-github.svg';
import { ReactComponent as Euro } from 'assets/icon-euro.svg';
import { ReactComponent as FullScreen } from 'assets/icon-full-screen.svg';
import { ReactComponent as Print } from 'assets/icon-print.svg';
import { ReactComponent as VerticalDots } from 'assets/vertical-dots.svg';
import { ReactComponent as Chart } from 'assets/icon-chart.svg';

export {
  Menu as MenuIcon,
  Room as RoomIcon,
  Search as SearchIcon,
  EmojiPeople as EmojiPeopleIcon,
  Block as BlockIcon,
  CheckCircleOutline as CheckCircleOutlineIcon,
  Groups as GroupsIcon,
  ContactPage as ContactPageIcon,
  Check as CheckIcon,
  FacebookOutlined as FacebookIcon,
  Close as CloseIcon,
  Link as LinkIcon,
  PhoneEnabled as PhoneEnabledIcon,
  ExpandMore as ExpandMoreIcon,
  TrendingFlat as TrendingFlatIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  PlayArrow as PlayArrowIcon,
  Pause as PauseIcon,
} from '@mui/icons-material';

const icons = {
  Adults,
  AdultsWhite,
  All,
  AllWhite,
  ArrowBack,
  Ban,
  BanRed,
  BanWhite,
  Check,
  CheckGreen,
  CheckWhite,
  Close,
  Copy,
  Dentist,
  DentistWhite,
  Facebook,
  Family,
  FamilyDrWhite,
  Gyno,
  GynoWhite,
  Group,
  IconCircle,
  IdCard,
  Kids,
  KidsWhite,
  Link,
  LinkBig,
  Logo,
  MapMarker,
  Phone,
  PhoneBig,
  NoPhoneBig,
  Search,
  SearchWhite,
  Share,
  Students,
  StudentsWhite,
  Twitter,
  ReportError,
  Filter,
  FilterWhite,
  MapView,
  MapViewWhite,
  ListView,
  ListViewWhite,
  More,
  Booking,
  Edit,
  Email,
  ClinicViolet,
  GpFloatingBlue,
  GitHub,
  Euro,
  FullScreen,
  Print,
  VerticalDots,
  Chart,
};

export const Icon = function Icon({ name, ...props }) {
  const Component = name in icons ? icons[name] : null;
  return Component ? <Component {...props} /> : null;
};

export const ICON_KEYS = Object.keys(icons);

Icon.propTypes = {
  name: PropTypes.oneOf(ICON_KEYS).isRequired,
};

export default Icon;
