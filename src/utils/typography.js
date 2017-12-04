import Typography from "typography"

const serifFamily = ['adobe-jenson-pro', 'Georgia', 'serif'];
const sansSerifFamily = ['Source Sans Pro', 'Helvetica', 'Arial', 'sans-serif'];

const typography = new Typography({
  baseFontSize: '16px',
  baseLineHeight: 1.66,
  headerFontFamily: sansSerifFamily,
  bodyFontFamily: sansSerifFamily,
  overrideStyles: ({ adjustFontSizeTo, rhythm }, options, styles) => ({
    h1: {
      fontFamily: serifFamily.join(','),
      fontSize: '2.625rem',
      fontWeight: '400'
    },
    h2: {
      fontSize: '1.75rem',
      fontWeight: '400',
      marginTop: rhythm(2),
      marginBottom: rhythm(1/2)
    },
    h3: {
      fontWeight: '400',
      marginTop: rhythm(2),
      marginBottom: rhythm(1/2)
    },
    p: {
      marginTop: rhythm(1/2),
      marginBottom: rhythm(1/2)
    }
  })
})

export default typography
