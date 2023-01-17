import { EntityActionButtons } from 'src/view/Questionnaire/common';
import { i18n } from 'src/i18n';
import { useRef } from 'react';
import Colors from 'src/view/shared/theme/Colors';
import CompleteStatus from 'src/view/Questionnaire/components/CompleteStatus';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import MaterialLink from '@mui/material/Link';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import Message from 'src/view/shared/message';
import timelineItem from 'src/mui/shared/Timeline/TimelineItem/styles';

const SectionItem = (props) => {
  const {
    color,
    darkMode,
    doDeleteSection,
    doMoveDown,
    doMoveUp,
    doSaveSection,
    doSelect,
    firstItem,
    index,
    lastItem,
    preview,
    readOnly,
    value,
  } = props;

  const titleRef = useRef(null);

  const doEdit = () => {
    doSaveSection &&
      doSaveSection(
        {
          editing: value.title,
        },
        index,
      );
  };

  const doDelete = () => {
    doDeleteSection && doDeleteSection(index);
  };

  const doSave = () => {
    if (
      !titleRef?.current?.value ||
      titleRef?.current?.value.trim() === ''
    ) {
      Message.error(
        i18n(
          'entities.questionnaireTemplate.update.section.required',
        ),
      );
      return;
    }
    doSaveSection &&
      doSaveSection(
        {
          title: titleRef?.current?.value,
          editing: false,
        },
        index,
      );
  };

  const doSaveTitleOnly = () => {
    doSaveSection &&
      doSaveSection(
        {
          title: titleRef?.current?.value,
        },
        index,
      );
  };

  const doCancel = () => {
    doSaveSection &&
      doSaveSection(
        {
          title: value.editing,
          editing: false,
        },
        index,
      );
  };

  return (
    <MDBox
      position="relative"
      mt={firstItem ? 2.4 : 0}
      mb={lastItem ? 0 : 1.6}
      sx={(theme: any) =>
        timelineItem(theme, {
          lastItem,
          isDark: darkMode,
        })
      }
    >
      <MDBox
        display="flex"
        justifyContent="center"
        alignItems="center"
        bgColor={Colors(color)}
        color="white"
        width="1.6rem"
        height="1.6rem"
        borderRadius="50%"
        position="absolute"
        top="0.25rem"
        left="1.6px"
        zIndex={2}
        sx={{
          fontSize: ({ typography: { size } }: any) =>
            size.sm,
        }}
      >
        <MDTypography
          variant="body2"
          fontWeight="bold"
          lineHeight={0}
          color="white"
        >
          {index + 1}
        </MDTypography>
      </MDBox>
      <MDBox
        display="flex"
        justifyContent="space-between"
        alignItems="start"
        pt="0.25rem"
        ml={4.6}
        lineHeight={0}
        maxWidth="100%"
      >
        <MDBox flexGrow={1} overflow="hidden">
          {!preview && !readOnly && value.editing ? (
            <InputFormItem
              ref={titleRef}
              value={value.title}
              variant="standard"
              onBlur={() => doSaveTitleOnly()}
              forceValue
            />
          ) : (
            <MDTypography
              variant="body2"
              fontWeight="bold"
              sx={{
                maxWidth: '100%',
                display: 'inline-block',
                whiteSpace: 'break-spaces',
              }}
              lineHeight="1.6rem"
            >
              <MaterialLink
                underline="hover"
                onClick={() =>
                  doSelect && doSelect(value.key)
                }
                sx={{
                  cursor: 'pointer',
                }}
              >
                {value.title}
              </MaterialLink>
            </MDTypography>
          )}
          {preview || readOnly ? (
            <CompleteStatus
              completed={value.answers || 0}
              total={value.questions}
            />
          ) : (
            <MDBox
              display="flex"
              justifyContent="flex-start"
            >
              <MDTypography
                variant="caption"
                fontWeight="regular"
                color="text"
              >
                {i18n(
                  'entities.questionnaireTemplate.labels.questions',
                  value.questions,
                )}
              </MDTypography>
            </MDBox>
          )}
        </MDBox>
        {!preview && !readOnly && (
          <MDBox display="flex">
            <EntityActionButtons
              color={color}
              doCancel={doCancel}
              doDelete={doDelete}
              doEdit={doEdit}
              doMoveDown={doMoveDown}
              doMoveUp={doMoveUp}
              doSave={doSave}
              editing={value.editing}
              firstItem={firstItem}
              index={index}
              lastItem={lastItem}
            />
          </MDBox>
        )}
      </MDBox>
    </MDBox>
  );
};

export default SectionItem;
