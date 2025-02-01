import React from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useWarmUpBrowser } from "../hooks/useWarmUpBrowser";
import * as WebBrowser from "expo-web-browser";
import { useOAuth } from "@clerk/clerk-expo";
import LottieView from 'lottie-react-native';

// Import the local image and Lottie animation
import googleIcon from '../assets/images/image.png'; // Adjust the path according to your project structure
import animation from '../assets/animations/animation.json'; // Adjust the path to your Lottie JSON file

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
    useWarmUpBrowser();
    const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

    const onPress = React.useCallback(async () => {
        try {
            const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow();

            if (createdSessionId) {
                setActive({ session: createdSessionId });
            } else {
                // Use signIn or signUp for next steps such as MFA
            }
        } catch (err) {
            console.error("OAuth error", err);
        }
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.qout}>
                The expert in anything was once a beginner.
            </Text>
            <Text style={styles.bot}>
                Engineers
            </Text>  
            <Text style={styles.t1}>
                Build the Impossible</Text>
            <LottieView 
                source={animation} 
                autoPlay 
                loop 
                style={styles.lottie}
            />
            <TouchableOpacity style={styles.btn} onPress={onPress}>
                <View style={styles.iconWrapper}>
                    <Image
                        source={googleIcon}
                        style={styles.googleIcon}
                    />
                </View>
                <Text style={styles.btnText}>
                    Continue with Google
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30,
    },
    lottie: {
        width: 395,
        height: 450,
        position: 'absolute',
        top: '25%',
    },
    btn: {
        backgroundColor: 'white',
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: 'blue', 
        borderWidth: 1, 
        borderRadius: 50,
        marginTop: 20, 
        top:'60%'
    },
    qout: {
        fontFamily: 'open-bl',
        fontSize: 35,
        color: '#57026F',
        marginBottom: 10,
        bottom:'25%'
    },
    t1: {
        top:'20%',
        color: '#301934',
    },
    bot: {
        fontFamily: 'open-bol', // Adjust font family as needed
        fontSize: 50,
        top:'20%',
        color: '#301934',
    },
    iconWrapper: {
        backgroundColor: 'white',
        padding: 5,
        borderRadius: 5,
        marginRight: 10,
    },
    googleIcon: {
        width: 20,
        height: 20,
    },
    btnText: {
        fontFamily: 'open-bl',
        textAlign: 'center',
        color: 'black',
    },
});
