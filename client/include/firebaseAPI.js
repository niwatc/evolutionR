import * as firebase from 'firebase'

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyA-S8iI7eiEFgChxXlMEYi7LcAzO94sVI8',
  authDomain: 'graphdb-f8314.firebaseapp.com',
  databaseURL: 'https://graphdb-f8314.firebaseio.com',
  projectId: 'graphdb-f8314',
  storageBucket: 'graphdb-f8314.appspot.com',
  messagingSenderId: '149737911600'
}

firebase.initializeApp(firebaseConfig)

let instance = null

/* Singleton service to hold FireBase functions and listeners */
class FirebaseFunctions {

  constructor () {
    if (!instance) {
      instance = this

      this.observers = []
      this.storage = firebase.storage()
      this.storageRef = this.storage.ref('images')

      this.dataSources = {}
    }
    return instance
  }

  getRef () {
    return firebase.database().ref()
  }

  getRefData () {
    return this.getRef().child('data')
  }

  listenForData () {
    this.getRefData().on('value', (snapshot) => {
      console.log('listenForData', snapshot.val())
      this.dataSources = snapshot.val()
      // snap.forEach((child) => {
      //     this.tripsCache.push({
      //       title: child.val().title,
      //       googleData: child.val().googleData,
      //       image: child.val().image,
      //       city: child.val().city,
      //       locations:child.val().locations,
      //       userData: child.val().userData,
      //       nbLocationsPerTrip: this.nbLocationsPerTrip(child.val()),
      //       isMyTrip: this.isMyTrip(child.val()),
      //       key: child.key,
      //     })
      // })
      this.notifyObservers("datasources_updated", null)
    })
  }

  // listenForEdges

  // listenForNodes

  // getComponents()

  // getStyle()

  // getEvents()

  // Observer pattern
  addObserver (topic, observer) {
    this.observers[topic] || (this.observers[topic] = [])
    this.observers[topic].push(observer)
  }

  removeObserver (topic, observer) {
    if (!this.observers[topic]) {
      return
    }
    // @todo: Not really correct because it removes all observers from a topic
    delete this.observers[topic]
  }

  notifyObservers (topic, message) {
    if (!this.observers[topic]) {
      return
    }

    for (var i = this.observers[topic].length - 1; i >= 0; i--) {
      this.observers[topic][i](message)
    }
  }

}

module.exports = FirebaseFunctions
