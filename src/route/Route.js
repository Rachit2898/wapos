import Slider from "./../component/slider";
import Login from "./../component/login";
import LoginWithEmail from "./../component/loginwithemail";
import SignUp from "./../component/signup";
import SignupUser from "./../component/signupuser";
import ResetPassword from "./../component/resetPassword";
import ShopNowImg from "./../component/shopnowimg";
import Great1 from "./../component/great1";
import Great from "./../component/great";
import OTP from "./../component/OTP";
import NewPassword from "./../component/newPassword";
import SelectCategory from "./../component/selectcategory";
import ServiceDescription from "./../component/servicedescription";
import ServiceTracking from "./../component/servicetracking";
import Notification from "./../component/notification";
import OpenDealsDetail from "./../component/opendealsdetail";
import Blog from "./../component/blog";
import Createblog from "./../component/createblog";
import group from "./../component/group";
import creategroup from "./../component/creategroup";
import verified from "./../component/verified";
import events from "./../component/events";
import createevents from "./../component/createevents";
import setting from "./../component/setting";
import friends from "./../component/friends";
import menu from "./../component/menu";
import rate from "./../component/rate";
import verificationprofile from "./../component/verificationprofile";
import myinformation from "./../component/myinformation";
import automotive from "./../component/automotive";
import addautomotive from "./../component/automotive";
import chat2 from "./../component/chat2";
import createpage from "./../component/createpage";
import Search from "./../component//Search";
import createtrip from "./../component/createtrip";
import createtrip1 from "./../component/createtrip1";
import createtrip2 from "./../component/createtrip2";
import Shopnow from "./../component/shopnow";
import Shopnow1 from "./../component/shopnow1";
import Shopnow2 from "./../component/shopnow2";
import Shopnow3 from "./../component/shopnow3";
import paymentConfirm from "./../component/paymentConfirm";
import Shopnow4 from "./../component/shopnow4";
import shopfinal from "./../component/shopfinal";
import Findsellers from "./../component/findsellers";
import mychat from "./../component/mychat";
import dealshistory from "./../component/dealshistory";
import Dealshistory2 from "./../component/dealshistory2";
import Flightdetail from "./../component/flightdetail";
import OpenDeals from "./../component/opendeals";
import rating from "./../component/rating";
import updatePost from "./../component/updatePost";
import Profile from "./../component/profile";
import Editprofile from "./../component/editprofile";
import Userprofile from "./../component/userprofile";
import About from "./../component/about";
import History from "./../component/history";
import Chatlist from "./../component/chatlist";
import Chat from "./../component/chat";
import Videos from "./../component/videos";
import Offers from "./../component/offers";
import Spotdetails from "./../component/spotdetails";
import Terms from "./../component/terms";
import Privacy from "./../component/privacy";
import Addspot from "./../component/addspot";

import Help from "./../component/help";
import Faq from "./../component/faq";
import Map from "./../component/map";
import TripDetail from "./../component/tripdetail";
import Tripdetail2 from "./../component/tripdetail2";
import Tripdetail3 from "./../component/tripdetail3";
import Tripsummary from "./../component/tripsummary";
import Advancesearch from "./../component/advancesearch";
import Adisonline from "./../component/adisonline";
import Card1 from "./../component/card1";
import Card2 from "./../component/card2";

import Track from "./../component/track";
import SelectPayment from "./../component/selectPayment";
import Chat3 from "./../component/chat3";
import Deliver from "./../component/deliver";
// import sideMenu from '../route/sideMenu';
import {
  createNativeStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/native-stack";
import { createAppContainer } from "react-navigation";
import Matches from "../component/Searchfrom/matches";
import Chatpage from "../component/chatapp.js";
import Buyerchat from "../component/buyerchatlist";
import Sellerchat from "../component/sellerchatlist";

const Stack = createNativeStackNavigator();

function Route() {
  return (
    <Stack.Navigator
      initialRouteName="login"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Slider" component={Slider} />
      <Stack.Screen name="login" component={Login} />
      <Stack.Screen name="loginwithemail" component={LoginWithEmail} />
      <Stack.Screen name="Signup" component={SignUp} />
      <Stack.Screen name="signupuser" component={SignupUser} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
      <Stack.Screen name="ShopNowImg" component={ShopNowImg} />
      <Stack.Screen name="great1" component={Great1} />
      <Stack.Screen name="Great" component={Great} />
      <Stack.Screen name="OTP" component={OTP} />
      <Stack.Screen name="NewPassword" component={NewPassword} />
      <Stack.Screen name="SelectCategory" component={SelectCategory} />
      <Stack.Screen name="ServiceTracking" component={ServiceTracking} />
      <Stack.Screen name="notification" component={Notification} />
      <Stack.Screen name="opendealsdetail" component={OpenDealsDetail} />
      <Stack.Screen name="OpenDeals" component={OpenDeals} />
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="tripdetail" component={TripDetail} />
      <Stack.Screen name="blog" component={Blog} />
      <Stack.Screen name="card1" component={Card1} />
      <Stack.Screen name="opendeals" component={OpenDeals} />
      <Stack.Screen name="findsellers" component={Findsellers} />
      <Stack.Screen name="shopnow" component={Shopnow} />
      <Stack.Screen name="shopnowimg" component={ShopNowImg} />
      <Stack.Screen name="shopnow1" component={Shopnow1} />
      <Stack.Screen name="shopnow2" component={Shopnow2} />
      <Stack.Screen name="shopnow3" component={Shopnow3} />
      <Stack.Screen name="shopnow4" component={Shopnow4} />
      <Stack.Screen name="dealshistory2" component={Dealshistory2} />
      <Stack.Screen name="flightdetail" component={Flightdetail} />
      <Stack.Screen name="editprofile" component={Editprofile} />
      <Stack.Screen name="createblog" component={Createblog} />
      <Stack.Screen name="servicedescription" component={ServiceDescription} />
      <Stack.Screen name="profile" component={Profile} />
      <Stack.Screen name="userprofile" component={Userprofile} />
      <Stack.Screen name="About" component={About} />
      <Stack.Screen name="history" component={History} />
      <Stack.Screen name="Chatlist" component={Chatlist} />
      <Stack.Screen name="Chat" component={Chat} />
      <Stack.Screen name="videos" component={Videos} />
      <Stack.Screen name="offers" component={Offers} />
      <Stack.Screen name="Spotdetails" component={Spotdetails} />
      <Stack.Screen name="Terms" component={Terms} />
      <Stack.Screen name="Privacy" component={Privacy} />
      <Stack.Screen name="Addspot" component={Addspot} />
      <Stack.Screen name="Help" component={Help} />
      <Stack.Screen name="Faq" component={Faq} />
      <Stack.Screen name="Map" component={Map} />
      <Stack.Screen name="tripdetail2" component={Tripdetail2} />
      <Stack.Screen name="tripdetail3" component={Tripdetail3} />
      <Stack.Screen name="tripsummary" component={Tripsummary} />
      <Stack.Screen name="advancesearch" component={Advancesearch} />
      <Stack.Screen name="adisonline" component={Adisonline} />
      <Stack.Screen name="card2" component={Card2} />
      <Stack.Screen name="track" component={Track} />
      <Stack.Screen name="selectPayment" component={SelectPayment} />
      <Stack.Screen name="chat3" component={Chat3} />
      <Stack.Screen name="deliver" component={Deliver} />
      <Stack.Screen name="matches" component={Matches} />
      <Stack.Screen name="Chatpage" component={Chatpage} />
      <Stack.Screen name="Buyerchat" component={Buyerchat} />
      <Stack.Screen name="Sellerchat" component={Sellerchat} />
    </Stack.Navigator>
  );
}
export default Route;
