/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  ListView
} from 'react-native'

import FirebaseAPI from './include/firebaseAPI'
var firebaseAPI = new FirebaseAPI()

//
// var View2       = React.createFactory(React.View)
// var ScrollView2 = React.createFactory(React.ScrollView)
// var Text2       = React.createFactory(React.Text)
//
// var Wazoo = React.createElement({displayName: 'wazoo',
//   render: function () {
//     return View2({style: styles.container},
//       ScrollView2(null,
//         View2(null,
//           Text2({style: styles.welcome},
//             'Wazoo'
//           )
//         )
//       )
//     )
//   }
// })

class EList extends Component {
  constructor () {
    super()
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      dataSource: ds.cloneWithRows(['row 1', 'row 2'])
    }
  }

  render () {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={(rowData) => <Text>{rowData}</Text>}
      />
    )
  }
}

export default class evolutionR extends Component {

  constructor () {
    super()

    firebaseAPI.listenForData()

    this.state = {
      myArr: []
    }
  }

  _onPressOut (type) {
    let temp
    if (type === 'text') {
      temp = <Text>{ Date.now().toString() }</Text>
    } else if (type === 'button') {
      temp = <Button
        title={Date.now().toString()}
        onPress={() => this._onPressOut('text')} />
     }

   this.state.myArr.push(temp)
   this.setState({
       myArr: this.state.myArr
   })
   console.log('myArr', this.state.myArr)
  }



  render () {
    let Arr = this.state.myArr.map((val, i) => {
      return <View key={i} style={{ height: 40, borderBottomWidth: 2, borderBottomColor: '#ededed' }}>{ val }</View>
    })

    return (
      <View style={styles.container}>
        { Arr }
        <Button
        onPress={() => this._onPressOut('text')}
        title='ADD' />
        <Button
        onPress={() => this._onPressOut('button')}
        title='Button' />
        <EList />
      </View>
    )
  }
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
})

AppRegistry.registerComponent('evolutionR', () => evolutionR);
