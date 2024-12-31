import { useState } from 'react';
import PropTypes from 'prop-types';

import { CardActions, Divider, IconButton, ListItemIcon, MenuItem } from '@mui/material';
import { MoreVert as MoreVertIcon } from '@mui/icons-material/';
import { t } from 'i18next';

import * as Icons from '@/components/Shared/Icons';

import * as Styled from '../styles';
import * as Shared from '../Shared';

const DoctorActions = function DoctorActions({ handlers, path, isMarker, phoneNum, menuId }) {
  const [moreMenuAnchorEl, setMoreMenuAnchorEl] = useState(null);
  const moreMenuOpen = Boolean(moreMenuAnchorEl);
  const moreMenuHandleClick = event => {
    setMoreMenuAnchorEl(event.currentTarget);
  };
  const moreMenuHandleClose = () => {
    setMoreMenuAnchorEl(null);
  };

  const { handleZoom, handleDoctorCard } = handlers;

  const goToDoctorPage = event => {
    moreMenuHandleClose();
    handleDoctorCard(event, false);
  };

  const goToReportError = event => {
    moreMenuHandleClose();
    handleDoctorCard(event, true);
  };

  const handleMarker = () => {
    handleZoom();
    moreMenuHandleClose();
  };

  return (
    <CardActions>
      <div>
        <IconButton
          aria-label={t('doctorCard.more')}
          aria-controls={menuId}
          aria-expanded={moreMenuOpen ? 'true' : 'false'}
          aria-haspopup="true"
          onClick={moreMenuHandleClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Styled.MoreMenu
          id={menuId}
          anchorEl={moreMenuAnchorEl}
          onClose={moreMenuHandleClose}
          open={moreMenuOpen}
        >
          {!isMarker && (
            <MenuItem onClick={handleMarker}>
              <ListItemIcon>
                <Icons.Icon name="MapMarker" />
              </ListItemIcon>
              {t('doctorCard.showOnMap')}
            </MenuItem>
          )}
          <MenuItem onClick={goToReportError}>
            <ListItemIcon>
              <Icons.Icon name="ReportError" />
            </ListItemIcon>
            {t('reportError.tooltip')}
          </MenuItem>

          {path && <Divider />}
          {path && (
            <MenuItem onClick={goToDoctorPage}>
              <Shared.LinkNoRel href={path} onClick={e => handleDoctorCard(e, false)}>
                <ListItemIcon>
                  <Icons.Icon name="IdCard" />
                </ListItemIcon>
                {t('doctorCard.more')}
              </Shared.LinkNoRel>
            </MenuItem>
          )}
        </Styled.MoreMenu>
        <Shared.PhoneButton phone={phoneNum} />
      </div>
    </CardActions>
  );
};

DoctorActions.defaultProps = {
  isMarker: false,
};

DoctorActions.propTypes = {
  isMarker: PropTypes.bool,
  menuId: PropTypes.string.isRequired,
  handlers: PropTypes.shape({
    handleZoom: PropTypes.func,
    handleDoctorCard: PropTypes.func,
  }).isRequired,
  path: PropTypes.string.isRequired,
  phoneNum: PropTypes.string.isRequired,
};
export default DoctorActions;
