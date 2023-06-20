import {StyleSheet} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootScreens} from '../navigation/RootNavigation';
import WebView from 'react-native-webview';
import LinearGradient from 'react-native-linear-gradient';
import {backgroundColor} from '../assets/colors/colors';

const AboutScreen = ({navigation}: NativeStackScreenProps<RootScreens>) => {
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={backgroundColor}
        style={styles.container}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}>
        <WebView
          originWhitelist={['*']}
          source={{html: about}}
          style={styles.webView}
          javaScriptEnabled
          domStorageEnabled
        />
      </LinearGradient>
    </SafeAreaView>
  );
};

export default AboutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webView: {
    flex: 1,
  },
});

const about = `<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>About Us</title>
    <style>
      body {
        margin: 0;
        padding: 20px;
      }

      h1 {
        text-align: center;
        margin-bottom: 20px;
      }

      p {
        margin-bottom: 10px;
      }

      .container {
        max-width: 600px;
        margin: 0 auto;
      }

      @media (max-width: 480px) {
        /* Additional styles for smaller screens */
        body {
          padding: 10px;
        }
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>About Us</h1>
      <p>
        Welcome to our app! We are a team of dedicated individuals passionate
        about providing innovative solutions to everyday problems.
      </p>
      <p>
        Our mission is to simplify your life and enhance your experience through
        cutting-edge technology.
      </p>
      <p>
        Whether you're a business owner, a student, or just someone looking to
        make their life easier, our app is designed with you in mind.
      </p>
      <p>
        Join us on this exciting journey as we revolutionize the way you work,
        learn, and connect.
      </p>
      <h2>Our Team</h2>
      <p>
        We have a diverse team of talented professionals with expertise in
        various fields. From software development to design, we have the skills
        to bring our ideas to life.
      </p>
      <p>
        Our team is committed to delivering exceptional quality and exceptional
        value to our users. We strive for excellence in everything we do.
      </p>
      <h2>Contact Us</h2>
      <p>
        If you have any questions, suggestions, or just want to say hello, we'd
        love to hear from you. You can reach us at:
      </p>
      <ul>
        <li>Email: info@example.com</li>
        <li>Phone: 123-456-7890</li>
      </ul>
    </div>
  </body>
</html>`;
