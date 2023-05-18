import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  FlatList,
  Dimensions,
  TouchableOpacity,
  BackHandler,
  Share,
  Picker,
} from "react-native";
const { width: WIDTH } = Dimensions.get("window");
// import { CheckBox } from 'react-native-elements'
import { ScrollView } from "react-native-gesture-handler";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import GradientButton from "../utils/GradientButton";
import { StackActions } from "react-navigation";
export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      img: "",
      Posts: [],
    };
  }

  handleBackButton = () => {
    //add your code
    this.props.navigation.goBack();
    return true; // Return true to prevent default back button behavior
  };

  componentWillMount() {
    this.backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButton
    );
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }

  componentDidMount = async () => {
    const { navigation } = this.props;
    this.focusListener = navigation.addListener("didFocus", () => {});
  };

  renderPosts = ({ item }) => {
    return (
      <View style={{ marginTop: 5 }}>
        <ImageBackground
          source={{
            uri: `http://spot.tradingdevelopmentsystem.com/${item.file}`,
          }}
          style={{ width: "100%", height: 300 }}
        >
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate("Spotdetails", { POSTID: item.id })
            }
            style={styles.block1}
          >
            <View style={{ flexDirection: "row" }}>
              <View style={{ width: "22%", flexDirection: "row" }}>
                {item.userimg == null || item.userimg == "" ? (
                  <Image
                    style={{ width: 70, height: 70 }}
                    source={require("../../assets/images/icon/userimg.png")}
                  />
                ) : (
                  <Image
                    style={{ width: 55, height: 55, borderRadius: 50 }}
                    source={{
                      uri:
                        "http://spot.tradingdevelopmentsystem.com/" +
                        item.userimg,
                    }}
                  />
                )}
              </View>
              <View style={{ width: "65%" }}>
                <Text
                  style={{
                    margin: 5,
                    color: "#000000",
                    fontWeight: "bold",
                    fontSize: 20,
                    marginTop: 10,
                  }}
                >
                  {item.username}
                </Text>
                <Text
                  numberOfLines={2}
                  style={{
                    margin: 5,
                    color: "#A1A2A8",
                    fontSize: 13,
                    marginTop: 5,
                    marginLeft: 9,
                  }}
                >
                  {item.description}
                </Text>
              </View>
              <View style={{ width: "18%" }}>
                <Image
                  style={{
                    width: 45,
                    height: 60,
                    marginTop: -40,
                    marginLeft: -20,
                  }}
                  source={{ uri: item.icon }}
                />
              </View>
            </View>

            <View
              style={{ flexDirection: "row", marginLeft: 80, marginTop: 10 }}
            >
              <View style={{ width: "28%", flexDirection: "row" }}>
                <Image
                  style={{ width: 20, height: 20, marginTop: 4 }}
                  source={require("../../assets/images/icon/comment.png")}
                />
                <Text
                  style={{
                    margin: 5,
                    color: "#A1A2A8",
                    fontSize: 12,
                    marginTop: 5,
                    marginLeft: 9,
                    fontWeight: "bold",
                  }}
                >
                  {item.comments}
                </Text>
              </View>
              <View style={{ width: "28%", flexDirection: "row" }}>
                <Image
                  style={{ width: 20, height: 20, marginTop: 2 }}
                  source={require("../../assets/images/icon/like.png")}
                />
                <Text
                  style={{
                    margin: 5,
                    color: "#A1A2A8",
                    fontSize: 12,
                    marginTop: 5,
                    marginLeft: 9,
                    fontWeight: "bold",
                  }}
                >
                  {item.likes}
                </Text>
              </View>
              <View style={{ width: "28%", flexDirection: "row" }}>
                <Image
                  style={{ width: 25, height: 25 }}
                  source={require("../../assets/images/icon/share.png")}
                />
                <Text
                  style={{
                    margin: 5,
                    color: "#A1A2A8",
                    fontSize: 12,
                    marginTop: 5,
                    marginLeft: 9,
                    fontWeight: "bold",
                  }}
                >
                  {item.share}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </ImageBackground>
      </View>
    );
  };

  render() {
    const { ischecked } = this.props;
    return (
      <View style={styles.container}>
        <View style={{ marginTop: wp("10%") }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View
              style={{
                flexDirection: "row",
                borderBottomColor: "#E8E8E8",
                borderBottomWidth: 1,
              }}
            >
              <TouchableOpacity style={{ width: "37%", marginTop: 6 }}>
                {/* <Image style={styles.back} source={require('../../assets/images/icon/back.png')} /> */}
              </TouchableOpacity>
              <View style={{ width: "40%", marginLeft: 10, marginRight: 10 }}>
                <View>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "bold",
                      marginTop: 10,
                      marginBottom: 10,
                    }}
                  >
                    PROFILE
                  </Text>
                </View>
              </View>
            </View>

            <View
              style={{
                marginTop: wp("0%"),
                alignContent: "center",
                alignItems: "center",
              }}
            >
              <ImageBackground
                source={require("../../assets/images/cover.jpg")}
                style={{ width: "100%", height: 200, borderRadius: 30 }}
              >
                {this.state.img == null || this.state.img == "null" ? (
                  <Image
                    style={{
                      width: 150,
                      height: 150,
                      alignSelf: "center",
                      marginTop: 100,
                      borderWidth: 5,
                      borderColor: "white",
                      borderRadius: 300,
                    }}
                    source={require("../../assets/images/icon/profileimg.png")}
                  ></Image>
                ) : (
                  <Image
                    style={{
                      width: 150,
                      height: 150,
                      alignSelf: "center",
                      marginTop: 100,
                      borderWidth: 5,
                      borderColor: "white",
                      borderRadius: 300,
                    }}
                    source={{
                      uri:
                        "http://spot.tradingdevelopmentsystem.com/" +
                        this.state.img,
                    }}
                  ></Image>
                )}
              </ImageBackground>
              <Text
                style={{
                  textAlign: "center",
                  marginTop: 60,
                  fontSize: 25,
                  fontWeight: "bold",
                  color: "#000000",
                }}
              >
                {this.state.name}
              </Text>
              <Text
                style={{ textAlign: "center", fontSize: 18, color: "#8f92a1" }}
              >
                {this.state.email}
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  paddingLeft: 20,
                  paddingRight: 20,
                }}
              >
                <View style={{ width: "70%", margin: 10 }}>
                  <GradientButton
                    onPress={() => this.props.navigation.navigate("Chatlist")}
                    text={"Message"}
                    color1={"#2145FE"}
                    color2={"#2145FE"}
                    marginTop={0}
                    borderRadius={10}
                    width={240}
                    height={40}
                  />
                  {/* <GradientButton
                                        style={{ marginVertical: 8., alignSelf: 'center', marginLeft: 70 }}
                                        text="Message"
                                        textStyle={{ fontSize: 17 }}
                                        gradientBegin="#2145FE"
                                        gradientEnd="#2145FE"
                                        gradientDirection="diagonal"
                                        height={40}
                                        width={240}
                                        radius={10}
                                        impact
                                        impactStyle='Light'
                                        onPressAction={() => this.props.navigation.navigate('Chatlist')}
                                    /> */}
                </View>

                <View style={{ width: "30%", margin: 10 }}>
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate("editprofile")
                    }
                  >
                    <Image
                      style={{
                        width: 50,
                        height: 50,
                        alignSelf: "center",
                        marginTop: 3,
                      }}
                      source={require("../../assets/images/icon/storybutton.png")}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <FlatList
                data={this.state.Posts}
                renderItem={this.renderPosts}
                keyExtractor={(item) => item.id}
              />
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },

  back: {
    width: 30,
    height: 30,
    marginBottom: wp("5%"),
    marginLeft: 20,
    marginTop: 10,
  },

  block1: {
    backgroundColor: "white",
    margin: 20,
    height: 150,
    borderRadius: 20,
    marginTop: 125,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    padding: 10,
  },
});
