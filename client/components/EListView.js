import React, { Component } from 'react'
import {
  Text,
  ListView
} from 'react-native'

import FirebaseAPI from '../include/firebaseAPI'
var firebaseAPI = new FirebaseAPI()

export default class EListView extends Component {
  constructor (props) {
    super(props)
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      datasource: this.props.datasource,
      listData: ds.cloneWithRows(['Default List row, no data'])
    }
  }

  componentDidMount () {
    let _this = this
    this.updateListDataSource()
    firebaseAPI.addObserver('datasources_updated', _this.updateListDataSource.bind(_this))
  }

  updateListDataSource () {
    if (this.props.datasource) {
      if (firebaseAPI.dataSources[this.props.datasource]) {
        this.setState({
          listData: this.state.listData.cloneWithRows(firebaseAPI.dataSources[this.props.datasource])
        })
      }
    }
  }

  render () {
    return (
      <ListView
        dataSource={this.state.listData}
        renderRow={(rowData) => <Text>{rowData}</Text>}
      />
    )
  }
}
