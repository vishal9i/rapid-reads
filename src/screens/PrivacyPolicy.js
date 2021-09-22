import React,{useState} from 'react'
import { StyleSheet,Text, View } from 'react-native';
import { Modal} from 'react-native-paper';
const PrivacyPolicy = () => {
    const [modalOpen, setModalOpen] = useState(false);
    // const showModal = () => setVisible(true);
    // const hideModal = () => setVisible(false);
    // const containerStyle = {backgroundColor: 'white', padding: 20};
  
    return (
          <Modal visible={modalOpen}>
              <View style={styles.modalcontent}>
            <Text>This Privacy Policy describe how Wiley
                collects and uses the personal information you
                provide to Wiley. It also describes the choices
                available to you regarding our use of your
                personal information and how you can access
                and update this information.

                This Privacy Policy describes how Wiley
                collects and uses the personal information you
                provide to Wiley.
            </Text>
            </View>
          </Modal>
          
     
     
    );
  };
export default PrivacyPolicy

const styles = StyleSheet.create({

})
