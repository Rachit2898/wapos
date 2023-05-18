import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  FlatList,
  BackHandler,
} from "react-native";
const { width: WIDTH } = Dimensions.get("window");
import * as firebase from "firebase";
import { ScrollView } from "react-native-gesture-handler";
import Header from "../utils/Header";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { getBuyerChat } from "../api/helper";
import { Base_URL_IMAGE } from "../api/constants";
import { SearchBar, ListItem } from "react-native-elements";
import { StackActions } from "react-navigation";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default class Buyerchat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: "",
      Password: "",
      userlist: [],
      LOGINUSERID: "",
      searchvalue: "",
      messagelength: null,
      messages: [],
      filterdata: [],
    };
  }
  componentDidMount() {
    this.getChat();
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  }handleBackButton = () => {
  
    //add your code

    this.props.navigation.goBack();
    return true;
  };
  getChat = async () => {
    this.setState({
      LOGINUSERID: await AsyncStorage.getItem("currentUserFirebaseID"),
    });
    getBuyerChat()
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ userlist: responseJson, filterdata: responseJson });
        const chatRoomsCollection = firebase
          .firestore()
          .collection("chat_rooms");

        // Attach an event listener for real-time updates
        const unsubscribe = chatRoomsCollection.onSnapshot((snapshot) => {
          let message_final = [];
          snapshot.docs.map((doc) => {
            const data = doc.data();
            const { nanoseconds, seconds } = data.updated_at;
            const date = new Date(seconds * 1000 + nanoseconds / 1000000);
            message_final.push({
              _id: data.id,
              text: data.last_message,
              createdAt: date,
              status: data.status,
              user: {
                _id: data.sender_id,
              },
            });
          });
          let sortarray = [];
          for (let message of responseJson) {
            let beforesorting = [];
            let count = 0;
            message_final.forEach((ele, index) => {
              if (
                message.seller.firebase_user_uid +
                  message.buyer.firebase_user_uid ==
                ele._id
              ) {
                if (
                  ele.sender_id != this.state.LOGINUSERID &&
                  ele.status == "sent"
                ) {
                  count = count + 1;
                }
                beforesorting.push(ele);
              }
              if (message_final.length == index + 1) {
                sortarray.push(beforesorting, [count]);
              }
            });
          }
          sortarray.forEach((ele, index) => {
            ele = ele.sort((a, b) => {
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
          });
          this.setState({ messages: sortarray });
        });

        return () => unsubscribe();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  SearchOnChange(text) {
    this.setState({ searchvalue: text });
    const filteredData = this.state.filterdata.filter((user) =>
      (
        user.seller.first_name.toLowerCase() +
        user.seller.last_name.toLowerCase()
      ).includes(text.toLowerCase())
    );
    this.setState({ userlist: filteredData });
  }
  renderItem = ({ item, index }) => (
    <TouchableOpacity
      onPress={() =>
        this.props.navigation.navigate("Chatpage", {
          deal_id: this.state.userlist[index].deal_details.id,
          trip_id: this.state.userlist[index].trip.id,
          buyer_id: this.state.userlist[index].buyer.id,
          seller_id: this.state.userlist[index].seller.id,
          matching_id: this.state.userlist[index].match,
          status: this.state.userlist[index].status,
          seller_page: false,
          seller_price: this.state.userlist[index].seller_price,
          buyer_price: this.state.userlist[index].buyer_price,
          match_id: this.state.userlist[index].seller.firebase_user_uid,
          create_id: this.state.userlist[index].buyer.firebase_user_uid,
          match_image: this.state.userlist[index].seller.profile_picture,
          match_name:
            this.state.userlist[index].seller.first_name +
            this.state.userlist[index].seller.last_name,
          create_image: this.state.userlist[index].buyer.profile_picture,
          create_name:
            this.state.userlist[index].buyer.first_name +
            this.state.userlist[index].seller.last_name,
        })
      }
    >
      <ListItem bottomDivider containerStyle={styles.listItemContainer}>
        <Image
          source={{ uri: Base_URL_IMAGE + item.seller.profile_picture }}
          style={styles.avatar}
        />
        <ListItem.Content>
          <ListItem.Title>
            {item.seller.first_name} {item.seller.last_name}
          </ListItem.Title>
          <ListItem.Subtitle style={{ color: "gray" }}>
            {this.state.messages.length > 0
              ? this.state.messages[0].length > 0 &&
                this.state.messages[0][0].text
              : null}
          </ListItem.Subtitle>
        </ListItem.Content>
        {/* <Badge status="success" value={this.state.messages.length>0?this.state.messages[1][0]:0} /> */}
      </ListItem>
    </TouchableOpacity>
  );

  render() {
    return (
      <View style={styles.container}>
        <Header
          onPress={() => this.props.navigation.navigate("Search")}
          isHide={true}
        />
        <View>
          <Text
            style={{
              alignSelf: "center",
              color: "white",
              fontSize: 28,
              marginTop: hp(-16),
            }}
          >
            Buyer Chats
          </Text>
        </View>
        <View style={{ padding: wp("2%"), borderBottomColor: "white" }}>
          <SearchBar
            placeholder="Search buyers..."
            value={this.state.searchvalue}
            onChangeText={(newText) => this.SearchOnChange(newText)}
            containerStyle={styles.searchBar}
          />
          <FlatList
            data={this.state.userlist}
            renderItem={this.renderItem}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
        {/* Add other UI components or actions as needed */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  searchBar: {
    backgroundColor: "white",
    borderBottomColor: "white",
    borderTopColor: "white",
  },
  logo: {
    width: 180,
    height: 20,
    marginBottom: wp("10%"),
    marginTop: 12,
  },
  imgpicker: {
    width: 290,
    height: 130,
    alignSelf: "center",
    marginTop: 20,
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
    width: 50,
    height: 50,
    marginTop: -10,
    borderRadius: 30,
    marginLeft: 10,
    marginBottom: 10,
  },
  dot: {
    width: 25,
    height: 10,
    marginTop: wp("2%"),
    marginLeft: 5,
  },
  listItemContainer: {
    backgroundColor: "white",
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
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
