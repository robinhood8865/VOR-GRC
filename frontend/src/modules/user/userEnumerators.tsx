import Roles from 'src/security/roles';
import colors from 'src/mui/assets/theme/base/colors';

const userEnumerators = {
  status: [
    'active',
    'inactive',
    'invited',
    'empty-permissions',
  ],
  statusColor: [
    colors.success.main,
    colors.error.main,
    colors.info.main,
    colors.warning.main,
  ],
  roles: Object.keys(Roles.values),
};

export default userEnumerators;
