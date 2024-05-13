import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { indigo, teal } from '@mui/material/colors';

let theme = createTheme({
	palette: {
		primary: {
			main: indigo[500],
		},
		secondary: {
			main: teal[500],
		},
	},
});

theme = responsiveFontSizes(theme);

export default theme;
