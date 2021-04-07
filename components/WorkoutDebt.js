import React from "react";
import { View } from "react-native";
import { Button } from "react-native-elements";
import WorkoutDebtModal from "../components/WorkoutDebtModal";

class WorkoutDebt extends React.Component {
  constructor({ navigation }) {
    super();
    this.navigation = navigation;
    this.state = {
      modalOpen: false,
    };
    this.onPress = this.onPress.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }
  onPress() {
    this.setState({
      modalOpen: true,
    });
  }

  handleCancel() {
    this.setState({
      modalOpen: false,
    });
  }

  render() {
    return (
      <View>
        <View>
          <Button
            onPress={this.onPress}
            title='WORKOUT DEBT'
            color='black'
            titleStyle={{
              color: "white",
              fontSize: 15,
              lineHeight: 15,
            }}
            buttonStyle={{
              backgroundColor: "#FF7F4B",
              borderRadius: 20,
              height: 35,
              width: 190,
              justifyContent: "center",
              alignSelf: "center",
              marginTop: 10,
            }}
          />
          <WorkoutDebtModal
            isVisible={this.state.modalOpen}
            handleCancel={this.handleCancel}
            workoutDebtInfo={this.props.workoutDebtInfo}
          />
        </View>
      </View>
    );
  }
}

export default WorkoutDebt;
