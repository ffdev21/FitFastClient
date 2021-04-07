import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Overlay, Button } from "react-native-elements";

const WorkoutDebtModal = (props) => {
  return (
    <Overlay
      isVisible={props.isVisible}
      width={"93%"}
      height={"75%"}
      animationType={"fade"}
      overlayBackgroundColor={"white"}
    >
    <View>
      {props.workoutDebtInfo.workoutCalculations.totalWorkoutTime === "0.00" ? (
        <View>
          <Text style={styles.noWorkouts}>
            No calories to burn for this day
          </Text>
        </View>
      ) : (
        <View>
          <View style={styles.mealContainer}>
            <View style={styles.headerContainer}>
              <Text style={styles.headerText}>{props.isSingleDish ? `Current Dish's Workout Debt:` : `Today's Workout Debt:`}</Text>
            </View>
            <View style={styles.wholeDishView}>
              <Text style={styles.workoutDebtInfo}>
                Since you ate {props.workoutDebtInfo.calorieCount.fat} fat
                calories, {props.workoutDebtInfo.calorieCount.protein} protein
                calories, and {props.workoutDebtInfo.calorieCount.carbs} carbs,
                your workout effort has increased.
              </Text>
              <Text style={styles.workoutDebtInfo}>
                You can choose to do{" "}
                {props.workoutDebtInfo.workoutCalculations.totalWorkoutTime}{" "}
                minutes at{" "}
                {props.workoutDebtInfo.workoutCalculations.maxHeartRate}% of
                your estimated max heart rate for any of the following
                exercises:
              </Text>
              <Text style={styles.workoutDebtInfo}>
                {props.workoutDebtInfo.workoutCalculations.workouts.map(
                  (workout, index) => {
                    return (
                      <View key={index}>
                        <Text style={styles.workouts}>{workout}</Text>
                      </View>
                    );
                  }
                )}
              </Text>
            </View>
          </View>

          <View style={styles.mealContainer}>
            <View style={styles.headerContainer}>
              <Text style={styles.headerText}>{props.isSingleDish ? `Current Dish's Caloric Values:` : `Yesterday's Caloric Values:`}</Text>
            </View>
            <View style={styles.wholeDishView}>
              <View style={styles.individualDishView}>
                <View style={styles.dishNameContainer}>
                  <View style={styles.dishNameContainer}>
                    <Text style={styles.dishName}>
                      {props.workoutDebtInfo.calorieCount.fat || 0} Fat Calories
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.individualDishView}>
                <View style={styles.dishNameContainer}>
                  <View style={styles.dishNameContainer}>
                    <Text style={styles.dishName}>
                      {props.workoutDebtInfo.calorieCount.protein || 0} Protein
                      Calories
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.individualDishView}>
                <View style={styles.dishNameContainer}>
                  <View style={styles.dishNameContainer}>
                    <Text style={styles.dishName}>
                      {props.workoutDebtInfo.calorieCount.carbs || 0}{" "}
                      Carbohydrate Calories
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      )}
      <Button
        title="Ok!"
        titleStyle={{
          color: "white",
          fontSize: 15,
          lineHeight: 15,
        }}
        buttonStyle={{
          backgroundColor: "#FF7F4B",
          borderRadius: 20,
          height: 35,
          width: 75,
          justifyContent: "center",
          alignSelf: "center",
          marginTop: 12,
          marginLeft: 2.5,
        }}
        onPress={props.handleCancel}
      />
      </View>
    </Overlay>
  );
};
export default WorkoutDebtModal;

const styles = StyleSheet.create({
  mainHeader: {
    padding: 15,
    marginTop: 0,
    color: "black",
    fontSize: 24,
    fontFamily: "cabin",
    justifyContent: "center",
    alignSelf: "center",
  },
  mealContainer: {
    borderRadius: 10,
    width: 350,
    backgroundColor: "#faefe8",
    margin: 7,
  },
  headerText: {
    backgroundColor: "black",
    padding: 5,
    color: "white",
    fontFamily: "cabin",
    fontSize: 20,
  },
  headerContainer: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    fontWeight: "bold",
    backgroundColor: "black",
    padding: 5,
    color: "white",
    fontFamily: "cabin",
  },
  wholeDishView: {
    padding: 10,
  },
  individualDishView: {
    flexDirection: "row",
    height: 35,
    marginTop: 7,
    alignItems: "center",
  },
  dishNameContainer: {
    width: 295,
  },
  dishName: {
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    color: "black",
    fontFamily: "cabin",
    fontSize: 17,
  },
  workoutDebtInfo: {
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    color: "black",
    fontFamily: "cabin",
    fontSize: 17,
  },
  workouts: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 5,
    color: "black",
    fontFamily: "cabin",
    fontSize: 17,
  },
  noWorkouts: {
    alignItems: "center",
    padding: 50,
    fontSize: 20,
  },
});
