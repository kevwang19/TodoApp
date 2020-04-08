import React, {Fragment, Component} from 'react';
import {
  Platform,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  RefreshControl,
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
Icon.loadFont();


class App extends Component {
  constructor(props){
    super(props)
    this.state = {

    }
  }

  componentDidMount() {

  }

  render () {
    const styles = StyleSheet.create({
      border: {
        backgroundColor: '#7171da',
        justifyContent: 'center',
        height: '100%'
      },
      main: {
        margin: 30,
        marginTop: 60,
        padding: 30,
        backgroundColor: '#ffffff',
        borderRadius: 20
      },
      section1: {
        flexDirection: 'row'
      }
    })

    return (
      <Fragment>
        <View style={styles.border}>
          <View style={styles.main}>
            <View style={styles.section1}>
              <Text>Date</Text>
              <TouchableOpacity><Icon name='plus-circle' size={40} color='#7171da'/></TouchableOpacity>
            </View>
            <View style={styles.section2}>
            </View>
            <View style={styles.section3}>
            </View>
          </View>
        </View>
      </Fragment>
    )
  }
}

export default App;
