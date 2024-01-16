/* global firebase */
/**
   * Here is is the code snippet to initialize Firebase Messaging in the Service
   * Worker when your app is not hosted on Firebase Hosting.

  // Give the service worker access to Firebase Messaging.
  // Note that you can only use Firebase Messaging here. Other Firebase libraries
  // are not available in the service worker.

    **/
self.importScripts('https://www.gstatic.com/firebasejs/9.2.0/firebase-app-compat.js')
self.importScripts('https://www.gstatic.com/firebasejs/9.2.0/firebase-messaging-compat.js')

firebase.initializeApp({
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: 'fcm-test-b3e8c.firebaseapp.com',
  projectId: 'fcm-test-b3e8c',
  storageBucket: 'fcm-test-b3e8c.appspot.com',
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
})

// // Retrieve an instance of Firebase Messaging so that it can handle background
// // messages.
const messaging = firebase.messaging()

self.addEventListener('install', function (e) {
  console.log('fcm sw install..')
  self.skipWaiting()
})

self.addEventListener('activate', function (e) {
  console.log('fcm sw activate..')
})

self.addEventListener('push', function (e) {
  console.log('push: ', e.data.json())
  if (!e.data.json()) return

  const resultData = e.data.json().notification
  const notificationTitle = resultData.title
  const notificationOptions = {
    body: resultData.body,
    icon: resultData.image,
    tag: resultData.tag,
    ...resultData,
  }
  console.log('push: ', { resultData, notificationTitle, notificationOptions })

  self.registration.showNotification(notificationTitle, notificationOptions)
})

self.addEventListener('notificationclick', function (event) {
  console.log('notification click')
  const url = '/'
  event.notification.close()
  event.waitUntil(self.clients.openWindow(url))
})

messaging.onBackgroundMessage(function (payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload)
  // Customize notification here
  const notificationTitle = 'Background Message Title'
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/firebase-logo.png',
  }

  self.registration.showNotification(notificationTitle, notificationOptions)
})
