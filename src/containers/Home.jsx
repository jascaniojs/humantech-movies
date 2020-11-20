import React from 'react';
import { connect } from 'react-redux';
import Search from '../components/Search';
import '../assets/styles/App.scss';

const Home = ({ myList, trends, originals }) => {
  //const initialState = useInitialState(API);
  return (
    <>
      <Search isHome />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    myList: state.myList,
    trends: state.trends,
    originals: state.originals,
  };
};

export default connect(mapStateToProps, null)(Home);
