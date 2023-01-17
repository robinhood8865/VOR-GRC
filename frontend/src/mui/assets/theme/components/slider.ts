/**
=========================================================
* Material Dashboard 2 PRO React TS - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-2-pro-react-ts
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// Material Dashboard 2 PRO React TS Base Styles
import colors from 'src/mui/assets/theme/base/colors';
import borders from 'src/mui/assets/theme/base/borders';
import boxShadows from 'src/mui/assets/theme/base/boxShadows';

// Material Dashboard 2 PRO React TS Helper Functions
import pxToRem from 'src/mui/assets/theme/functions/pxToRem';
import boxShadow from 'src/mui/assets/theme/functions/boxShadow';

const { grey, white, black, info } = colors;
const { borderRadius, borderWidth } = borders;
const { sliderBoxShadow } = boxShadows;

// types
type Types = any;

const slider: Types = {
  styleOverrides: {
    root: {
      width: '100%',

      '& .MuiSlider-active, & .Mui-focusVisible': {
        boxShadow: 'none !important',
      },

      '& .MuiSlider-valueLabel': {
        color: black.main,
      },

      '& .MuiSlider-markLabel': {
        fontSize: '9.6px',
        fontWeight: 400,
        color: black.main,
      },
    },

    rail: {
      background: grey[200],
      borderRadius: borderRadius.sm,
      opacity: 0.5,
    },

    track: {
      position: 'relative',
      border: 'none',
      borderRadius: borderRadius.lg,
      zIndex: 1,
    },

    thumb: {
      width: pxToRem(11.2),
      height: pxToRem(11.2),
      zIndex: 10,
      boxShadow: sliderBoxShadow.thumb,
      transition: 'all 200ms linear',

      '&:hover': {
        boxShadow: 'none',
      },

      '&:active': {
        transform: 'translate(-50%, -50%) scale(1.4)',
      },

      '&.Mui-active': {
        boxShadow: boxShadow(
          [0, 0],
          [0, 8],
          black.main,
          0.16,
        ),
      },
    },
  },
};

export default slider;