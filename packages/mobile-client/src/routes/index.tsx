import React from 'react'
import { View } from 'react-native'
import { ActivityIndicator } from '@ant-design/react-native'
import { StatusBar } from 'expo-status-bar'
import { SwipeablePanel } from 'rn-swipeable-panel'

import { useAuth } from '../contexts/Auth'
import { useFilters } from '../contexts/Filters'
import AuthRoutes from './auth.routes'
import AppRoutes from './app.routes'
import Filters from '../common/components/Filters'

const Routes = () => {
  const { signed, loading } = useAuth()
  const { openFiltersBox, toggleFiltersBox } = useFilters()

  const DEFAULT_SWIPABLE_PANEL_PROPS = {
    fullWidth: true,
    openLarge: true,
    showCloseButton: false,
    closeOnTouchOutside: true,
    onClose: () => toggleFiltersBox(false)
  }

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#666" />
      </View>
    )
  }

  return !signed ? (
    <>
      <AuthRoutes />
      <StatusBar style="dark" />
    </>
  ) : (
    <>
      <AppRoutes />
      <SwipeablePanel
        {...DEFAULT_SWIPABLE_PANEL_PROPS}
        isActive={openFiltersBox}
        scrollViewProps={{
          nestedScrollEnabled: false,
          scrollEnabled: false
        }}
      >
        <Filters />
      </SwipeablePanel>
      <StatusBar style="dark" />
    </>
  )
}

export default Routes
