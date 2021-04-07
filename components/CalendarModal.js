import React, { useState } from "react";
import { Button, View, Platform } from "react-native";
import { Overlay } from "react-native-elements";
import DateTimePicker from "@react-native-community/datetimepicker";
const CalendarModal = (props) => {
  const [date, setDate] = useState(props.date);
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(true);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
    props.addDate(currentDate);
    if(event.type === "set"){
      props.closeDateModal();
    }
  };

  const conditionalRender = () => {
    if(!props.isVisible) return
    if(Platform.OS === "ios") {
      return (
      <Overlay
        isVisible={props.isVisible}
        width={"75%"}
        height={"30%"}
        animationType={"fade"}
        overlayBackgroundColor={"white"}
        windowBackgroundColor="rgba(0, 0, 0, 0.5)"
      >
        <DateTimePicker
              testID="dateTimePicker"
              timeZoneOffsetInMinutes={0}
              value={date}
              mode={mode}
              is24Hour={true}
              display="default"
              onChange={onChange}
        />
           <Button title="Submit" onPress={props.closeDateModal} />
        </Overlay>)
    }else {
      if(props.isVisible){
      return(
        show && <DateTimePicker
            testID="dateTimePicker"
            timeZoneOffsetInMinutes={0}
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
      />
      )
      }
    }
  }

  return (
    <View>{conditionalRender()}</View>
  );
};

export default CalendarModal;
