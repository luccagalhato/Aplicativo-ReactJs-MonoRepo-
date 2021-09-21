import React, { useState } from "react";
import { View, Text, StyleSheet, Modal, Pressable, Alert } from "react-native";
import { Icon } from "@ant-design/react-native";
import { useEffect } from "react";

interface ModalProps {
  visible: boolean;
}

const ModalApp = ({ visible }: ModalProps) => {
  const [modalVisible, setModalVisible] = useState(visible);

  useEffect(() => {
    Alert.alert(visible.toString());
    setModalVisible(visible);
  }, [visible]);

  return (
    <Modal
      animationType="slide"
      transparent
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Icon
            name="info-circle"
            style={{
              color: "#41A550",
              fontSize: 32,
              padding: 16,
            }}
          />
          <Text style={styles.modalTitle}>Pedido cancelado</Text>
          <Text style={styles.modalText}>
            Você pode revisar o seu pedido e fazer a compra quando quiser.
          </Text>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.textStyle}>Voltar para a cesta</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 30,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#41A550",
  },
  textStyle: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    fontFamily: "Roboto-Medium",
    marginHorizontal: 20,
  },
  modalText: {
    marginBottom: 30,
    fontSize: 16,
    fontFamily: "Sora",
    lineHeight: 22,
    textAlign: "center",
    color: "#575C57",
  },
  modalTitle: {
    marginBottom: 15,
    fontSize: 18,
    fontFamily: "Sora-SemiBold",
    lineHeight: 24,
    textAlign: "center",
  },
});

export default ModalApp;
