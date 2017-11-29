import Typography from "typography"

const serifFamily = ['Adobe Jenson Pro', 'Georgia', 'serif'];
const sansSerifFamily = ['Source Sans Pro', 'Helvetica', 'Arial', 'sans-serif'];

const typography = new Typography({
  baseFontSize: '16px',
  baseLineHeight: 1.66,
  headerFontFamily: sansSerifFamily,
  bodyFontFamily: sansSerifFamily,
  overrideStyles: ({ adjustFontSizeTo, rhythm }, options, styles) => ({
    h1: {
      fontFamily: serifFamily.join(','),
      fontSize: '2.625rem'
    }
  })
})

export default typography
