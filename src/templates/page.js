import React, { Component } from 'react'
// import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { changePageMountedStatus } from '../redux/redux'

import CONSTANTS from '../utils/constants';

const mapStateToProps = ({ pageMounted }) => {
  return { pageMounted }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changePageMountedStatus: bool => {
      dispatch(changePageMountedStatus(bool))
    }
  }
}

class Page extends Component {
  componentDidMount() {
    // react-scrollspy in Sidebar NavMenu tries to read the DOM for elements before
    // Page component has mounted. So use Redux to flag when Page is mounted and then
    // let react-scrollspy render (bool value passed as prop 'pageMounted' to Sidebar )
    this.props.changePageMountedStatus(true);
  }

  render () {
    const post = this.props.data.markdownRemark
    return (
      <div className="page">
        <h1>
          {post.frontmatter.title}
        </h1>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Page)

export const query = graphql`
  query PageQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`
