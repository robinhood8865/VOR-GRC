import { Avatar, TableContainer } from '@mui/material';
import {
  DEFAULT_MOMENT_FORMAT,
  DEFAULT_MOMENT_FORMAT_DATE_ONLY,
} from 'src/config/common';
import { i18n } from 'src/i18n';
import { Link } from 'react-router-dom';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import actions from 'src/modules/user/list/userListActions';
import authActions from 'src/modules/auth/authActions';
import authSelectors from 'src/modules/auth/authSelectors';
import BlockIcon from '@mui/icons-material/Block';
import Checkbox from '@mui/material/Checkbox';
import ConfirmModal from 'src/view/shared/modals/ConfirmModal';
import DataTableBodyCell from 'src/mui/shared/Tables/DataTable/DataTableBodyCell';
import DataTableHeadCell from 'src/mui/shared/Tables/DataTable/DataTableHeadCell';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import MDBadgeDot from 'src/mui/components/MDBadgeDot';
import MDBox from 'src/mui/components/MDBox';
import MDButton from 'src/mui/components/MDButton';
import MDTypography from 'src/mui/components/MDTypography';
import moment from 'moment';
import Pagination from 'src/view/shared/table/Pagination';
import Roles from 'src/security/roles';
import SearchIcon from '@mui/icons-material/Search';
import selectors from 'src/modules/user/list/userListSelectors';
import Spinner from 'src/view/shared/Spinner';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';
import userSelectors from 'src/modules/user/userSelectors';
import UserStatusView from 'src/view/user/view/UserStatusView';
import VerifiedIcon from '@mui/icons-material/Verified';

function UserTable() {
  const dispatch = useDispatch();
  const [recordIdToActivate, setRecordIdToActivate] =
    useState(null);
  const [recordIdToDeactivate, setRecordIdToDeactivate] =
    useState(null);
  const [recordIdToDestroy, setRecordIdToDestroy] =
    useState(null);

  const loading = useSelector(selectors.selectLoading);
  const rows = useSelector(selectors.selectRows);
  const pagination = useSelector(
    selectors.selectPagination,
  );
  const selectedKeys = useSelector(
    selectors.selectSelectedKeys,
  );
  const hasRows = useSelector(selectors.selectHasRows);
  const sorter = useSelector(selectors.selectSorter);
  const isAllSelected = useSelector(
    selectors.selectIsAllSelected,
  );
  const hasPermissionToEdit = useSelector(
    userSelectors.selectPermissionToEdit,
  );
  const hasPermissionToDestroy = useSelector(
    userSelectors.selectPermissionToDestroy,
  );

  const doActivate = (id) => {
    setRecordIdToActivate(null);
    dispatch(actions.doActivate(id));
  };

  const doDeactivate = (id) => {
    setRecordIdToDeactivate(null);
    dispatch(actions.doDeactivate(id));
  };

  const doDestroy = (id) => {
    setRecordIdToDestroy(null);
    dispatch(actions.doDestroy(id));
  };

  const doChangeSort = (field) => {
    const order =
      sorter.field === field && sorter.order === 'asc'
        ? 'desc'
        : 'asc';

    dispatch(
      actions.doChangeSort({
        field,
        order,
      }),
    );
  };

  const doChangePagination = (pagination) => {
    dispatch(actions.doChangePagination(pagination));
  };

  const doToggleAllSelected = () => {
    dispatch(actions.doToggleAllSelected());
  };

  const doToggleOneSelected = (id) => {
    dispatch(actions.doToggleOneSelected(id));
  };

  const [recordIdToImpersonate, setRecordIdToImpersonate] =
    useState(null);

  const doImpersonate = (id) => {
    dispatch(authActions.doImpersonate(id));
    setRecordIdToImpersonate(null);
  };

  const currentUser = useSelector(
    authSelectors.selectCurrentUser,
  );

  const hasAdminRole = useSelector(
    authSelectors.selectHasAdminRole,
  );

  const { sidenavColor } = selectMuiSettings();

  return (
    <>
      <TableContainer sx={{ boxShadow: 'none' }}>
        <Table>
          <MDBox component="thead">
            <TableRow>
              <DataTableHeadCell
                padding="checkbox"
                sorted={false}
                width="0"
              >
                {hasRows && (
                  <Checkbox
                    color={sidenavColor}
                    checked={Boolean(isAllSelected)}
                    onChange={() => doToggleAllSelected()}
                    size="small"
                  />
                )}
              </DataTableHeadCell>
              <DataTableHeadCell sorted={false} width="0">
                {' '}
              </DataTableHeadCell>
              {hasAdminRole && (
                <DataTableHeadCell sorted={false} width="0">
                  {i18n('user.fields.impersonate')}
                </DataTableHeadCell>
              )}
              <DataTableHeadCell
                sorted={false}
                width="0"
                noWrap
              >
                {i18n('user.fields.avatars')}
              </DataTableHeadCell>
              <DataTableHeadCell
                onClick={() => doChangeSort('email')}
                sorted={
                  sorter.field === 'email'
                    ? sorter.order
                    : 'none'
                }
                width="0"
                noWrap
              >
                {i18n('user.fields.email')}
              </DataTableHeadCell>
              <DataTableHeadCell
                onClick={() => doChangeSort('fullName')}
                sorted={
                  sorter.field === 'fullName'
                    ? sorter.order
                    : 'none'
                }
              >
                {i18n('user.fields.fullName')}
              </DataTableHeadCell>
              <DataTableHeadCell
                sorted={false}
                width="0"
                noWrap
              >
                {i18n('user.fields.roles')}
              </DataTableHeadCell>
              <DataTableHeadCell
                sorted={false}
                width="0"
                noWrap
              >
                {i18n('user.fields.status')}
              </DataTableHeadCell>
              <DataTableHeadCell
                onClick={() => doChangeSort('lastLoginAt')}
                sorted={
                  sorter.field === 'lastLoginAt'
                    ? sorter.order
                    : 'none'
                }
                width="0"
                noWrap
              >
                {i18n('user.fields.lastLoginAt')}
              </DataTableHeadCell>
              <DataTableHeadCell
                onClick={() => doChangeSort('createdAt')}
                sorted={
                  sorter.field === 'createdAt'
                    ? sorter.order
                    : 'none'
                }
                width="0"
                noWrap
              >
                {i18n('user.fields.createdAt')}
              </DataTableHeadCell>
              <DataTableHeadCell
                onClick={() => doChangeSort('updatedAt')}
                sorted={
                  sorter.field === 'updatedAt'
                    ? sorter.order
                    : 'none'
                }
                width="0"
                noWrap
              >
                {i18n('user.fields.updatedAt')}
              </DataTableHeadCell>
            </TableRow>
          </MDBox>
          <TableBody>
            {loading && (
              <TableRow>
                <DataTableBodyCell
                  align="center"
                  colSpan={100}
                >
                  <Spinner />
                </DataTableBodyCell>
              </TableRow>
            )}
            {!loading && !hasRows && (
              <TableRow>
                <DataTableBodyCell
                  align="center"
                  colSpan={100}
                >
                  <MDTypography>
                    {i18n('table.noData')}
                  </MDTypography>
                </DataTableBodyCell>
              </TableRow>
            )}
            {!loading &&
              rows.map((row) => (
                <TableRow key={row.id}>
                  <DataTableBodyCell padding="checkbox">
                    <Checkbox
                      color={sidenavColor}
                      checked={selectedKeys.includes(
                        row.id,
                      )}
                      onChange={() =>
                        doToggleOneSelected(row.id)
                      }
                      size="small"
                    />
                  </DataTableBodyCell>
                  <DataTableBodyCell>
                    <MDBox
                      display="flex"
                      justifyContent="flex-end"
                    >
                      <Tooltip
                        disableInteractive
                        title={i18n('common.view')}
                      >
                        <IconButton
                          size="small"
                          component={Link}
                          to={`/user/${row.id}`}
                          color={sidenavColor}
                        >
                          <SearchIcon />
                        </IconButton>
                      </Tooltip>
                      {hasPermissionToEdit && (
                        <>
                          <Tooltip
                            disableInteractive
                            title={i18n('common.edit')}
                          >
                            <IconButton
                              size="small"
                              component={Link}
                              to={`/user/${row.id}/edit`}
                              color={sidenavColor}
                            >
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                          {/* <Tooltip
                            disableInteractive
                            title={i18n('common.activate')}
                          >
                            <IconButton
                              size="small"
                              onClick={() =>
                                setRecordIdToActivate(
                                  row.id,
                                )
                              }
                              color={sidenavColor}
                            >
                              <VerifiedIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip
                            disableInteractive
                            title={i18n(
                              'common.deactivate',
                            )}
                          >
                            <IconButton
                              size="small"
                              onClick={() =>
                                setRecordIdToDeactivate(
                                  row.id,
                                )
                              }
                              color={sidenavColor}
                            >
                              <BlockIcon />
                            </IconButton>
                          </Tooltip> */}
                        </>
                      )}
                      {hasPermissionToDestroy && (
                        <Tooltip
                          disableInteractive
                          title={i18n('common.destroy')}
                        >
                          <IconButton
                            size="small"
                            onClick={() =>
                              setRecordIdToDestroy(row.id)
                            }
                            color={sidenavColor}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      )}
                    </MDBox>
                  </DataTableBodyCell>
                  {hasAdminRole && (
                    <DataTableBodyCell>
                      {currentUser.id !== row.id &&
                        row.status === 'active' && (
                          <MDButton
                            variant="outlined"
                            color={sidenavColor}
                            onClick={() =>
                              setRecordIdToImpersonate(
                                row.id,
                              )
                            }
                            disabled={
                              !!recordIdToImpersonate
                            }
                          >
                            {i18n(
                              'user.fields.impersonate',
                            )}
                          </MDButton>
                        )}
                    </DataTableBodyCell>
                  )}
                  <DataTableBodyCell>
                    <Avatar
                      src={
                        row.avatars && row.avatars.length
                          ? row.avatars[0].downloadUrl
                          : undefined
                      }
                      alt={row.email}
                      sx={{
                        width: 32,
                        height: 32,
                      }}
                    />
                  </DataTableBodyCell>
                  <DataTableBodyCell>
                    {row.email}
                  </DataTableBodyCell>
                  <DataTableBodyCell textTransform="capitalize">
                    {row.fullName}
                  </DataTableBodyCell>
                  <DataTableBodyCell>
                    {row.roles.map((roleId) => (
                      <MDBadgeDot
                        key={roleId}
                        width="max-content"
                        badgeContent={Roles.labelOf(roleId)}
                        color={sidenavColor}
                        variant="contained"
                      />
                    ))}
                  </DataTableBodyCell>
                  <DataTableBodyCell>
                    <UserStatusView value={row.status} />
                  </DataTableBodyCell>
                  <DataTableBodyCell>
                    {row.lastLoginAt
                      ? moment(row.lastLoginAt).format(
                          DEFAULT_MOMENT_FORMAT,
                        )
                      : null}
                  </DataTableBodyCell>
                  <DataTableBodyCell>
                    {row.createdAt
                      ? moment(row.createdAt).format(
                          DEFAULT_MOMENT_FORMAT_DATE_ONLY,
                        )
                      : null}
                  </DataTableBodyCell>
                  <DataTableBodyCell>
                    {row.updatedAt
                      ? moment(row.updatedAt).format(
                          DEFAULT_MOMENT_FORMAT_DATE_ONLY,
                        )
                      : null}
                  </DataTableBodyCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Pagination
        onChange={doChangePagination}
        disabled={loading}
        pagination={pagination}
        entriesPerPage
        showTotalEntries
      />

      {recordIdToActivate && (
        <ConfirmModal
          onConfirm={() => doActivate(recordIdToActivate)}
          onClose={() => setRecordIdToActivate(null)}
        />
      )}

      {recordIdToDeactivate && (
        <ConfirmModal
          onConfirm={() =>
            doDeactivate(recordIdToDeactivate)
          }
          onClose={() => setRecordIdToDeactivate(null)}
        />
      )}

      {recordIdToDestroy && (
        <ConfirmModal
          onConfirm={() => doDestroy(recordIdToDestroy)}
          onClose={() => setRecordIdToDestroy(null)}
        />
      )}

      {recordIdToImpersonate && (
        <ConfirmModal
          onConfirm={() =>
            doImpersonate(recordIdToImpersonate)
          }
          onClose={() => setRecordIdToImpersonate(null)}
        />
      )}
    </>
  );
}

export default UserTable;
