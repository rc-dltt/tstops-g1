import { React, useState, useEffect } from 'react';
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
import { DataTable } from 'react-native-paper';
import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import {
    allRaceQuery,
    allHorseQuery,
    //raceByNoQuery,
    //loginQuery
} from './query';

const LandingPage = () => {
    const isDarkMode = useColorScheme() === 'dark';
    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    //Query States
    const [raceNo, setRaceNo] = useState('');
    const [raceDataResult, setRaceDataResult] = useState([]);
    const [horseDataResult, setHorseDataResult] = useState([]);

    //Mutation States
    const [raceNoInput, setRaceNoInput] = useState('');
    const [raceTimeInput, setRaceTimeInput] = useState('');
    const [raceVenueInput, setRaceVenueInput] = useState('');
    // const [addHorse, setAddHorse] = useState([]);
    // const [enrollHorse, setEnrollHorse] = useState([]);
    // const [loginDetails, setLoginDetails] = useQuery([]);

    //Event States
    const [submitAddRace, setSubmitAddRace] = useState(false);

    //Queries
    const { loading: raceDataLoading, error: raceDataError, data: raceData } = useQuery(allRaceQuery);
    const { loading: horseDataLoading, error: horseDataError, data: horseData } = useQuery(allHorseQuery);
    // const { raceDataLoading, raceDataError, raceData } = useLazyQuery(getRaceByNo, {
    //     variables: { no: parseInt(raceNo) }, skip: !buttonPressed
    // });

    //Mutations
    // const [addRace, { addRaceLoading, addRaceError, addRaceData }] = useMutation(addRaceMutation);

    //Use Effects
    //All Race
    useEffect(() => {
        if (!raceDataLoading && raceData.races.length > 0) {
        setRaceDataResult(raceData.races);
        }
        
    }, [raceData]);

    //All Horse
    useEffect(() => {
        if (!horseDataLoading && horseData.horses.length > 0) {
            setHorseDataResult(horseData.horses);
        }
    }, [horseData]);

    // if (raceDataLoading) return <Text>Loading...</Text>;
    // if (raceDataError) return <Text>Error </Text>;

    //Event Handlers
    // const handleRaceNoChange = (text) => {
    //     setRaceNo(text);
    // };
    const handleRaceNoInputChange = (input) => {
        setRaceNoInput(input);
    };
    const handleRaceTimeInputChange = (input) => {
        setRaceNoInput(input);
    };
    const handleRaceVenueInputChange = (input) => {
        setRaceNoInput(input);
    };

    const handleSubmitAddRace = () => {
        addRace({ variables: { no: raceNoInput, startTime: raceTimeInput, venue: raceVenueInput } })
        // setSubmitAddRace(true);
    };

    //Table Component - Races Query
    const TableRaces = () => {
        return (
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title >Race No.</DataTable.Title>
                    <DataTable.Title >Start Time</DataTable.Title>
                    <DataTable.Title >Venue</DataTable.Title>
                </DataTable.Header>

                {raceDataResult.length > 0 ? (
                raceDataResult.map((item) => {
                    return (
                    <DataTable.Row key={item.key}>
                        <DataTable.Cell>{item.no}</DataTable.Cell>
                        <DataTable.Cell >{item.startTime}</DataTable.Cell>
                        <DataTable.Cell >{item.venue}</DataTable.Cell>
                    </DataTable.Row>
                )})
                ):""}
            </DataTable>
        );
    };

    //Table Component - Horses Query
    const TableHorses = () => {
        return (
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title >Horse Name</DataTable.Title>
                    <DataTable.Title >Horse Rank</DataTable.Title>
                </DataTable.Header>
                {horseDataResult.length > 0 ? (
                horseDataResult.map((item) => {
                    return (
                    <DataTable.Row key={item.key}>
                        <DataTable.Cell>{item.name}</DataTable.Cell>
                        <DataTable.Cell >{item.rank}</DataTable.Cell>
                    </DataTable.Row>
                )})
                ):""}
            </DataTable>
        );
    };

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
                    <Section title="Query - All Races" isDarkMode={isDarkMode}>
                        Details of all races.
                        
                    </Section>
                    
                </View>
                <TableRaces />
                <View
                    style={{
                        backgroundColor: isDarkMode ? Colors.black : Colors.white,
                    }}>
                    <Section title="Query - All Horses" isDarkMode={isDarkMode}>
                        Details of all horses.
                    </Section>
                </View>
                <TableHorses />
                {/* <View
                    style={{
                        backgroundColor: isDarkMode ? Colors.black : Colors.white,
                    }}>
                    <Section title="Query - Login" isDarkMode={isDarkMode}>
                        Login Details.
                        <TableHorses />
                    </Section>
                </View> */}
                {/* <TextInput
                    style={styles.input}
                    onChangeText={handleRaceNoChange}
                    value={raceNo}
                    placeholder="Enter Race Number"
                    keyboardType="number-pad"
                />
                <Button title="Search" onPress={handleSearch} /> */}
                {/* <View style={{
                    backgroundColor: isDarkMode ? Colors.black : Colors.white,
                }}>
                    <Section title="Mutation - Add Race" isDarkMode={isDarkMode}>

                    </Section>
                </View>
                <TextInput
                    style={styles.input}
                    onChangeText={handleRaceNoInputChange}
                    value={raceNoInput}
                    placeholder="Enter Race Number"
                    keyboardType="number-pad"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={handleRaceTimeInputChange}
                    value={raceTimeInput}
                    placeholder="Enter Race Start Time"
                    keyboardType="number-pad"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={handleRaceVenueInputChange}
                    value={raceVenuInput}
                    placeholder="Enter Race Venue"
                    keyboardType="number-pad"
                />
                <Button title="Search" onPress={handleSubmitAddRace} />
                <View style={{
                    backgroundColor: isDarkMode ? Colors.black : Colors.white,
                }}>
                    <Section title="Mutation - Add Horse" isDarkMode={isDarkMode}>

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
                    <Section title="Mutation - Enroll Horse" isDarkMode={isDarkMode}>

                    </Section>
                </View>
                <TextInput
                    style={styles.input}
                    onChangeText={handleRaceNoChange}
                    value={raceNo}
                    placeholder="Enter Race Number"
                    keyboardType="number-pad"
                />
                <Button title="Search" onPress={handleSearch} /> */}
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

// Styling
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
