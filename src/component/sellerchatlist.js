import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
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
import { getSellerChat } from "../api/helper";
import { Base_URL_IMAGE } from "../api/constants";
import { SearchBar, ListItem } from "react-native-elements";
import { StackActions } from "react-navigation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const Sellerchat = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [userlist, setUserList] = useState([]);
  const [loginUserId, setLoginUserId] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [messageLength, setMessageLength] = useState(null);
  const [messages, setMessages] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    getChat();
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      handleBackButton
    );
    return () => {
      backHandler.remove();
    };
  }, []);

  const handleBackButton = () => {
    this.props.navigation.goBack();
    return true; // Return true to prevent default back button behavior
  };

  const getChat = async () => {
    getSellerChat()
      .then((response) => response.json())
      .then((responseJson) => {
        setUserList(responseJson);
        const chatRoomsCollection = firebase
          .firestore()
          .collection("chat_rooms");

        const unsubscribe = chatRoomsCollection.onSnapshot((snapshot) => {
          let messageFinal = [];
          snapshot.docs.forEach((doc) => {
            const data = doc.data();
            const { nanoseconds, seconds } = data.updated_at;
            const date = new Date(seconds * 1000 + nanoseconds / 1000000);
            messageFinal.push({
              _id: data.id,
              text: data.last_message,
              createdAt: date,
              status: data.status,
              user: {
                _id: data.sender_id,
              },
            });
          });
          let sortArray = [];
          for (let message of responseJson) {
            let beforeSorting = [];
            let count = 0;
            messageFinal.forEach((ele, index) => {
              if (
                message.seller.firebase_user_uid +
                  message.buyer.firebase_user_uid ===
                ele._id
              ) {
                beforeSorting.push(ele);
              }
              if (messageFinal.length === index + 1) {
                sortArray.push(beforeSorting, [count]);
              }
            });
          }
          sortArray.forEach((ele, index) => {
            ele = ele.sort((a, b) => {
              const dateA = new Date(a.createdAt);
              const dateB = new Date(b.createdAt);

              if (dateA.toLocaleDateString() === dateB.toLocaleDateString()) {
                const timeA = dateA.toLocaleTimeString();
                const timeB = dateB.toLocaleTimeString();
                return timeB.localeCompare(timeA);
              } else {
                const today = new Date();
                const yesterday = new Date(today);
                yesterday.setDate(today.getDate() - 1);

                if (dateA.toLocaleDateString() === today.toLocaleDateString()) {
                  return -1;
                } else if (
                  dateB.toLocaleDateString() === today.toLocaleDateString()
                ) {
                  return 1;
                } else if (
                  dateA.toLocaleDateString() === yesterday.toLocaleDateString()
                ) {
                  return -1;
                } else if (
                  dateB.toLocaleDateString() === yesterday.toLocaleDateString()
                ) {
                  return 1;
                } else {
                  return dateA - dateB;
                }
              }
            });
          });
          setMessages(sortArray);
        });

        return () => unsubscribe();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const searchOnChange = (text) => {
    setSearchValue(text);
    const filteredData = filterdata.filter(
      (user) =>
        user.buyer.first_name.toLowerCase() +
        user.buyer.last_name.toLowerCase().includes(text.toLowerCase())
    );
    setUserList(filteredData);
  };

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("Chatpage", {
          deal_id: item.deal_details.id,
          trip_id: item.trip.id,
          buyer_id: item.buyer.id,
          seller_id: item.seller.id,
          matching_id: item.match,
          status: item.status,
          seller_page: true,
          rowid: item.id,
          seller_price: item.seller_price,
          buyer_price: item.buyer_price,
          match_id: item.seller.firebase_user_uid,
          create_id: item.buyer.firebase_user_uid,
          match_image: item.buyer.profile_picture,
          match_name: item.buyer.first_name + " " + item.buyer.last_name,
          create_image: item.buyer.profile_picture,
          create_name: item.buyer.first_name + item.buyer.last_name,
        })
      }
    >
      <ListItem bottomDivider containerStyle={styles.listItemContainer}>
        <Image
          source={{ uri: Base_URL_IMAGE + item.buyer.profile_picture }}
          style={styles.avatar}
        />
        <ListItem.Content>
          <ListItem.Title>
            {item.buyer.first_name} {item.buyer.last_name}
          </ListItem.Title>
          <ListItem.Subtitle style={{ color: "gray" }}>
            {messages.length > 0
              ? messages[0].length > 0 && messages[0][0].text
              : null}
          </ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={"#298ccf"} />
      <Header onPress={() => navigation.goBack()} isHide={true} />
      <View>
        <Text
          style={{
            alignSelf: "center",
            color: "white",
            fontSize: 28,
            marginTop: hp(-16),
          }}
        >
          Seller Chats
        </Text>
      </View>
      <View style={{ padding: wp("2%"), borderBottomColor: "white" }}>
        <SearchBar
          placeholder="Search contacts..."
          value={searchValue}
          onChangeText={(text) => searchOnChange(text)}
          containerStyle={styles.searchBar}
        />
        <FlatList
          data={userlist}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
      {/* Add other UI components or actions as needed */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
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

export default Sellerchat;