import React, { createRef, useCallback, useEffect, useRef, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Animated
} from 'react-native';
import { Dimensions } from 'react-native';
import { Line } from 'react-native-svg';
import Svg from 'react-native-svg';
const styles = StyleSheet.create({
  dot: {
    width: 20,
    height: 20,
    backgroundColor: 'white',
    borderRadius: 40,
    position: 'absolute',
    elevation: 110,
    shadowColor: 'white',
    shadowRadius: 1111,
    shadowOpacity: 0.8,
    shadowOffset: {
      width: 11,
      height: 11
    },
    marginLeft: -10,
    marginTop: -10
  }
});

const maxHeigth = Dimensions.get('window').height - 50;
const maxWidth = Dimensions.get('window').width - 50;

const App = () => {

  const [balls, setBalls] = useState([]);
  const [lines, setLines] = useState([]);
  const x = useRef([]);
  const y = useRef([]);
  const xx = useRef([]);
  const yy = useRef([]);
  //const animatedBackground = useRef(new Animated.Value('rgba(1,1,1,1)')).current

  const Gen = (max) => Math.floor(Math.random() * max)

  const getCoordRef = (value) => {
    return new Animated.Value(value);
  }

  const DotComponent = ({ posx, posy }) => {
    let shiftX = posx + 10;
    let shiftY = posy + 10;
    return (
      <Animated.View style={[styles.dot, { left: posx, top: posy }]} />
    )
  }

  const count = 10;


  const getBalls = useCallback(() => {
    const arrayOfBalls = [];
    const arrayOfLines = [];
    for (let i = 0; i < count; i++) {

      let refX = getCoordRef(Gen(maxWidth));
      let refY = getCoordRef(Gen(maxHeigth));
      x.current[i] = refX;
      y.current[i] = refY;
      arrayOfBalls.push(
        <DotComponent posx={refX} posy={refY} />
      )
    }
    let c = 0;
    for (let i = 0; i < x.current.length; i++) {
      for (let j = 0; j < x.current.length; j++) {
        c++;
        if(c === 8)
        {
          arrayOfLines.push(
            <AnimatedLine  strokeWidth={3} stroke={'white'} fill={'grey'} width={222} x1={x.current[i]} x2={x.current[j]} y1={y.current[i]} y2={y.current[j]} style={{elevation: 60,
              shadowColor: 'white',
              shadowRadius: 1111,
              elevation: 90,
              shadowOpacity: 1,
              shadowOffset: {
                width: 11,
                height: 11
              },}} ></AnimatedLine>
          )
          c = 0;
        }  
      }
    }

    setLines(arrayOfLines);
    setBalls(arrayOfBalls);
  }, [count])

  const animateX = (target, toValue) => {
    Animated.timing(target, {
      toValue: Gen(maxWidth),
      duration: Gen(20001),
      useNativeDriver: false
    }).start((e) => {
      animateX(target, toValue);
    })
  }
  const animateY = (target, toValue) => {
    Animated.timing(target, {
      toValue: Gen(maxHeigth),
      duration: Gen(20001),
      useNativeDriver: false
    }).start((e) => {
      animateY(target, toValue);
    })
  }

  useEffect(() => {
    getBalls();
    x.current.forEach(element => {
      animateX(element, Gen(maxWidth))
    });
    y.current.forEach(element => {
      animateY(element, Gen(maxHeigth))
    });

  }, [])

  useEffect(() => {
    console.log(x.current[1])
  }, [x.current[1]])
  const AnimatedLine = Animated.createAnimatedComponent(Line);
  const lineRef = useRef(null)
  return (
    <Animated.View style={{ backgroundColor: 'black', flex: 1, opacity: 0.85 }}>
      {balls}
      <Svg >
        {lines}
      </Svg>
    </Animated.View>
  );
};

export default App;


