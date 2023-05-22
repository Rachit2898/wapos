import React from "react";
import { GiftedChat, Bubble } from "react-native-gifted-chat";
import AsyncStorage from "@react-native-async-storage/async-storage";
import firebase from "firebase/app";
import "firebase/firestore";
const { width: WIDTH } = Dimensions.get("window");
const { height: Height } = Dimensions.get("screen");
import GradientButton from "../utils/GradientButton";
import {
  View,
  StyleSheet,
  Dimensions,
  BackHandler,
  StatusBar,
  TouchableOpacity,
  Image,
  Text,
  PanResponder,
  TouchableHighlightBase,
} from "react-native";
import { v4 as uuidv4 } from "uuid";
import { Base_URL_IMAGE } from "../api/constants";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Modal from "react-native-modal";
import { TextInput } from "react-native-paper";

import RangeSlider from "react-native-range-slider-expo";
import * as Notifications from "expo-notifications";
import { UpdateChatHeader } from "../api/helper";
import { StackActions } from "react-navigation";
// Notifications.se({});
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});
class Chatpage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      currentuserId: "",
      userimage: "",
      username: "",
      fromValue: "",
      toValue: "",
      receiverId: "",
      lastViewedMessage: "sent",
      expotoken: "",
      sellerwant: "",
      initialpopup: false,
      status: "",
      fromValueselect: false,
      tovalueselect: false,
    };
  }
  // to send and receive the messages with updated status
  sendstatus() {
    const messagesCollectionRef = firebase.firestore().collection("chat_rooms");
    firebase
      .firestore()
      .collection("chat_rooms")
      .get()
      .then((querySnapshot) => {
        // Access querySnapshot.docs to get the array of documents
        querySnapshot.docs.forEach((doc) => {
          const data = doc.data();
          // Access data properties here
          if (data.sender_id != this.state.currentuserId) {
            messagesCollectionRef
              .doc(doc.id)
              .update({
                status: "viewed",
              })
              .then(() => {
                // console.log("Updated")
              })
              .catch((error) => {
                // console.error('Error updating document:', error);
              });
          }
        });
      });
  }

  // Request push notification permission
  sendPushNotification = async (expoPushToken, body) => {
    const message = {
      to: expoPushToken,
      sound: "default",
      title: "New message",
      body: body,
      data: {
        /* extra data to send with the notification */
      },
    };
    const response = await fetch("https://expo.io/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Accept-Encoding": "gzip, deflate, br",
        Host: "expo.io",
        "Accept-Language": "en-US,en;q=0.9",
      },
      body: JSON.stringify(message),
    });
    const result = await response.json();
  };

  userlist() {
    const db = firebase.firestore();

    // Get a reference to the "users" collection
    const usersRef = db.collection("users");

    // Query the collection to get all documents
    usersRef
      .get()
      .then((querySnapshot) => {
        // Iterate through the query snapshot to retrieve each document data
        const usersList = [];
        querySnapshot.docs.forEach((doc) => {
          // Extract the document data and add it to the usersList array
          const user = doc.data();
          if (user.sender_id == this.state.receiverId) {
            if (user.expoPushToken != undefined) {
              this.setState({ expotoken: user.expoPushToken });
            }
          }
          usersList.push(user);
        });
      })
      .catch((error) => {
        // console.error("Error getting users list:", error);
      });
  }

  componentDidMount = async () => {
    this.setState({
      currentuserId: await AsyncStorage.getItem("currentUserFirebaseID"),
    });
    if (this.props.route.params != undefined) {
      // Update the component state based on the navigation params
      this.setState({ status: this.props.route.params.status });
      this.setState({
        fromValue: parseInt(this.props.route.params.buyer_price),
      });
      this.setState({
        toValue: parseInt(this.props.route.params.seller_price),
      });
      if (
        this.props.route.params.match_id ==
        (await AsyncStorage.getItem("currentUserFirebaseID"))
      ) {
        this.setState({
          receiverId: this.props.route.params.create_id,
        });
      } else {
        this.setState({
          receiverId: this.props.route.params.match_id,
        });
      }
      this.userlist();
    }

    const chatRoomsCollection = firebase.firestore().collection("chat_rooms");

    // Attach an event listener for real-time updates
    const unsubscribe = chatRoomsCollection.onSnapshot((snapshot) => {
      let message_final = [];
      snapshot.docs.map((doc) => {
        const data = doc.data();
        let image_url = "";
        let name = "";
        if (
          data.id ==
          this.props.route.params.match_id + this.props.route.params.create_id
        ) {
          data.participants.forEach((imageele) => {
            if (imageele.id == data.sender_id) {
              image_url = Base_URL_IMAGE + imageele.image;
              name = imageele.name;
            }
          });
          const { nanoseconds, seconds } = data.updated_at;
          const date = new Date(seconds * 1000 + nanoseconds / 1000000);
          message_final.push({
            _id: uuidv4(),
            text: data.last_message,
            createdAt: date,
            status: data.status,
            user: {
              _id: data.sender_id,
            },
          });
        }
      });
      const sortedMessages = message_final.sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);

        // Compare the dates based on their time
        if (dateA.toLocaleDateString() === dateB.toLocaleDateString()) {
          // If the messages are from the same day, compare them by time
          const timeA = dateA.toLocaleTimeString();
          const timeB = dateB.toLocaleTimeString();
          return timeB.localeCompare(timeA); // Reverse the comparison for ascending order
        } else {
          // Group messages into "today" and "yesterday" categories
          const today = new Date();
          const yesterday = new Date(today);
          yesterday.setDate(today.getDate() - 1); // Set the date to yesterday

          if (dateA.toLocaleDateString() === today.toLocaleDateString()) {
            return -1; // Sort a to a lower index if it's from today
          } else if (
            dateB.toLocaleDateString() === today.toLocaleDateString()
          ) {
            return 1; // Sort b to a lower index if it's from today
          } else if (
            dateA.toLocaleDateString() === yesterday.toLocaleDateString()
          ) {
            return -1; // Sort a to a lower index if it's from yesterday
          } else if (
            dateB.toLocaleDateString() === yesterday.toLocaleDateString()
          ) {
            return 1; // Sort b to a lower index if it's from yesterday
          } else {
            return dateA - dateB; // Sort by date if they are not from today or yesterday
          }
        }
      });
      if (
        sortedMessages.length <= 1 &&
        this.props.route.params.seller_page == true
      ) {
        this.setState({ initialpopup: true });
      }
      this.sendstatus();
      this.setState({ messages: sortedMessages });
    });

    // Clean up the event listener when the component unmounts
    return () => unsubscribe();
  };

  onSend(messages = []) {
    const currentDate = new Date();
    const currentTimeNanos = performance.now() * 1e6;

    // Get the current time in seconds using performance.now()
    const currentTimeSeconds = currentDate.getSeconds();
    const messagesCollectionRef = firebase.firestore().collection("chat_rooms");
    const newMessageData = {
      groupIcon: "",
      groupName: "",
      id: this.props.route.params.match_id + this.props.route.params.create_id,
      isGroupChat: false,
      last_message: messages[0].text,
      status: "sent",
      participants: [
        {
          id: this.props.route.params.create_id,
          image: this.props.route.params.create_image,
          name: this.props.route.params.create_name,
        },
        {
          id: this.props.route.params.match_id,
          image: this.props.route.params.match_image,
          name: this.props.route.params.match_name,
        },
      ],
      sender_id: this.state.currentuserId,
      updated_at: {
        nanoseconds: currentTimeNanos,
        seconds: currentTimeSeconds,
      },
    };
    messagesCollectionRef
      .add(newMessageData)
      .then((docRef) => {
        this.sendPushNotification(this.state.expotoken, messages[0].text);
        // Handle success, if needed
      })
      .catch((error) => {
        // console.log(error,"error")
        // Handle any errors that may occur
      });
  }
  renderTicks = (currentMessage) => {
    if (currentMessage.user._id === this.state.currentuserId) {
      // Render single tick for your outgoing messages if message is sent
      return (
        <Text
          style={{
            color: currentMessage.status == "sent" ? "lightgray" : "#34B7F1",
            fontSize: 12,
          }}
        >
          {currentMessage.status == "viewed" ? "✓✓" : "✓"}
        </Text>
      );
    } else {
      // Render nothing for incoming messages
      return null;
    }
  };

  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#41A317",
          },
          left: {
            backgroundColor: "white",
          },
        }}
        // status={"sent"}
      />
    );
  }
  renderDay = (props) => {
    const { currentMessage } = props;
    // Extract the date from the current message's `createdAt` property
    const currentMessageDate = new Date(currentMessage.createdAt);
    let currentDate = currentMessageDate.toLocaleDateString();
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1); // Set the date to yesterday

    // Check if the current message is the first message or if it's from a different day than the previous message
    if (
      !props.previousMessage ||
      currentDate !==
        new Date(props.previousMessage.createdAt).toLocaleDateString()
    ) {
      if (currentDate === today.toLocaleDateString()) {
        currentDate = "Today";
      } else if (currentDate === yesterday.toLocaleDateString()) {
        currentDate = "Yesterday";
      } else {
        currentDate = currentMessageDate.toLocaleDateString();
      }
      // Render your custom day header here
      return (
        // Replace this with your custom day header component
        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>{currentDate}</Text>
        </View>
      );
    }

    return null;
  };
  isSameDay = (currentMessage, comparisonMessage) => {
    const currentMessageDate = new Date(currentMessage.createdAt);
    const comparisonMessageDate = new Date(comparisonMessage.createdAt);

    if (
      currentMessageDate.getFullYear() ===
        comparisonMessageDate.getFullYear() &&
      currentMessageDate.getMonth() === comparisonMessageDate.getMonth() &&
      currentMessageDate.getDate() === comparisonMessageDate.getDate()
    ) {
      return true;
    }
  };
  Aggreed() {
    const deal_id = this.props.route.params.deal_id;
    const trip_id = this.props.route.params.trip_id;
    const buyer_id = this.props.route.params.buyer_id;
    const seller_id = this.props.route.params.seller_id;
    const match_id = this.props.route.params.matching_id;
    const buyer_price = parseFloat(this.state.toValue).toFixed(2);
    const rowid = this.props.route.params.rowid;
    const uid = this.props.route.params.match_id;
    const seller_price = parseFloat(this.state.toValue).toFixed(2);
    const final_price = parseFloat(this.state.toValue).toFixed(2);
    const Status = "Agreed";
    UpdateChatHeader(
      deal_id,
      trip_id,
      buyer_id,
      seller_id,
      match_id,
      buyer_price,
      uid,
      seller_price,
      final_price,
      Status,
      rowid
    )
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.message != undefined) {
          alert(responseJson.message);
          this.props.navigation.navigate("Search");
        } else {
          alert(responseJson.error);
        }
        this.setState({ modalVisible: false });
      })
      .catch((error) => {
        alert(error);
        this.setState({ modalVisible: false });
      });
  }
  fromSlider = (value) => {
    this.setState({ fromValueselect: true });
    if (!this.props.route.params.seller_page) {
      this.setState({ fromValue: value });
      const deal_id = this.props.route.params.deal_id;
      const trip_id = this.props.route.params.trip_id;
      const buyer_id = this.props.route.params.buyer_id;
      const seller_id = this.props.route.params.seller_id;
      const match_id = this.props.route.params.matching_id;
      const buyer_price = parseFloat(value).toFixed(2);
      const rowid = this.props.route.params.rowid;
      const uid = this.props.route.params.match_id;
      const seller_price = parseFloat(this.state.toValue).toFixed(2);
      const final_price = "0.00";
      const Status = "";
      UpdateChatHeader(
        deal_id,
        trip_id,
        buyer_id,
        seller_id,
        match_id,
        buyer_price,
        uid,
        seller_price,
        final_price,
        Status,
        rowid
      )
        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson.error != undefined) {
            alert(responseJson.error);
          } else {
            alert(responseJson.message);
          }
        })
        .catch((error) => {
          // console.log(error)
        });
    } else {
      this.setState({ slidervalue: this.state.toValue });
      this.setState({
        fromValue: parseInt(this.props.route.params.buyer_price),
      });
    }
  };
  ClickOk = async () => {
    const deal_id = this.props.route.params.deal_id;
    const trip_id = this.props.route.params.trip_id;
    const buyer_id = this.props.route.params.buyer_id;
    const seller_id = this.props.route.params.seller_id;
    const match_id = this.props.route.params.matching_id;
    const buyer_price = parseFloat(this.props.route.params.buyer_price).toFixed(
      2
    );
    const rowid = this.props.route.params.rowid;
    const uid = this.props.route.params.match_id;
    const seller_price = parseFloat(this.state.sellerwant).toFixed(2);
    const final_price = "0.00";
    const Status = "";
    this.setState({ toValue: this.state.sellerwant });

    UpdateChatHeader(
      deal_id,
      trip_id,
      buyer_id,
      seller_id,
      match_id,
      buyer_price,
      uid,
      seller_price,
      final_price,
      Status,
      rowid
    )
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.message != undefined) {
          alert(responseJson.message);
        }
        this.setState({ initialpopup: false });
      })
      .catch((error) => {
        alert(error);
        this.setState({ initialpopup: false });
      });
  };
  renderCustomMessage = (props) => {
    const { currentMessage } = props;

    // Customize the appearance and rendering of the message
    return (
      <View style={styles.customMessageContainer}>
        <Text style={styles.customMessageText}>{currentMessage.text}</Text>
      </View>
    );
  };
  toSlider = (value) => {
    console.log(value, this.props.route.params.seller_page);
    this.setState({ tovalueselect: true });
    if (this.props.route.params.seller_page) {
      this.setState({ toValue: value });
      const deal_id = this.props.route.params.deal_id;
      const trip_id = this.props.route.params.trip_id;
      const buyer_id = this.props.route.params.buyer_id;
      const seller_id = this.props.route.params.seller_id;
      const match_id = this.props.route.params.matching_id;
      const buyer_price = parseFloat(this.state.fromValue).toFixed(2);
      const rowid = this.props.route.params.rowid;
      const uid = this.props.route.params.match_id;
      const seller_price = parseFloat(value).toFixed(2);
      const final_price = "0.00";
      const Status = "";
      UpdateChatHeader(
        deal_id,
        trip_id,
        buyer_id,
        seller_id,
        match_id,
        buyer_price,
        uid,
        seller_price,
        final_price,
        Status,
        rowid
      )
        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson.message != undefined) {
            alert(responseJson.message);
          } else {
            alert(responseJson.error);
          }
        })
        .catch((error) => {
          // console.log(error)
        });
    } else {
      this.setState({ slidervalue: this.state.toValue });
    }
  };
  render() {
    return (
      <>
        <View style={styles.container}>
          <StatusBar backgroundColor={"#298ccf"} />
          <View
            style={{
              flexDirection: "row",
              marginTop: wp("0"),
              backgroundColor: "#298ccf",
              padding: 10,
            }}
          >
            <TouchableOpacity
              style={{ width: "20%" }}
              onPress={() => this.props.navigation.goBack()}
            >
              <Image
                style={styles.menuicon}
                source={require("../../assets/images/icon/left-arrow.png")}
              />
            </TouchableOpacity>
            <Image
              style={{
                width: 50,
                height: 50,
                borderRadius: 50,
                marginTop: wp("2%"),
              }}
              source={{
                uri: Base_URL_IMAGE + this.props.route.params?.match_image,
              }}
            />
            <Text
              style={{
                textAlign: "left",
                color: "white",
                fontSize: 25,
                marginLeft: wp("2%"),
                marginTop: wp("5%"),
              }}
            >
              {this.props.route.params?.match_name}
            </Text>
          </View>
          {this.state.status != "Agreed" ? (
            <>
              <View
                style={{ width: 310, alignSelf: "center", marginBottom: 20 }}
              >
                <Text
                  style={{
                    textAlign: "left",
                    color: "black",
                    fontSize: 18,
                    marginTop: 10,
                    marginLeft: 20,
                    marginBottom: -10,
                  }}
                >
                  suggest seller fee
                </Text>
                <RangeSlider
                  min={this.state.fromValue}
                  max={this.state.toValue}
                  fromValueOnChange={(value) => this.fromSlider(value)}
                  toValueOnChange={(value) => this.toSlider(value)}
                  inRangeBarColor={"#D9DDE6"}
                  outOfRangeBarColor={"#44c7f3"}
                  fromKnobColor={"#ffffff"}
                  toKnobColor={"#ffffff"}
                  styleSize={"small"}
                  showRangeLabels={true}
                  showValueLabels={true}
                  step={
                    (this.props.route.params?.seller_page == true &&
                      this.state.tovalueselect == true) ||
                    (this.props.route.params?.seller_page == false &&
                      this.state.fromValueselect == true)
                      ? 1
                      : (this.props.route.params?.seller_page == true &&
                          this.state.fromValueselect == true) ||
                        (this.props.route.params?.seller_page == false &&
                          this.state.tovalueselect == true)
                      ? 50
                      : 1
                  }
                />
              </View>
              <TouchableOpacity
                onPress={() => this.setState({ modalVisible: true })}
              >
                <Text
                  style={{
                    fontSize: 18,
                    color: "#ffffff",
                    marginTop: 70,
                    marginBottom: 20,
                    textAlign: "center",
                    backgroundColor: "#298ccf",
                    padding: 10,
                    width: 230,
                    borderRadius: 100,
                    alignSelf: "center",
                  }}
                >
                  You agreed to a fee!
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity
                onPress={() => this.setState({ modalVisible: true })}
              >
                <Text
                  style={{
                    fontSize: 18,
                    color: "#ffffff",
                    marginTop: 70,
                    marginBottom: 20,
                    textAlign: "center",
                    backgroundColor: "#C1E027",
                    padding: 10,
                    width: 230,
                    borderRadius: 100,
                    alignSelf: "center",
                  }}
                >
                  click here to pay {this.state.toValue}$
                </Text>
              </TouchableOpacity>
            </>
          )}
          <Modal
            hasBackdrop={true}
            backdropColor="#b2b2b2"
            backdropOpacity={0.7}
            animationType="slide"
            transparent={true}
            isVisible={this.state.modalVisible}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text
                  style={{
                    fontSize: 23,
                    color: "#44c7f3",
                    marginBottom: Height / 50,
                    textAlign: "center",
                  }}
                >
                  Seller Commission
                </Text>

                <View style={styles.col}>
                  <Text
                    style={{
                      fontSize: 25,
                      color: "#44c7f3",
                      textAlign: "center",
                      marginTop: -12,
                      fontWeight: "bold",
                    }}
                  >
                    Great !
                  </Text>
                  <Text
                    style={{
                      fontSize: 20,
                      color: "#44c7f3",
                      textAlign: "center",
                      marginTop: 5,
                    }}
                  >
                    You both agreed on a
                  </Text>
                  <Text
                    style={{
                      fontSize: 20,
                      color: "#868686",
                      textAlign: "center",
                      marginTop: 5,
                    }}
                  >
                    {this.state.toValue} sellers fee
                  </Text>

                  <View style={{ flexDirection: "row" }}>
                    <View style={{ width: "50%" }}>
                      <View>
                        <GradientButton
                          onPress={() => this.Aggreed()}
                          text={"Agreed"}
                          color1={"#838b36"}
                          color2={"#b5b355"}
                          marginTop={30}
                          borderRadius={50}
                          width={120}
                          height={40}
                        />
                      </View>
                    </View>
                    <View style={{ width: "50%" }}>
                      <View>
                        <GradientButton
                          onPress={() => this.setState({ modalVisible: false })}
                          text={"Cancel"}
                          color1={"#838b36"}
                          color2={"#b5b355"}
                          marginTop={30}
                          borderRadius={50}
                          width={120}
                          height={40}
                        />
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </Modal>
          <Modal
            hasBackdrop={true}
            backdropColor="#b2b2b2"
            backdropOpacity={0.7}
            animationType="slide"
            isVisible={this.state.initialpopup}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text
                  style={{
                    fontSize: 23,
                    color: "#44c7f3",
                    marginBottom: Height / 50,
                    textAlign: "center",
                  }}
                >
                  How much u want
                </Text>

                <View style={styles.col}>
                  <View
                    style={[
                      styles.firstInput,
                      { marginTop: 10, alignSelf: "center" },
                    ]}
                  >
                    <TextInput
                      style={styles.input}
                      placeholder={"$"}
                      value={this.state.sellerwant}
                      onChangeText={(value) =>
                        this.setState({ sellerwant: value })
                      }
                      keyboardType="decimal-pad"
                    />
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <View style={{ width: "50%" }}>
                      <View>
                        <GradientButton
                          onPress={() => this.ClickOk()}
                          text={"Ok"}
                          color1={"#838b36"}
                          color2={"#b5b355"}
                          marginTop={30}
                          borderRadius={50}
                          width={120}
                          height={40}
                        />
                      </View>
                    </View>
                    <View style={{ width: "50%" }}>
                      <View>
                        <GradientButton
                          onPress={() => this.setState({ initialpopup: false })}
                          text={"Cancel"}
                          color1={"#838b36"}
                          color2={"#b5b355"}
                          marginTop={30}
                          borderRadius={50}
                          width={120}
                          height={40}
                        />
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </Modal>
        </View>
        <View style={{ flex: 1, zIndex: -9999, marginTop: 50 }}>
          <GiftedChat
            messages={this.state.messages}
            onSend={(messages) => this.onSend(messages)}
            user={{
              _id: this.state.currentuserId,
            }}
            renderUsernameOnMessage={true}
            // renderAvatarOnTop={true}
            // showAvatarForEveryMessage={true}
            // showUserAvatar={true}
            // renderMessage={this.renderCustomMessage}
            isTyping={true}
            renderBubble={this.renderBubble}
            renderDay={this.renderDay}
            renderTicks={this.renderTicks}
            // renderMessage={props =>this.groupMessagesBysDate(props)}
          />
        </View>
      </>
    );
  }
}

export default Chatpage;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxHeight: 220,
  },
  menuicon: {
    marginTop: 20,
    width: 30,
    height: 30,
    marginLeft: 20,
  },
  logo: {
    width: 180,
    height: 20,
    marginBottom: wp("10%"),
    marginTop: 12,
  },
  dateContainer: {
    backgroundColor: "lightgray", // Set your desired background color
    borderRadius: 8,
    padding: 8,
    alignSelf: "center",
    marginBottom: 8,
    marginTop: 8,
  },
  dateText: {
    color: "black", // Set your desired text color
    fontWeight: "bold",
  },
  imgpicker: {
    width: 290,
    height: 130,
    alignSelf: "center",
    marginTop: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,

    backgroundColor: "#fffff7",
    width: "100%",
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
  search: {
    width: 40,
    height: 40,
    marginBottom: wp("10%"),
  },
  back: {
    width: 30,
    height: 30,
    marginBottom: wp("5%"),
    marginLeft: 20,
    marginTop: 10,
  },
  icon: {
    width: 40,
    height: 40,
    marginBottom: wp("10%"),
    margin: 10,
  },
  block: {
    margin: 5,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
    borderRadius: 10,
    padding: 10,
  },
  profile: {
    width: 66,
    height: 66,
    marginTop: -10,
    borderRadius: 50,
    marginLeft: 10,
    marginBottom: 10,
  },
  dot: {
    width: 25,
    height: 10,
    marginTop: wp("2%"),
    marginLeft: 5,
  },
  commentimg: {
    width: 30,
    height: 30,
    // marginBottom: wp('10%')
  },
  logintext: {
    width: 300,
    height: 130,
    marginBottom: wp("10%"),
    marginTop: wp("10%"),
  },
  headerText: {
    fontSize: 30,
    color: "white",
    alignSelf: "center",
  },
  button: {
    marginTop: hp("3%"),
    alignItems: "center",
    backgroundColor: "#E0C800",
    borderRadius: wp("2%"),
    height: 40,
    marginHorizontal: wp("13%"),
  },
  buttonText: {
    fontSize: 20,
    color: "#000",
    marginTop: hp("1%"),
  },
  signupView: {
    alignItems: "center",
    marginTop: hp("35%"),
  },
  alresdy: {
    fontSize: hp("2.5%"),
    color: "#666666",
  },
  signupText: {
    fontSize: hp("2.5%"),
    marginTop: hp("1%"),
    color: "#00cb9c",
    fontWeight: "bold",
  },
  firstInput: {
    flexDirection: "row",
    marginTop: 10,
    marginHorizontal: 25,
    backgroundColor: "#f4f4f4",
    borderRadius: 10,
    padding: 5,
  },
  firstInput1: {
    flexDirection: "row",
    marginTop: 10,
    marginHorizontal: 25,
    backgroundColor: "#f4f4f4",
    borderRadius: 10,
    padding: 5,
  },
  secondInput: {
    flexDirection: "row",
    marginBottom: 30,
    marginTop: 40,
    borderBottomColor: "#EAEAEAEA",
    borderBottomWidth: 1,
    marginHorizontal: 25,
  },
  checkboxcontainer: {
    flexDirection: "row",
    marginTop: wp("5%"),
    marginLeft: wp("5%"),
  },
  checkbox: {
    alignSelf: "center",
  },
  input: {
    width: WIDTH - 85,
    height: 40,
    padding: 10,
    marginBottom: 0,
    backgroundColor: "transparent",
    color: "black",
    fontSize: 15,
  },
  input1: {
    width: WIDTH - 85,
    height: 120,
    padding: 10,
    marginBottom: 0,
    backgroundColor: "transparent",
    color: "black",
    fontSize: 15,
  },
});
