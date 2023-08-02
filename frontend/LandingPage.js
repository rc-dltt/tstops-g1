/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { React, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TextInput,
  Button
} from 'react-native';

import { useQuery } from 'react-apollo';

import {
  Colors
} from 'react-native/Libraries/NewAppScreen';

import { getRaceByNo } from './query';

// import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

// const client = new ApolloClient({
//   uri: 'https://example.com/graphql',
//   cache: new InMemoryCache(),
// });

const LandingPage = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const [raceNo, setRaceNo] = useState('');
  const [buttonPressed, setButtonPressed] = useState(false);
  const [raceDataResult, setRaceDataResult] = useState({});
  // const [raceDataLoading, setRaceDataLoading] = useState(false);
  // const [raceDataError, setRaceDataError] = useState(false);
  
  const handleRaceNoChange = (text) => {
    setRaceNo(text);
  };
  
  // const { raceDataLoading, raceDataError, raceData } = useQuery(getRaceByNo, {
  //   variables: { no: parseInt(raceNo) }, skip: !buttonPressed});

  const handleSearch = () => {
    setButtonPressed(true);
  };

  // useEffect(() => {
  //   if (raceData && raceData.races && raceData.length > 0) {
  //     const returnData = raceData.races[0];
  //     setRaceDataResult(returnData);
  //   }
  // }, [raceData]);

  // if (raceDataLoading) return <Text>Loading...</Text>;
  // if (raceDataError) return <Text>Error </Text>;
  
  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Query" isDarkMode={isDarkMode}>
            Search Race Details by Race Number.
          </Section>
        </View>
        <TextInput
              style={styles.input}
              onChangeText={handleRaceNoChange}
              value={raceNo}
              placeholder="Enter Race Number"
              keyboardType="number-pad"
            />
            <Button title="Search" onPress={handleSearch} />
        <View style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
        <Section title="Mutation" isDarkMode={isDarkMode}>
            
            </Section>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const Section = (props) => {

  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: props.isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {props.title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: props.isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {props.children}
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default LandingPage;
