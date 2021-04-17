import React from "react";
import { StyleSheet, View, TextInput, Text } from "react-native";
import { Formik } from "formik";
import { Overlay, Button } from "react-native-elements";
import { Feather } from "@expo/vector-icons";
import {Picker} from '@react-native-picker/picker';

const SaveDish = (props) => {
  let dishNut;
  if (props.dishNut) {
    dishNut = props.dishNut;
  }
  return (
    <Overlay
      isVisible={props.isVisible}
      width={"75%"}
      height={200}
      animationType={"fade"}
      overlayBackgroundColor={"white"}
    >
      <View style={styles.form}>
        <Formik
          initialValues={{
            name: dishNut.name,
            mealType: "-",
          }}
          onSubmit={(values) =>
            !values.name || values.mealType === "-"
              ? alert("All Fields Required")
              : props.onSave(values)
          }
        >
          {(formikProps) => (
            <View style={styles.textContainer}>
              <View style={styles.dishContainer}>
                <Text style={styles.headerText}>Dish Name:</Text>
                <TextInput
                  style={styles.text}
                  placeholder="Dish Name"
                  onChangeText={formikProps.handleChange("name")}
                  value={formikProps.values.name}
                />
              </View>
              <View style={styles.mealTypeContainer}>
                <Text style={styles.headerText}>Meal Type: </Text>
                <Picker
                  style={{ padding: 0, margin: 0, width: '50%', height: 50}}
                  mode='dropdown'
                  itemStyle={styles.dropdown}
                  selectedValue={formikProps.values.mealType}
                  onValueChange={(itemValue) => {
                    formikProps.setFieldValue("mealType", itemValue);
                  }}
                >
                  <Picker.Item style={{ width: 50}} label="-" value="-" />
                  <Picker.Item style={{ width: 50}} label="Breakfast" value="Breakfast" />
                  <Picker.Item style={{ width: 50}} label="Lunch" value="Lunch" />
                  <Picker.Item style={{ width: 50}} label="Dinner" value="Dinner" />
                  <Picker.Item style={{ width: 50}} label="Snack" value="Snack" />
                </Picker>
                {/* <View style={styles.icon}>
                  <Feather name="chevrons-down" size={15} color="black" />
                </View> */}
              </View>
              <View style={styles.buttonContainer}>
                <Button
                  title="Submit"
                  titleStyle={{
                    color: "white",
                    fontSize: 15,
                    lineHeight: 15,
                  }}
                  buttonStyle={{
                    backgroundColor: "black",
                    opacity: 0.8,
                    borderRadius: 20,
                    height: 35,
                    width: 75,
                    justifyContent: "center",
                    alignSelf: "center",
                    marginTop: 12,
                    marginRight: 2.5,
                  }}
                  onPress={formikProps.handleSubmit}
                />
                <Button
                  title="Cancel"
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
            </View>
          )}
        </Formik>
      </View>
    </Overlay>
  );
};

export default SaveDish;

const styles = StyleSheet.create({
  text: {
    width: '50%',
    opacity: 0.8,
    backgroundColor: "#FFFFFF",
    padding: 8,
    alignItems: "center",
    borderRadius: 5,
  },
  headerText: {
    fontWeight: "bold",
    padding: 10,
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    opacity: 1,
    height: '90%',
    width: 350,
    borderRadius: 10,
    marginTop: 30,
  },
  textContainer: {
    justifyContent: "flex-start",
    alignItems: "center",
    height: "100%",
    width: "100%",
    backgroundColor: "#E3E3E3",
    borderRadius: 10,
    opacity: 1,
    flexDirection: "column",
  },
  dishContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  mealTypeContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "row",
  },
  icon: {
    backgroundColor: "white",
    opacity: 0.8,
    height: 39,
    marginTop: 5,
    justifyContent: "center",
  },
  dropdown: {
    height: 39,
    width: '100%',
    fontSize: 14,
    color: "black",
    backgroundColor: "#FFFFFF",
    marginTop: 5,
    opacity: 0.8,
  },
});
