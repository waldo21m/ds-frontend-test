import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { indigo, pink } from '@mui/material/colors';

let theme = createTheme({
	palette: {
		primary: {
			main: pink[500],
		},
		secondary: {
			main: indigo['A200'],
		},
	},
});

theme = responsiveFontSizes(theme);

export default theme;
