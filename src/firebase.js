import { initializeApp, getApps, getApp } from 'firebase/app'
import {
    getMessaging,
    getToken,
    onMessage,
    isSupported,
} from 'firebase/messaging'
import { getAuth } from 'firebase/auth'

// 1. ضع مفاتيحك هنا
const firebaseConfig = {
    apiKey: "AIzaSyB7vbX_k_JQrSbAqWGoLxWQqnI-I4F8p7w",
    authDomain: "projectappearn.firebaseapp.com",
    projectId: "projectappearn",
    storageBucket: "projectappearn.firebasestorage.app",
    messagingSenderId: "583029975018",
    appId: "1:583029975018:web:254848468664287378f493",
    measurementId: "G-4B9NV6R4Z6"
}
const firebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const messaging = (async () => {
    try {
        const isSupportedBrowser = await isSupported()
        if (isSupportedBrowser) {
            return getMessaging(firebaseApp)
        }

        return null
    } catch (err) {
        return null
    }
})()

export const fetchToken = async (setFcmToken) => {
    return getToken(await messaging, {
        // 2. أحضر هذا المفتاح من إعدادات Firebase Cloud Messaging
        vapidKey:
            'zFjmw8j3b5fZcW7UPbPO1q3lTkZVCm7wT7vvY8Z7VV9G9dMXo3q-V11sGA2TqTWedxEb76YaIyANecntidmw9', 
    })
        .then((currentToken) => {
            if (currentToken) {
                setFcmToken(currentToken)
            } else {
                setFcmToken()
            }
        })
        .catch((err) => {
            console.error(err)
        })
}

export const onMessageListener = async () =>
    new Promise((resolve) =>
        (async () => {
            const messagingResolve = await messaging
            onMessage(messagingResolve, (payload) => {
                resolve(payload)
            })
        })()
    )
export const auth = getAuth(firebaseApp)