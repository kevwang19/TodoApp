import React, {Fragment, Component} from 'react';
import {
  Platform,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Alert,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
Icon.loadFont();
import Swipeout from 'react-native-swipeout';
import RNPickerSelect from 'react-native-picker-select';
console.disableYellowBox = true;


class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      tasks: [],
      addingTask: false,
      addingTaskTime: undefined,
      addingTaskName: undefined,
    }
  }

  componentDidMount() {
    fetch("http://localhost:8000/tasks")
    .then(response => response.json())
    .then((data)=>{
      this.setState({tasks: data})
    })
  }

  markComplete = (name) => {
    const indexOfTask = this.state.tasks.findIndex((element)=> element.name === name)
    const tasks = this.state.tasks
    tasks[indexOfTask].completed = true
    this.setState({tasks: tasks})
  }

  deleteTask = (name) => {
    const indexOfTask = this.state.tasks.findIndex((element)=> element.name === name)
    const tasks = this.state.tasks
    if (indexOfTask > -1) {
      tasks.splice(indexOfTask, 1);
    }
    this.setState({tasks: tasks})
  }

  addTask = () => {
    this.setState({addingTask: true})
  }

  saveTask = () => {
    const name = this.state.addingTaskName
    const time = this.state.addingTaskTime
    if (name === undefined) {
      Alert.alert('Please enter a task name')
    } else if (time === undefined) {
      Alert.alert('Please enter a task time')
    } else {
      const taskTime = time[0] + time[1]/60
      const task = {
        name: name,
        time: taskTime,
        completed: false
      }
      const tasks = this.state.tasks
      tasks.push(task)
      tasks.sort((a, b) => parseFloat(a.time) - parseFloat(b.time))
      this.setState({tasks: tasks})
      this.setState({addingTask: false})
      this.setState({addingTaskTime: undefined})
      this.setState({addingTaskName: undefined})
    }
  }

  render () {
    const styles = StyleSheet.create({
      border: {
        backgroundColor: '#7171da',
        justifyContent: 'flex-start',
        height: '100%'
      },
      main: {
        margin: 30,
        marginTop: 60,
        padding: 30,
        backgroundColor: '#ffffff',
        borderRadius: 20,
        minHeight: '88%'
      },
      section1: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
      },
      date: {
        fontSize: 22,
        fontWeight: '700',
        color: '#7171da'
      },
      subtitle: {
        fontSize: 17,
        fontWeight: '600',
        color: '#7171da',
        marginTop: 15,
        marginBottom: 30,
      },
      taskContainer: {
        paddingTop: 20,
        paddingBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',

      },
      taskTitle: {
        fontSize: 16
      },
      taskTime: {
        fontSize: 16
      },
      taskIcon: {
        borderWidth: 1,
        borderColor: '#999999',
        borderRadius: 9,
        paddingLeft: 1,
        paddingRight: 1,
        marginRight: 10,
      },
      taskIconCompleted: {
        paddingLeft: 1,
        paddingRight: 1,
        marginRight: 10
      },
      addTaskContainer: {
        margin: 15,
        marginTop: 30,
        padding: 15,
        borderRadius: 10,
        backgroundColor: '#ffffff',
        shadowOffset: { width: 2, height: 2, },
        shadowRadius: 5,
        shadowColor: '#999999',
        shadowOpacity: 0.3,
        minHeight: 100,
      },
      saveButton: {
        backgroundColor: '#7171da',
        width: 80,
        marginTop: 30,
        margin: 10,
        borderRadius: 15,
        shadowOffset: { width: 2, height: 2, },
        shadowRadius: 6,
        shadowColor: '#999999',
        shadowOpacity: 0.3,
        alignSelf: 'center',
      },
      cancelButton: {
        backgroundColor: '#ffffff',
        width: 80,
        marginTop: 30,
        margin: 10,
        borderRadius: 15,
        shadowOffset: { width: 2, height: 2, },
        shadowRadius: 6,
        shadowColor: '#999999',
        shadowOpacity: 0.3,
        alignSelf: 'center',
      },
      saveLink: {
        fontSize: 16,
        fontWeight: '600',
        color: '#ffffff',
        padding: 4,
        textAlign: 'center',
      },
      cancelLink: {
        fontSize: 16,
        fontWeight: '600',
        color: '#7171da',
        padding: 4,
        textAlign: 'center',
      },
    })


    let today = new Date().toLocaleDateString()

    const pickerStyle = {
    	inputIOS: {
        fontSize: 16,
        color: '#000000',
        borderBottomColor: '#cccccc',
        borderBottomWidth: 1.2,
        paddingBottom: 5,
    	},
    	inputAndroid: {

    	},
    }

    const todoItems = this.state.tasks.map((task,i)=>{
      var swipeoutBtns = [
        {
          text: 'Delete',
          backgroundColor: 'red',
          onPress: ()=> {this.deleteTask(task.name)}
        }
      ]
      const apm = task.time >= 12 ? 'pm' : 'am'
      const taskHourRaw = Math.floor(task.time)
      const taskHourFormatted = Math.floor(task.time) >= 13 ? Math.floor(task.time)-12 : (Math.floor(task.time) === 0 ? 12 : Math.floor(task.time))
      const taskMin = (task.time - taskHourRaw) * 60
      const taskMinFormatted = taskMin === 0 ? '00' : taskMin
      const taskActionIcon = task.completed === true ? <Icon name='check-circle' size={18.5} color={'#009900'} style={styles.taskIconCompleted}/> : <TouchableOpacity onPress={()=> this.markComplete(task.name)}><Icon name='circle' size={16} color={'#ffffff'} style={styles.taskIcon}/></TouchableOpacity>

      return (
        <View key={i}>
          <Swipeout right={swipeoutBtns} backgroundColor='#ffffff' buttonWidth={100} autoClose={true}>
            <View style={styles.taskContainer}>
              <View style={{flexDirection: 'row'}}>
                {taskActionIcon}
                <Text style={styles.taskTitle}>{task.name}</Text>
              </View>
              <Text style={styles.taskTime}>{taskHourFormatted}:{taskMinFormatted} {apm}</Text>
            </View>
          </Swipeout>
        </View>
      )
    })

    const addTaskBox = this.state.addingTask === false ? undefined : (
      <View style={styles.addTaskContainer}>
        <TextInput onChangeText={text => this.setState({addingTaskName: text})} placeholder='Task Name' placeholderTextColor='#cccccc' style={{fontSize: 16, color: '#000000', borderBottomColor: '#cccccc', paddingBottom: 5, marginBottom: 20, marginTop: 10, borderBottomWidth: 1.2}}></TextInput>
        <RNPickerSelect
          style={pickerStyle}
          value={this.state.addingTaskTime}
          placeholder={{label: 'Select a Time'}}
          onValueChange={(value) => this.setState({addingTaskTime: value})}
          items={[
              { label: '12:00 AM', value: [0,0] },
              { label: '12:30 AM', value: [0,30] },
              { label: '1:00 AM', value: [1,0] },
              { label: '1:30 AM', value: [1,30] },
              { label: '2:00 AM', value: [2,0] },
              { label: '2:30 AM', value: [2,30] },
              { label: '3:00 AM', value: [3,0] },
              { label: '3:30 AM', value: [3,30] },
              { label: '4:00 AM', value: [4,0] },
              { label: '4:30 AM', value: [4,30] },
              { label: '5:00 AM', value: [5,0] },
              { label: '5:30 AM', value: [5,30] },
              { label: '6:00 AM', value: [6,0] },
              { label: '6:30 AM', value: [6,30] },
              { label: '7:00 AM', value: [7,0] },
              { label: '7:30 AM', value: [7,30] },
              { label: '8:00 AM', value: [8,0] },
              { label: '8:30 AM', value: [8,30] },
              { label: '9:00 AM', value: [9,0] },
              { label: '9:30 AM', value: [9,30] },
              { label: '10:00 AM', value: [10,0] },
              { label: '10:30 AM', value: [10,30] },
              { label: '11:00 AM', value: [11,0] },
              { label: '11:30 AM', value: [11,30] },
              { label: '12:00 PM', value: [12,0] },
              { label: '12:30 PM', value: [12,30] },
              { label: '1:00 PM', value: [13,0] },
              { label: '1:30 PM', value: [13,30] },
              { label: '2:00 PM', value: [14,0] },
              { label: '2:30 PM', value: [14,30] },
              { label: '3:00 PM', value: [15,0] },
              { label: '3:30 PM', value: [15,30] },
              { label: '4:00 PM', value: [16,0] },
              { label: '4:30 PM', value: [16,30] },
              { label: '5:00 PM', value: [17,0] },
              { label: '5:30 PM', value: [17,30] },
              { label: '6:00 PM', value: [18,0] },
              { label: '6:30 PM', value: [18,30] },
              { label: '7:00 PM', value: [19,0] },
              { label: '7:30 PM', value: [19,30] },
              { label: '8:00 PM', value: [20,0] },
              { label: '8:30 PM', value: [20,30] },
              { label: '9:00 PM', value: [21,0] },
              { label: '9:30 PM', value: [21,30] },
              { label: '10:00 PM', value: [22,0] },
              { label: '10:30 PM', value: [22,30] },
              { label: '11:00 PM', value: [23,0] },
              { label: '11:30 PM', value: [23,30] },
          ]}
        />
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <TouchableOpacity onPress={()=> this.saveTask()} style={styles.saveButton}><Text style={styles.saveLink}>Save</Text></TouchableOpacity>
          <TouchableOpacity onPress={()=> this.setState({addingTask: false})} style={styles.cancelButton}><Text style={styles.cancelLink}>Cancel</Text></TouchableOpacity>
        </View>
      </View>
    )

    return (
      <Fragment>
        <View style={styles.border}>
          <View style={styles.main}>
            <View style={styles.section1}>
              <Text style={styles.date}>Today is {today}</Text>
              <TouchableOpacity onPress={()=> this.addTask()}><Icon name='plus-circle' size={40} color='#7171da'/></TouchableOpacity>
            </View>
            <View style={styles.section2}>
              <Text style={styles.subtitle}>{this.state.tasks.length} tasks</Text>
            </View>
            <View style={styles.section3}>
              {todoItems}
            </View>
            <View style={styles.section4}>
              {addTaskBox}
            </View>
          </View>
        </View>
      </Fragment>
    )
  }
}

export default App;
