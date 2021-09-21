import React from 'react'
import { View, Text, StatusBar, Image, TouchableOpacity } from 'react-native'
import { Icon } from '@ant-design/react-native'
import { useNavigation } from '@react-navigation/core'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useTheme } from '@react-navigation/native'
import { IconFill } from '@ant-design/icons-react-native'

interface HeaderProps {
  title?: string
  option?: boolean
}

const HeaderRestaurant = ({ title, option = true }: HeaderProps) => {
  const navigation = useNavigation()
  const { colors } = useTheme()
  const insets = useSafeAreaInsets()

  function handleBack() {
    navigation.goBack()
  }

  function handleInfo() {
    navigation.navigate('RestaurantInfo')
  }

  return (
    <>
      {option ? (
        <>
          <StatusBar barStyle="dark-content" />
          <View
            style={{
              flexDirection: 'column',
              backgroundColor: 'white',
              borderBottomWidth: 1,
              borderBottomColor: '#DDD',
              paddingBottom: 20,
              paddingTop: insets.top
            }}
          >
            {/* <Image
              source={require("assets/bannerRestaurante.png")}
              style={{
                top: 0,
                right: 0,
                left: 0,
                width: "100%",
                height: 200,
                resizeMode: "cover",
                borderBottomLeftRadius: 25,
                borderBottomRightRadius: 25,
              }}
            /> */}
            <Icon
              name="arrow-left"
              onPress={handleBack}
              style={{
                color: '#41A550',
                fontSize: 24,
                padding: 12,
                left: 30,
                top: 40,
                marginLeft: -15,
                backgroundColor: '#FFF',
                borderRadius: 100,
                position: 'absolute'
              }}
            />
            <Image
              source={{
                uri: 'https://www.abcdacomunicacao.com.br/wp-content/uploads/McDonalds_Logo-Preto-CCXP.jpeg'
              }}
              style={{
                top: -25,
                right: 0,
                left: 20,
                width: 50,
                height: 50,
                resizeMode: 'cover',
                borderRadius: 100,
                borderWidth: 2,
                borderColor: '#FFF'
              }}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: 'Sora-SemiBold',
                  lineHeight: 28,
                  left: 20,
                  color: '#252725'
                }}
              >
                Nome da Loja
              </Text>
              <Text
                style={{
                  fontSize: 10,
                  fontFamily: 'Sora-SemiBold',
                  lineHeight: 15,
                  right: 20,
                  color: '#41A550'
                }}
                onPress={handleInfo}
              >
                Mais informações
              </Text>
            </View>
            <Text
              style={{
                fontSize: 12,
                fontFamily: 'Roboto-Regular',
                lineHeight: 20,
                left: 20,
                color: '#575C57'
              }}
            >
              $$ - Categoria da loja
            </Text>
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingTop: 10
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    left: 20,
                    backgroundColor: '#EDF9ED',
                    paddingHorizontal: 10
                  }}
                >
                  <Icon
                    name="clock-circle"
                    style={{
                      color: '#41A550',
                      fontSize: 12
                    }}
                  />
                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: 'Sora',
                      lineHeight: 28,
                      color: '#252725',
                      paddingLeft: 5
                    }}
                  >
                    00min
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    left: 20,
                    backgroundColor: '#EDF9ED',
                    paddingHorizontal: 10,
                    marginLeft: 10
                  }}
                >
                  <IconFill
                    name="star"
                    style={{
                      color: '#41A550',
                      fontSize: 12
                    }}
                  />
                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: 'Sora',
                      lineHeight: 28,
                      color: '#252725',
                      paddingLeft: 5
                    }}
                  >
                    5.0
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    left: 20,
                    backgroundColor: '#EDF9ED',
                    paddingHorizontal: 10,
                    marginLeft: 10
                  }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: 'Sora',
                      lineHeight: 28,
                      color: '#252725',
                      paddingLeft: 5
                    }}
                  >
                    R$00,00
                  </Text>
                </View>
              </View>
              <TouchableOpacity onPress={() => navigation.navigate('Search')}>
                <View
                  style={{
                    backgroundColor: '#41A550',
                    padding: 10,
                    borderRadius: 100,
                    right: 20
                  }}
                >
                  <Image
                    source={require('assets/Search.png')}
                    style={{ resizeMode: 'center', tintColor: '#FFF' }}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </>
      ) : (
        <>
          <StatusBar barStyle="dark-content" />
          <View
            style={{
              flexDirection: 'column',
              backgroundColor: 'white',
              borderBottomWidth: 1,
              paddingTop: insets.top,
              borderBottomColor: '#DDD',
              paddingBottom: 20
            }}
          >
            <Icon
              name="arrow-left"
              onPress={handleBack}
              style={{
                color: '#41A550',
                fontSize: 24,
                padding: 12,
                left: 30,
                marginLeft: -15,
                backgroundColor: '#FFF',
                borderRadius: 100
              }}
            />
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image
                source={{
                  uri: 'https://www.abcdacomunicacao.com.br/wp-content/uploads/McDonalds_Logo-Preto-CCXP.jpeg'
                }}
                style={{
                  right: 0,
                  left: 20,
                  width: 50,
                  height: 50,
                  resizeMode: 'cover',
                  borderRadius: 100,
                  borderWidth: 2,
                  borderColor: '#FFF'
                }}
              />
              <View style={{ flexDirection: 'column' }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontFamily: 'Sora-SemiBold',
                    lineHeight: 28,
                    paddingLeft: 30,
                    color: '#252725'
                  }}
                >
                  Nome da Loja
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: 'Roboto-Regular',
                    lineHeight: 20,
                    paddingLeft: 30,
                    color: '#575C57'
                  }}
                >
                  $$ - Categoria da loja
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingTop: 10
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  left: 20,
                  backgroundColor: '#EDF9ED',
                  paddingHorizontal: 10
                }}
              >
                <Icon
                  name="clock-circle"
                  style={{
                    color: '#41A550',
                    fontSize: 12
                  }}
                />
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: 'Sora',
                    lineHeight: 28,
                    color: '#252725',
                    paddingLeft: 5
                  }}
                >
                  00min
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  left: 20,
                  backgroundColor: '#EDF9ED',
                  paddingHorizontal: 10,
                  marginLeft: 10
                }}
              >
                <IconFill
                  name="star"
                  style={{
                    color: '#41A550',
                    fontSize: 12
                  }}
                />
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: 'Sora',
                    lineHeight: 28,
                    color: '#252725',
                    paddingLeft: 5
                  }}
                >
                  5.0
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  left: 20,
                  backgroundColor: '#EDF9ED',
                  paddingHorizontal: 10,
                  marginLeft: 10
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: 'Sora',
                    lineHeight: 28,
                    color: '#252725',
                    paddingLeft: 5
                  }}
                >
                  R$00,00
                </Text>
              </View>
            </View>
          </View>
        </>
      )}
    </>
  )
}

export default HeaderRestaurant
