import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  TouchableWithoutFeedback,
  Animated,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

function App(): JSX.Element {
  const [color, setColor] = useState('green');
  const animated = useRef(new Animated.Value(255)).current;
  const duration = 800;

  const getRandomColor = () => {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    return `rgb(${red}, ${green}, ${blue})`;
  };

  const onPress = () => {
    const randomColor = getRandomColor();
    setColor(randomColor);
  };

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animated, {
          toValue: 150,
          duration: duration,
          useNativeDriver: true,
        }),
        Animated.timing(animated, {
          toValue: 255,
          duration: duration,
          useNativeDriver: true,
        }),
        Animated.delay(1000),
      ]),
    ).start();
  }, [animated, duration]);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={onPress}>
        <Animated.View style={[{transform: [{translateY: animated}]}]}>
          <View style={[styles.element, {backgroundColor: color}]} />
        </Animated.View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}
export default App;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  element: {
    width: 150,
    height: 200,
    borderRadius: 12,
  },
});
