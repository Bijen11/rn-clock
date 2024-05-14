import {
  View,
  Animated,
  Platform,
  StatusBar,
  StyleSheet,
  Dimensions,
} from 'react-native';
import React from 'react';
import 'react-native-reanimated';

import dayjs from 'dayjs';

const {width} = Dimensions.get('screen');

const SIZE = Platform.OS === 'web' ? width * 0.5 : width * 0.9;
const TICK_INTERVAL = 1000;

export default class RootLayout extends React.Component {
  state = {
    index: new Animated.Value(0),
    tick: new Animated.Value(0),
    scales: [...Array(6).keys()].map(() => new Animated.Value(0)),
  };

  _timer = 0;
  _ticker: any = null;

  componentDidMount(): void {
    const current = dayjs();
    const diff = current.endOf('day').diff(current, 'seconds');

    const oneDay = 24 * 60 * 60;
    this._timer = oneDay - diff;
    this.state.tick.setValue(this._timer);
    this.state.index.setValue(this._timer - 30);

    this._animate();

    this._ticker = setInterval(() => {
      this._timer += 1;
      this.state.tick.setValue(this._timer);
    }, TICK_INTERVAL);
  }

  _animate = () => {
    const scaleStaggerAnimation = this.state.scales.map((animated) => {
      return Animated.spring(animated, {
        toValue: 1,
        tension: 18,
        friction: 3,
        useNativeDriver: true,
      });
    });

    Animated.parallel([
      Animated.stagger(
        TICK_INTERVAL / this.state.scales.length,
        scaleStaggerAnimation,
      ),

      Animated.timing(this.state.index, {
        toValue: this.state.tick,
        duration: TICK_INTERVAL / 2,
        useNativeDriver: true,
      }),
    ]).start();
  };

  render() {
    const {
      index,
      scales: [
        smallQuadranScale,
        mediumQuadranScale,
        bigQuadranScale,
        secondScale,
        minuteScale,
        hourScale,
      ],
    } = this.state;

    const interpolated = {
      inputRange: [0, 360],
      outputRange: ['0deg', '360deg'],
    };

    const secondDegrees = Animated.multiply(index, 6);
    const transformSeconds = {
      transform: [
        {rotate: secondDegrees.interpolate(interpolated)},
        {scale: secondScale},
      ],
    };

    const rotateMinutes = Animated.divide(
      secondDegrees,
      new Animated.Value(60),
    );
    const transformMinutes = {
      transform: [
        {rotate: rotateMinutes.interpolate(interpolated)},
        {scale: minuteScale},
      ],
    };

    const rotateHours = Animated.divide(rotateMinutes, new Animated.Value(12));
    const transformHours = {
      transform: [
        {rotate: rotateHours.interpolate(interpolated)},
        {scale: hourScale},
      ],
    };

    return (
      <View style={style.container}>
        <StatusBar hidden={true} />

        <Animated.View
          style={[style.bigQuadran, {transform: [{scale: bigQuadranScale}]}]}
        />
        <Animated.View
          style={[
            style.mediumQuadran,
            {transform: [{scale: mediumQuadranScale}]},
          ]}
        />

        <Animated.View style={[style.mover, transformHours]}>
          <View style={[style.hours]} />
        </Animated.View>

        <Animated.View style={[style.mover, transformMinutes]}>
          <View style={[style.minutes]} />
        </Animated.View>

        <Animated.View style={[style.mover, transformSeconds]}>
          <View style={[style.seconds]} />
        </Animated.View>

        <Animated.View
          style={[
            style.smallQuadran,
            {transform: [{scale: smallQuadranScale}]},
          ]}
        />
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  mover: {
    width: SIZE,
    height: SIZE,
    position: 'absolute',
    alignItems: 'center',
    borderRadius: SIZE / 2,
    justifyContent: 'flex-start',
  },
  hours: {
    width: 4,
    height: '35%',
    borderRadius: 4,
    marginTop: '15%',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  minutes: {
    width: 3,
    height: '45%',
    borderRadius: 3,
    marginTop: '5%',
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  seconds: {
    width: 2,
    height: '50%',
    borderRadius: 2,
    backgroundColor: 'rgba(277,71,134,1)',
  },
  bigQuadran: {
    width: SIZE * 0.8,
    height: SIZE * 0.8,
    position: 'absolute',
    borderRadius: SIZE * 0.4,
    backgroundColor: 'rgba(200,200,200,0.2)',
  },
  mediumQuadran: {
    width: SIZE * 0.5,
    height: SIZE * 0.5,
    position: 'absolute',
    borderRadius: SIZE * 0.25,
    backgroundColor: 'rgba(200,200,200,0.4)',
  },
  smallQuadran: {
    width: 10,
    height: 10,
    borderRadius: 5,
    position: 'absolute',
    backgroundColor: 'rgba(277,71,134,1)',
  },
});
