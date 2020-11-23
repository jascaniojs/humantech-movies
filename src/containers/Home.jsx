import React, { useState } from 'react';
import { connect } from 'react-redux';
import { generate } from 'shortid';
import Button from '@material-ui/core/Button';

import sketchPosenet from '../sketchs/sketchPosenet';
import p5Wrapper from '../components/P5comp';

import '../assets/styles/App.scss';

const P5Wrapper1 = p5Wrapper(generate());

const Home = ({ myList, trends, originals }) => {
  //const initialState = useInitialState(API);
  const [recording, toogleRecording] = useState(false);
  return (
    <>
      <P5Wrapper1 sketch={sketchPosenet} record={recording} />
      <Button color='primary' onClick={() => toogleRecording(!recording)}>
        {recording ? 'Grabar' : 'Grabar'}
      </Button>
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
