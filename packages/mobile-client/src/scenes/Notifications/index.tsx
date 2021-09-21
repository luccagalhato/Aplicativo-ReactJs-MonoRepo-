import { Switch } from '@ant-design/react-native'
import { useTheme } from '@react-navigation/native'
import React, { useState, useEffect } from 'react'

import { Dimensions, Text, View } from 'react-native'
import { useService } from 'app/contexts/Service'
import { changeEmailNotification, changeSMSNotification } from 'app/service/client.api'

const Notifications = () => {
  const { colors } = useTheme()

  const { width } = Dimensions.get('window')

  const { clientApi } = useService()

  const [emailNotification, setEmailNotification] = useState(true)
  const [smsNotification, setSmsNotification] = useState(true)

  useEffect(() => {
    changeEmailNotification(clientApi)(!emailNotification)
  }, [emailNotification])

  useEffect(() => {
    changeSMSNotification(clientApi)(!smsNotification)
  }, [smsNotification])

  return <View
    style={{
      flex: 1,
      flexDirection: 'column',
      backgroundColor: colors.card,
    }}
  >
    <View
      style={{
        width: width * 0.92,
        height: 60,
        marginStart: 15,
        paddingStart: 15,
        flexDirection: 'row',
        borderBottomColor: "#EFF0EF",
        borderBottomWidth: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 25,
      }}
    >
      <Text style={{
        fontSize: 16,
        fontFamily: 'Sora',
      }}>Email</Text>
      <Switch
        checked={emailNotification}
        onChange={() => setEmailNotification(!emailNotification)}
      />
    </View>
    <View
      style={{
        width: width * 0.92,
        height: 60,
        marginStart: 15,
        paddingStart: 15,
        flexDirection: 'row',
        borderBottomColor: "#EFF0EF",
        borderBottomWidth: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 25,
      }}
    >
      <Text style={{
        fontSize: 16,
        fontFamily: 'Sora',
      }}>SMS</Text>
      <Switch
        checked={smsNotification}
        onChange={() => setSmsNotification(!smsNotification)}
      />
    </View>
  </View>
}

export default Notifications;



