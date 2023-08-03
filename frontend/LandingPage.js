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
import { useQuery, useMutation } from '@apollo/client';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    allRaceQuery,
    allHorseQuery
} from './query';
import {
    addRaceMutation,
    addHorseMutation,
    enrollHorseMutation,
    loginMutation
} from './mutation';

const LandingPage = () => {

    // Theme
    const isDarkMode = useColorScheme() === 'dark';
    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    ////////////////////////////// Queries //////////////////////////////////

    const { loading: raceDataLoading, data: raceData, refetch: refetchRaces } = useQuery(allRaceQuery);
    const { loading: horseDataLoading, data: horseData, refetch: refetchHorses } = useQuery(allHorseQuery);

    // Query Init States
    const [raceDataResult, setRaceDataResult] = useState([]);
    const [horseDataResult, setHorseDataResult] = useState([]);

    ///////////////////////////// Mutations /////////////////////////////////

    const [login, {data}] = useMutation(loginMutation);
    const [addRace] = useMutation(addRaceMutation);
    const [addHorse] = useMutation(addHorseMutation);
    const [enrollHorse] = useMutation(enrollHorseMutation);

    // Mutation Init States
    const [emailInput, setEmailInput] = useState('johndoe@email.com');
    const [passwordInput, setPasswordInput] = useState('pAsSWoRd!');
    const [loginSuccess, setLoginSuccess] = useState(false);

    const [raceNoInput, setRaceNoInput] = useState('');
    const [raceTimeInput, setRaceTimeInput] = useState('');
    const [raceVenueInput, setRaceVenueInput] = useState('');
    const [addRaceSuccess, setAddRaceSuccess] = useState(false);

    const [horseNameInput, setHorseNameInput] = useState('');
    const [horseRankInput, setHorseRankInput] = useState('');
    const [addHorseSuccess, setAddHorseSuccess] = useState(false);

    const [raceIdInput, setRaceIdInput] = useState('');
    const [horseIdInput, setHorseIdInput] = useState('');
    const [enrollHorseSuccess, setEnrollHorseSuccess] = useState(false);

    //////////////////////////////// Use Effects //////////////////////////////////
    // Login - Token
    useEffect(() => {
        if (data?.login) {
            AsyncStorage.setItem('token', data.login);
            setLoginSuccess(true);
        } else {
            setLoginSuccess(false);
        }
      }, [data]);

    // All Race
    useEffect(() => {
        if (!raceDataLoading && raceData && raceData.races.length > 0) {
            setRaceDataResult(raceData.races);
        }
    }, [raceData]);

    // All Race Refetch
    useEffect(() => {
        if (addRaceSuccess || enrollHorseSuccess || loginSuccess) {
            refetchRaces();
            if (addRaceSuccess) {
                addRaceRefetchSuccess();
            }
            if (enrollHorseSuccess) {
                enrollHorseRefetchSuccess();
            }
        }
    }, [addRaceSuccess, enrollHorseSuccess]);

    // All Horse
    useEffect(() => {
        if (!horseDataLoading && horseData && horseData.horses.length > 0) {
            setHorseDataResult(horseData.horses);
        }
    }, [horseData]);

    // All Horse Refetch
    useEffect(() => {
        if (addHorseSuccess || loginSuccess) {
            refetchHorses();
            addHorseRefetchSuccess();
        }
    }, [addHorseSuccess]);

    //////////////////////////////// Event Handlers //////////////////////////////////

    // Login Input Change
    const handleEmailInputChange = (input) => {
        setEmailInput(input);
    };
    const handlePasswordInputChange = (input) => {
        setPasswordInput(input);
    };

    // Add Race Input Change
    const handleRaceNoInputChange = (input) => {
        setRaceNoInput(input);
    };
    const handleRaceTimeInputChange = (input) => {
        setRaceTimeInput(input);
    };
    const handleRaceVenueInputChange = (input) => {
        setRaceVenueInput(input);
    };

    // Add Horse Input Change
    const handleHorseNameInputChange = (input) => {
        setHorseNameInput(input);
    };
    const handleHorseRankInputChange = (input) => {
        setHorseRankInput(input);
    };

    // Eroll Horse Input Change
    const handleRaceIdInputChange = (input) => {
        setRaceIdInput(input);
    };
    const handleHorseIdInputChange = (input) => {
        setHorseIdInput(input);
    };

    // Data Refetch
    const addRaceRefetchSuccess = () => {
        setAddRaceSuccess(false)
    };
    const addHorseRefetchSuccess = () => {
        setAddHorseSuccess(false)
    };
    const enrollHorseRefetchSuccess = () => {
        setEnrollHorseSuccess(false)
    };

    ///////////////////////////// Event Submit Handlers ///////////////////////////////////

    // Login
    const handleSubmitLogin = (e) => {
        e.preventDefault();
        if (emailInput !== "" && passwordInput !== "") {
            login({
                variables: {
                    email: emailInput,
                    password: passwordInput
                }
            })
        } else {
            return
        }
    };

    // Add Race
    const handleSubmitAddRace = (e) => {
        e.preventDefault();
        if (raceNoInput !== "" && raceTimeInput !== "" && raceVenueInput !== "") {
            addRace({
                variables: {
                    command: {
                        no: Number(raceNoInput),
                        startTime: raceTimeInput,
                        venue: raceVenueInput
                    }
                }
            })
            setAddRaceSuccess(true);
        } else {
            return
        }
    };

    // Add Horse
    const handleSubmitAddHorse = (e) => {
        e.preventDefault();
        if (horseNameInput !== "" && horseRankInput !== "") {
            addHorse({
                variables: {
                    command: {
                        name: (horseNameInput),
                        rank: Number(horseRankInput)
                    }
                }
            })
            setAddHorseSuccess(true);
        } else {
            return
        }
    };

    // Enroll Horse
    const handleSubmitEnrollHorse = (e) => {
        e.preventDefault();
        if (raceIdInput !== "" && horseIdInput !== "") {
            enrollHorse({
                variables: {
                    command: {
                        race: (raceIdInput),
                        horse: (horseIdInput)
                    }
                }
            })
            setEnrollHorseSuccess(true);
        } else {
            return
        }
    };

    ///////////////////////////// Table Component ////////////////////////////////////////

    // Races Query
    const TableRaces = () => {
        return (
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title >Race ID</DataTable.Title>
                    <DataTable.Title >Race No.</DataTable.Title>
                    <DataTable.Title >Start Time</DataTable.Title>
                    <DataTable.Title >Venue</DataTable.Title>
                </DataTable.Header>

                {loginSuccess && raceDataResult.length > 0 ? (
                    raceDataResult.map((item, i) => {
                        return (
                            <DataTable.Row key={i}>
                                <DataTable.Cell>{item.id}</DataTable.Cell>
                                <DataTable.Cell>{item.no}</DataTable.Cell>
                                <DataTable.Cell >{item.startTime}</DataTable.Cell>
                                <DataTable.Cell >{item.venue}</DataTable.Cell>
                            </DataTable.Row>
                        )
                    })
                ) : ""}
            </DataTable>
        );
    };

    // Horses Query
    const TableHorses = () => {
        return (
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title >Horse ID</DataTable.Title>
                    <DataTable.Title >Horse Name</DataTable.Title>
                    <DataTable.Title >Horse Rank</DataTable.Title>
                </DataTable.Header>
                {loginSuccess && horseDataResult.length > 0 ? (
                    horseDataResult.map((item, i) => {
                        return (
                            <DataTable.Row key={i}>
                                <DataTable.Cell>{item.id}</DataTable.Cell>
                                <DataTable.Cell>{item.name}</DataTable.Cell>
                                <DataTable.Cell >{item.rank}</DataTable.Cell>
                            </DataTable.Row>
                        )
                    })
                ) : ""}
            </DataTable>
        );
    };

    /////////////////////////////////// Render ///////////////////////////////////////

    return (
        <SafeAreaView style={backgroundStyle}>
            <StatusBar
                barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                backgroundColor={backgroundStyle.backgroundColor}
            />
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                style={backgroundStyle}>

                {/* Login - JWT */}

                <View style={{
                    backgroundColor: isDarkMode ? Colors.black : Colors.white,
                }}>
                    <Section title="Login - JWT" isDarkMode={isDarkMode}>
                        Input Login Email and Password to Login.
                    </Section>
                </View>
                <TextInput
                    style={styles.input}
                    onChangeText={handleEmailInputChange}
                    value={emailInput}
                    placeholder="Enter Login Email"
                    keyboardType="default"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={handlePasswordInputChange}
                    value={passwordInput}
                    placeholder="Enter Login Password"
                    keyboardType="default"
                />
                <Button title="Submit" onPress={handleSubmitLogin} />
                <View style={{
                    backgroundColor: isDarkMode ? Colors.black : Colors.white,
                }}>
                    {loginSuccess ? (
                        <Text>
                            Login Success
                        </Text>
                    ) : (
                        <Text>
                            Login Unsuccess
                        </Text>
                    )
                    }
                </View>

                {/* Query - All Races */}
                <View
                    style={{
                        backgroundColor: isDarkMode ? Colors.black : Colors.white,
                    }}>
                    <Section title="Query - All Races" isDarkMode={isDarkMode}>
                        Details of all races.
                    </Section>
                </View>
                <TableRaces />

                {/* Query - All Horses */}

                <View
                    style={{
                        backgroundColor: isDarkMode ? Colors.black : Colors.white,
                    }}>
                    <Section title="Query - All Horses" isDarkMode={isDarkMode}>
                        Details of all horses.
                    </Section>
                </View>
                <TableHorses />

                {/* Mutation - Add Race */}

                <View style={{
                    backgroundColor: isDarkMode ? Colors.black : Colors.white,
                }}>
                    <Section title="Mutation - Add Race" isDarkMode={isDarkMode}>
                        Input Race Number, Start Time and Venue to Add Race.
                    </Section>
                </View>
                <TextInput
                    style={styles.input}
                    onChangeText={handleRaceNoInputChange}
                    value={raceNoInput}
                    placeholder="Enter Race Number"
                    keyboardType="default"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={handleRaceTimeInputChange}
                    value={raceTimeInput}
                    placeholder="Enter Race Start Time"
                    keyboardType="default"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={handleRaceVenueInputChange}
                    value={raceVenueInput}
                    placeholder="Enter Race Venue"
                    keyboardType="default"
                />
                <Button title="Submit" onPress={handleSubmitAddRace} />

                 {/* Mutation - Add Horse */}

                <View style={{
                    backgroundColor: isDarkMode ? Colors.black : Colors.white,
                }}>
                    <Section title="Mutation - Add Horse" isDarkMode={isDarkMode}>
                        Input Horse Name and Horse Rank to Add Horse.
                    </Section>
                </View>
                <TextInput
                    style={styles.input}
                    onChangeText={handleHorseNameInputChange}
                    value={horseNameInput}
                    placeholder="Enter Horse Name"
                    keyboardType="default"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={handleHorseRankInputChange}
                    value={horseRankInput}
                    placeholder="Enter Horse Rank"
                    keyboardType="default"
                />
                <Button title="Submit" onPress={handleSubmitAddHorse} />

                 {/* Mutation - Enroll Horse */}

                <View style={{
                    backgroundColor: isDarkMode ? Colors.black : Colors.white,
                }}>
                    <Section title="Mutation - Enroll Horse" isDarkMode={isDarkMode}>
                        Input Race ID and Horse ID to Enroll Horse.
                    </Section>
                </View>
                <TextInput
                    style={styles.input}
                    onChangeText={handleRaceIdInputChange}
                    value={raceIdInput}
                    placeholder="Enter Race ID"
                    keyboardType="default"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={handleHorseIdInputChange}
                    value={horseIdInput}
                    placeholder="Enter Horse ID"
                    keyboardType="default"
                />
                <Button title="Submit" onPress={handleSubmitEnrollHorse} />
            </ScrollView>
        </SafeAreaView>
    );
};

// Section Component

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

// Styling - CSS

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
    }
});

export default LandingPage;
