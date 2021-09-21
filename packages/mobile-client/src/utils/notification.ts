import * as Notifications from 'expo-notifications'

export async function getExpoDeviceToken(): Promise<string> {
  const token = (
    await Notifications.getExpoPushTokenAsync({
      experienceId: ''
    })
  ).data
  return token
}

export async function hasNotificationEnabled(): Promise<boolean> {
  const { status: existingStatus } = await Notifications.getPermissionsAsync()
  return existingStatus === 'granted' ? true : false
}

export async function requestNotificationPermission(): Promise<boolean> {
  let notificationIsAuthorized = false
  if (!(await hasNotificationEnabled())) {
    const { status } = await Notifications.requestPermissionsAsync()
    if (status === 'granted') {
      notificationIsAuthorized = true
    }
  } else {
    notificationIsAuthorized = true
  }
  return notificationIsAuthorized
}
